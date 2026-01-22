import { tool } from '@openai/agents';
import fs from 'fs/promises';
import path from 'path';
import { z } from 'zod';

export const readFileTool = tool({
  name: 'read_file',
  description: 'Read the contents of a file in the project to provide context',
  parameters: z.object({
    filePath: z.string().describe('Relative path to the file (e.g., "lib/vortex-design.ts")'),
    maxLines: z.number().optional().default(100).describe('Maximum lines to read (default: 100)'),
  }),
  execute: async ({ filePath, maxLines }) => {
    try {
      const projectRoot = path.join(process.cwd());
      const fullPath = path.join(projectRoot, filePath);
      const content = await fs.readFile(fullPath, 'utf-8');
      const lines = content.split('\n');

      if (lines.length > maxLines) {
        return {
          filePath,
          content: lines.slice(0, maxLines).join('\n'),
          truncated: true,
          totalLines: lines.length,
          shownLines: maxLines,
          message: `📄 Showing first ${maxLines} of ${lines.length} lines`,
        };
      }

      return {
        filePath,
        content,
        truncated: false,
        totalLines: lines.length,
        shownLines: lines.length,
        message: `📄 Showing all ${lines.length} lines`,
      };
    } catch (error: any) {
      return {
        filePath,
        error: `Failed to read file: ${error.message}`,
        suggestion: 'Check that the file path is correct and the file exists',
      };
    }
  },
});
