#!/usr/bin/env node

const { spawnSync } = require('node:child_process');

const MARKETPLACE = 'mysql-sql-review-marketplace';
const PLUGIN = 'mysql-sql-review';
const MARKETPLACE_SOURCE = 'su6/mysql-sql-review-marketplace';
const SPARSE_PATHS = ['.agents/plugins', 'plugins/mysql-sql-review'];

function usage() {
  console.log(`Usage: npx @amg95555/mysql-sql-review@latest install

Installs the public ${PLUGIN} Codex plugin from ${MARKETPLACE_SOURCE}.`);
}

function run(command, args) {
  const result = spawnSync(command, args, { encoding: 'utf8', stdio: 'pipe' });
  if (result.error) {
    return { status: 1, output: result.error.message };
  }
  return {
    status: result.status ?? 1,
    output: `${result.stdout || ''}${result.stderr || ''}`
  };
}

function codex(commandArgs) {
  const direct = run('codex', ['--version']);
  if (direct.status === 0) {
    return run('codex', commandArgs);
  }

  const npx = process.platform === 'win32' ? 'npx.cmd' : 'npx';
  return run(npx, ['--yes', '@openai/codex', ...commandArgs]);
}

function ensureSuccess(result, step) {
  if (result.status === 0) {
    return;
  }
  console.error(`Failed to ${step}.`);
  if (result.output) {
    console.error(result.output.trim());
  }
  process.exitCode = 1;
}

function isMarketplaceConfigured(output) {
  return output.includes(`Marketplace             ROOT`) && output.includes(MARKETPLACE);
}

function isPluginInstalled(output) {
  return output.includes(`${PLUGIN}@${MARKETPLACE}`) && output.includes('installed, enabled');
}

function install() {
  console.log('Checking Codex Marketplace configuration...');
  const marketplaces = codex(['plugin', 'marketplace', 'list']);
  if (marketplaces.status !== 0) {
    ensureSuccess(marketplaces, 'inspect configured Marketplaces');
    return;
  }

  if (!isMarketplaceConfigured(marketplaces.output)) {
    const addArgs = ['plugin', 'marketplace', 'add', MARKETPLACE_SOURCE, '--ref', 'main'];
    for (const sparsePath of SPARSE_PATHS) {
      addArgs.push('--sparse', sparsePath);
    }
    ensureSuccess(codex(addArgs), 'add the MySQL SQL Review Marketplace');
    if (process.exitCode) {
      return;
    }
  }

  console.log('Checking MySQL SQL Review plugin status...');
  const plugins = codex(['plugin', 'list']);
  if (plugins.status !== 0) {
    ensureSuccess(plugins, 'inspect installed plugins');
    return;
  }

  if (!isPluginInstalled(plugins.output)) {
    ensureSuccess(codex(['plugin', 'add', `${PLUGIN}@${MARKETPLACE}`]), 'install MySQL SQL Review');
    if (process.exitCode) {
      return;
    }
  }

  console.log('MySQL SQL Review is installed. Start a new Codex desktop chat to use it.');
}

const command = process.argv[2];
if (command === 'install') {
  install();
} else if (command === '--help' || command === '-h' || !command) {
  usage();
} else {
  console.error(`Unknown command: ${command}`);
  usage();
  process.exitCode = 1;
}
