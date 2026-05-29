import { Command } from 'commander';
import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const program = new Command();

program
  .name('skill-hub')
  .description('The AI Skill Hub CLI - Build & Distribute Agentic Skills')
  .version('1.0.0');

program
  .command('init')
  .description('Initialize the Agentic Orchestrator in the current project')
  .option('--sandbox', 'Enable containerized tool execution', false)
  .action(async (options) => {
    console.log(chalk.blue('🚀 Initializing Agentic Orchestrator...'));
    
    const hostRoot = process.cwd();
    const agentsDir = path.join(hostRoot, '.agents');
    
    try {
      await fs.ensureDir(agentsDir);
      
      const coreDirs = ['orchestrator', 'agents', 'contracts', 'skills', 'mcp-server'];
      
      console.log(chalk.gray('  - Copying core framework files...'));
      const sourceRoot = path.resolve(__dirname, '../../..');
      
      for (const dir of coreDirs) {
        if (await fs.pathExists(path.join(sourceRoot, dir))) {
          await fs.copy(path.join(sourceRoot, dir), path.join(agentsDir, dir));
        }
      }

      console.log(chalk.gray('  - Configuring MCP Server & Security...'));
      const mcpConfigPath = path.join(hostRoot, '.cursor/mcp.json');
      await fs.ensureDir(path.dirname(mcpConfigPath));
      
      const command = options.sandbox ? "docker run skill-hub-mcp" : "bun";
      const args = options.sandbox ? [] : ["run", path.join(agentsDir, "mcp-server/src/index.ts")];

      const mcpConfig = {
        mcpServers: {
          "skills-verification": {
            "command": command,
            "args": args,
            "autoStart": true,
            "env": {
              "SKILL_HUB_SANDBOX": String(options.sandbox)
            }
          }
        }
      };

      await fs.writeJson(mcpConfigPath, mcpConfig, { spaces: 2 });
      
      // Generate .env.example
      await fs.writeFile(path.join(hostRoot, '.agents/.env.example'), 
        "MAX_SESSION_COST=2.00\nTOKEN_THRESHOLD=15000\nSKILL_HUB_SANDBOX=false");

      console.log(chalk.green('✅ Initialization complete!'));
      if (options.sandbox) console.log(chalk.cyan('🛡️  Secure Sandboxing enabled for MCP tools.'));
      
      console.log(chalk.yellow('\nNext steps:'));
      console.log(`1. Configure budgets in ${chalk.bold('.agents/.env')}`);
      console.log(`2. Define your product in ${chalk.bold('PRODUCT.md')}`);
    } catch (err: any) {
      console.error(chalk.red(`❌ Error during init: ${err.message}`));
    }
  });

program.parse();
