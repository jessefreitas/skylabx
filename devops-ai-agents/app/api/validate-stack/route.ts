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
    const { stack_yaml, stack_type } = await request.json();

    if (!stack_yaml) {
      return NextResponse.json(
        { error: 'stack_yaml is required' },
        { status: 400 }
      );
    }

    // Create temp file for YAML content
    const tempFileName = `stack-${uuidv4()}.yml`;
    tempFilePath = join('/tmp', tempFileName);

    // In Docker /tmp should exist.
    await writeFile(tempFilePath, stack_yaml);

    // Python script path
    // Based on previous deployment: /app/skills/...
    // BUT we are in 'standalone' mode. 
    // The Dockerfile copied '.' to './'.
    // If we are running from /app, the relative path might be './skills/...'
    // Use absolute path to be safe: /app/skills/...

    const scriptPath = '/app/skills/mega-stack-auditor/scripts/audit_stack.py';

    let command = `python3 ${scriptPath} --file ${tempFilePath}`;
    if (stack_type && stack_type !== 'unknown') {
      command += ` --type ${stack_type}`;
    }

    console.log(`Executing: ${command}`);

    const { stdout, stderr } = await execAsync(command);

    if (stderr) {
      console.warn('Python stderr:', stderr);
      // Don't throw immediately, some warnings might go to stderr
      // But if stdout is empty, then valid error.
    }

    if (!stdout.trim()) {
      throw new Error('No output from validation script');
    }

    // Clean up temp file
    // (Try/Finally handles this)

    try {
      // Find JSON in stdout (in case of other prints)
      const jsonMatch = stdout.match(/\{[\s\S]*\}/);
      if (!jsonMatch) throw new Error("Invalid JSON output from script");

      const result = JSON.parse(jsonMatch[0]);

      // Save to Database
      try {
        const prisma = (await import('@/lib/prisma')).default;
        await prisma.stackAudit.create({
          data: {
            stackType: result.stack_type || 'unknown',
            stackYaml: stack_yaml,
            score: result.score || 0,
            valid: !!result.valid,
            resultJson: JSON.stringify(result)
          }
        });
      } catch (dbError) {
        console.error("Failed to save audit to DB:", dbError);
        // Continue anyway, don't block the user's result if DB fails
      }

      return NextResponse.json(result);
    } catch (parseError) {
      console.error("Parse error:", parseError, "Stdout:", stdout);
      throw new Error("Failed to parse validator output");
    }

  } catch (error: any) {
    console.error('Validation error:', error);
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

