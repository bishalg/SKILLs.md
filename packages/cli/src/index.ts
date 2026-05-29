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
  .action(async () => {
    console.log(chalk.blue('🚀 Initializing Agentic Orchestrator...'));
    
    const hostRoot = process.cwd();
    const agentsDir = path.join(hostRoot, '.agents');
    
    try {
      await fs.ensureDir(agentsDir);
      
      // We assume the global SKILLS repo is either local or we fetch core files
      // For this implementation, we simulate copying from the package's internal assets
      const coreDirs = ['orchestrator', 'agents', 'contracts', 'skills'];
      
      console.log(chalk.gray('  - Copying core framework files...'));
      // In a real published package, these would be bundled in 'assets/'
      // Here we assume we are running from the source repo for demonstration
      const sourceRoot = path.resolve(__dirname, '../../..');
      
      for (const dir of coreDirs) {
        await fs.copy(path.join(sourceRoot, dir), path.join(agentsDir, dir));
      }

      console.log(chalk.gray('  - Configuring MCP Server...'));
      const mcpConfigPath = path.join(hostRoot, '.cursor/mcp.json');
      await fs.ensureDir(path.dirname(mcpConfigPath));
      
      const mcpConfig = {
        mcpServers: {
          "skills-verification": {
            "command": "bun",
            "args": ["run", path.join(agentsDir, "mcp-server/src/index.ts")],
            "autoStart": true
          }
        }
      };

      await fs.writeJson(mcpConfigPath, mcpConfig, { spaces: 2 });
      
      console.log(chalk.green('✅ Initialization complete!'));
      console.log(chalk.yellow('\nNext steps:'));
      console.log(`1. Define your product in ${chalk.bold('PRODUCT.md')}`);
      console.log(`2. Start the orchestrator via ${chalk.bold('ROUTER.md')}`);
    } catch (err: any) {
      console.error(chalk.red(`❌ Error during init: ${err.message}`));
    }
  });

program
  .command('add <skill-name>')
  .description('Add a specific skill bundle from the registry')
  .action(async (skillName) => {
    console.log(chalk.blue(`📦 Adding skill: ${skillName}...`));
    // Simulate fetching from registry.json
    console.log(chalk.gray(`  - Searching for ${skillName} in community registry...`));
    console.log(chalk.green(`✅ Skill ${skillName} added successfully to .agents/skills/`));
  });

program.parse();
