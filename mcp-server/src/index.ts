import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { exec } from "child_process";
import { promisify } from "util";
import fs from "fs/promises";
import path from "path";

const execAsync = promisify(exec);

const server = new Server(
  {
    name: "skills-verification-server",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "validate_oklch",
        description: "Scans CSS/TSX files for non-OKLCH colors (HEX, RGB, HSL).",
        inputSchema: {
          type: "object",
          properties: {
            target: {
              type: "string",
              description: "Directory or file to scan (default: .)",
            },
          },
        },
      },
      {
        name: "run_a11y_audit",
        description: "Runs a lightweight accessibility audit on the target directory.",
        inputSchema: {
          type: "object",
          properties: {
            target: {
              type: "string",
              description: "Directory to audit (default: .)",
            },
          },
        },
      },
    ],
  };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const target = String(request.params.arguments?.target || ".");

  if (request.params.name === "validate_oklch") {
    try {
      const HEX_REGEX = /#[0-9a-fA-F]{3,8}/g;
      const RGB_REGEX = /rgb\\(|rgba\\(/g;
      const HSL_REGEX = /hsl\\(|hsla\\(/g;
      
      const violations: string[] = [];

      async function scanDir(dir: string) {
        const files = await fs.readdir(dir);
        for (const file of files) {
          const fullPath = path.join(dir, file);
          const stat = await fs.stat(fullPath);
          if (stat.isDirectory()) {
            if (file !== "node_modules" && file !== ".git") {
              await scanDir(fullPath);
            }
          } else if (/\\.(tsx|css|ts|js)$/.test(file)) {
            const content = await fs.readFile(fullPath, "utf8");
            if (HEX_REGEX.test(content) || RGB_REGEX.test(content) || HSL_REGEX.test(content)) {
              violations.push(fullPath);
            }
          }
        }
      }

      await scanDir(target);

      if (violations.length > 0) {
        return {
          content: [
            {
              type: "text",
              text: `❌ Non-OKLCH color found in:\\n${violations.join("\\n")}`,
            },
          ],
        };
      }
      return {
        content: [
          {
            type: "text",
            text: "✅ OKLCH Validation Passed. No HEX/RGB/HSL colors found.",
          },
        ],
      };
    } catch (error: any) {
      return {
        content: [{ type: "text", text: `Error: ${error.message}` }],
        isError: true,
      };
    }
  }

  if (request.params.name === "run_a11y_audit") {
    try {
      // Mock check using grep
      let output = "";
      try {
        const { stdout: imgOut } = await execAsync(`grep -r "img" "${target}" | grep -v "alt="`);
        if (imgOut) output += "⚠️ Found img tags without alt attributes.\\n";
      } catch (e) {} // grep returns 1 if no match
      
      try {
         const { stdout: btnOut } = await execAsync(`grep -r "button" "${target}" | grep -v "aria-label=" | grep -v ">.*</button>"`);
         if (btnOut) output += "⚠️ Found buttons without labels.\\n";
      } catch(e) {}

      if (output) {
         return {
            content: [{ type: "text", text: output }]
         };
      }
      return {
        content: [{ type: "text", text: "✅ A11y Audit complete. No issues found." }],
      };
    } catch (error: any) {
      return {
        content: [{ type: "text", text: `Error running audit: ${error.message}` }],
        isError: true,
      };
    }
  }

  throw new Error("Tool not found");
});

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Skills MCP Server running on stdio");
}

main().catch(console.error);
