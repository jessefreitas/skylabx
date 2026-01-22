import { tool } from '@openai/agents';
import fs from 'fs/promises';
import path from 'path';
import { z } from 'zod';

export const validateVortexTool = tool({
  name: 'validate_vortex_design',
  description: 'Validate a component file against VORTEX Design System rules (white/black only, no blue/purple)',
  parameters: z.object({
    filePath: z.string().describe('Relative path to the component file (e.g., "app/page.tsx")'),
  }),
  execute: async ({ filePath }) => {
    try {
      const projectRoot = path.join(process.cwd());
      const fullPath = path.join(projectRoot, filePath);
      const code = await fs.readFile(fullPath, 'utf-8');

      const violations = [];

      // Rule VORTEX-001: No blue/purple/indigo colors
      const forbiddenColorMatches = code.match(/(blue|purple|indigo|violet|cyan)-\d+/g);
      if (forbiddenColorMatches) {
        const uniqueColors = Array.from(new Set(forbiddenColorMatches));
        violations.push({
          rule: 'VORTEX-001',
          severity: 'error',
          message: `Forbidden colors detected: ${uniqueColors.join(', ')}`,
          suggestion: 'Replace with VORTEX-approved colors: white, black, slate, or transparent',
          locations: uniqueColors,
        });
      }

      // Rule VORTEX-002: Check for VORTEX-approved patterns
      const hasWhiteGradient = code.includes('from-white') || code.includes('to-white');
      const hasBlackBg = code.includes('bg-[#0a0a0a]') || code.includes('bg-black');
      const hasSlateColors = code.includes('slate-');

      const hasVortexColors = hasWhiteGradient || hasBlackBg || hasSlateColors;

      if (!hasVortexColors && code.includes('className')) {
        violations.push({
          rule: 'VORTEX-002',
          severity: 'warning',
          message: 'No VORTEX-approved color patterns detected',
          suggestion: 'Consider using: bg-[#0a0a0a], from-white, to-white/40, or slate-400',
        });
      }

      // Rule VORTEX-003: Check for forbidden gradient patterns
      const forbiddenGradients = code.match(/from-(blue|purple|indigo)-\d+\s+to-(blue|purple|indigo)-\d+/g);
      if (forbiddenGradients) {
        violations.push({
          rule: 'VORTEX-003',
          severity: 'error',
          message: 'Forbidden gradient pattern detected',
          suggestion: 'Use VORTEX gradient: bg-gradient-to-b from-white to-white/40',
          locations: forbiddenGradients,
        });
      }

      const errorCount = violations.filter(v => v.severity === 'error').length;
      const warningCount = violations.filter(v => v.severity === 'warning').length;

      return {
        filePath,
        isValid: errorCount === 0,
        violations,
        summary: errorCount === 0
          ? `✅ Component is VORTEX compliant (${warningCount} warning${warningCount !== 1 ? 's' : ''})`
          : `❌ Found ${errorCount} error${errorCount !== 1 ? 's' : ''} and ${warningCount} warning${warningCount !== 1 ? 's' : ''}`,
        stats: {
          errors: errorCount,
          warnings: warningCount,
          totalLines: code.split('\n').length,
        },
      };
    } catch (error: any) {
      return {
        filePath,
        isValid: false,
        violations: [{
          rule: 'SYSTEM',
          severity: 'error',
          message: `Failed to read file: ${error.message}`,
          suggestion: 'Check that the file path is correct and the file exists',
        }],
        summary: `❌ System error: ${error.message}`,
      };
    }
  },
});
