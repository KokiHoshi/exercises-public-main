#!/usr/bin/env node
import { parseArgs } from 'node:util';
import { listIssues, createIssue, closeIssue } from './github-issues-lib.js';

const HELP = `
Usage:
  gh-issues [global options] <command> [command options]

Commands:
  list    List open issues (id and title)
  create  Create an issue
  close   Close an issue

Global options:
  -h, --help     Show help
  -v, --verbose  Print HTTP logs

list options:
  --repo <owner/name>            (required)
  --per-page <n>                 (default: 30)

create options:
  --repo <owner/name>            (required)
  --title <string>               (required)
  --body <string>                (optional)

close options:
  --repo <owner/name>            (required)
  --number <issue_number>        (required)
`.trim();

function die(message, exitCode = 1) {
  console.error(message);
  process.exit(exitCode);
}

async function main() {
  const { values, positionals } = parseArgs({
    args: process.argv.slice(2),
    allowPositionals: true,
    options: {
      help: { type: 'boolean', short: 'h' },
      verbose: { type: 'boolean', short: 'v' },
      repo: { type: 'string' },
      title: { type: 'string' },
      body: { type: 'string' },
      number: { type: 'string' },
      'per-page': { type: 'string' },
    },
  });

  if (values.help || positionals.length === 0) {
    console.log(HELP);
    return;
  }

  const command = positionals[0];
  const verbose = !!values.verbose;

  try {
    if (command === 'list') {
      const issues = await listIssues({
        repo: values.repo,
        perPage: values['per-page'] ? Number(values['per-page']) : 30,
        verbose,
      });

      if (issues.length === 0) {
        console.log('(no open issues)');
        return;
      }

      for (const it of issues) {
        console.log(`${it.id}\t${it.title}`);
      }
      return;
    }

    if (command === 'create') {
      const created = await createIssue({
        repo: values.repo,
        title: values.title,
        body: values.body,
        verbose,
      });

      console.log(
        `created: #${created.number} (id=${created.id}) ${created.title}`,
      );
      console.log(created.html_url);
      return;
    }

    if (command === 'close') {
      const updated = await closeIssue({
        repo: values.repo,
        number: values.number,
        verbose,
      });

      console.log(
        `closed: #${updated.number} (id=${updated.id}) ${updated.title}`,
      );
      console.log(updated.html_url);
      return;
    }

    die(`ERROR: unknown command: ${command}\n\n${HELP}`);
  } catch (e) {
    die(`ERROR: ${e?.message ?? e}`);
  }
}

await main();
