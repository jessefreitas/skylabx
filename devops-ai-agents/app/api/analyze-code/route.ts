
import { exec } from 'child_process';
import { unlink, writeFile } from 'fs/promises';
import { NextRequest, NextResponse } from 'next/server';
import { join } from 'path';
import { promisify } from 'util';
import { v4 as uuidv4 } from 'uuid';

const execAsync = promisify(exec);

export async function POST(request: NextRequest) {
  let tempFilePath = '';

  try {
    const { code, filename, language } = await request.json();

    if (!code) {
      return NextResponse.json(
        { error: 'Code content is required' },
        { status: 400 }
      );
    }

    // Create temp file for Code content
    // We try to keep extension if possible for clarity, but not strictly needed
    const ext = filename ? filename.split('.').pop() : 'txt';
    const tempFileName = `code-${uuidv4()}.${ext}`;
    tempFilePath = join('/tmp', tempFileName);

    // Save content to temp file
    await writeFile(tempFilePath, code);

    // Python script path
    // Verified path in container
    const scriptPath = '/app/skills/code-analysis/analyze_code.py';

    const command = `python3 ${scriptPath} --file ${tempFilePath}`;

    console.log(`Executing Code Analysis: ${command}`);

    const { stdout, stderr } = await execAsync(command);

    if (stderr) {
      console.warn('Analysis stderr:', stderr);
    }

    if (!stdout.trim()) {
      throw new Error('No output from analysis script');
    }

    try {
      // Find JSON in stdout
      const jsonMatch = stdout.match(/\{[\s\S]*\}/);
      if (!jsonMatch) throw new Error("Invalid JSON output from script");

      const result = JSON.parse(jsonMatch[0]);

      // Save to Database
      try {
        const prisma = (await import('@/lib/prisma')).default;

        // Calculate average score if not present
        const avg = result.avg_score || Math.round((result.quality_score + result.security_score + result.performance_score) / 3);

        await prisma.codeAudit.create({
          data: {
            filename: filename || 'unknown',
            language: language || result.language || 'unknown',
            codeContent: code,
            qualityScore: result.quality_score || 0,
            securityScore: result.security_score || 0,
            performanceScore: result.performance_score || 0,
            avgScore: avg,
            issues: JSON.stringify(result.issues || []),
            // Store entire result too if needed, but schema didn't have it. 
            // We can add specific fields for scores as defined in schema.
          }
        });
      } catch (dbError) {
        console.error("Failed to save audit to DB:", dbError);
        // Continue anyway
      }

      return NextResponse.json(result);

    } catch (parseError) {
      console.error("Parse error:", parseError, "Stdout:", stdout);
      throw new Error("Failed to parse analysis output");
    }

  } catch (error: any) {
    console.error('Analysis error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  } finally {
    if (tempFilePath) {
      try {
        await unlink(tempFilePath);
      } catch (e) {
        // ignore
      }
    }
  }
}
