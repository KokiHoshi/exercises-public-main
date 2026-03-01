#!/usr/bin/env node
/**
 * GitHub Issues CLI
 * - list open issues (id, title)
 * - create issue
 * - close issue
 *
 * Auth:
 *   export GITHUB_TOKEN="..."
 */

import { parseArgs } from "node:util";

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
  --number <issue_number>        (required)  e.g. 123

Examples:
  export GITHUB_TOKEN="ghp_xxx"  # or fine-grained token
  gh-issues list --repo octocat/Hello-World
  gh-issues create --repo octocat/Hello-World --title "Bug" --body "Steps..."
  gh-issues close --repo octocat/Hello-World --number 12
`.trim();

function die(message, exitCode = 1) {
  console.error(message);
  process.exit(exitCode);
}

function parseRepo(repo) {
  if (!repo || !repo.includes("/"))
    die("ERROR: --repo must be in format <owner>/<name>");
  const [owner, name] = repo.split("/", 2);
  if (!owner || !name) die("ERROR: --repo must be in format <owner>/<name>");
  return { owner, repo: name };
}

function getToken() {
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    die("ERROR: GITHUB_TOKEN env var is required (Personal Access Token).");
  }
  return token;
}

async function ghRequest({ method, path, query, body, verbose }) {
  const token = getToken();
  const baseUrl = "https://api.github.com";

  const url = new URL(baseUrl + path);
  if (query) {
    for (const [k, v] of Object.entries(query)) {
      if (v !== undefined && v !== null) url.searchParams.set(k, String(v));
    }
  }

  const headers = {
    Accept: "application/vnd.github+json",
    Authorization: `Bearer ${token}`,
    // GitHub docs examples commonly use this API version header:
    "X-GitHub-Api-Version": "2022-11-28",
  };

  const init = {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  };

  if (verbose) {
    console.error("---- HTTP REQUEST ----");
    console.error(method, url.toString());
    console.error("headers:", headers);
    if (body) console.error("body:", body);
  }

  const res = await fetch(url, init);

  const contentType = res.headers.get("content-type") || "";
  const isJson = contentType.includes("application/json");

  const text = await res.text();
  const data = isJson && text ? JSON.parse(text) : text;

  if (verbose) {
    console.error("---- HTTP RESPONSE ----");
    console.error("status:", res.status, res.statusText);
    console.error("headers:", Object.fromEntries(res.headers.entries()));
    console.error("body:", data);
  }

  if (!res.ok) {
    // GitHub API error body often has {message, documentation_url, ...}
    const msg =
      data && typeof data === "object" && data.message
        ? data.message
        : String(data);
    die(`ERROR: GitHub API request failed (${res.status}): ${msg}`);
  }

  return data;
}

async function cmdList({ repo, perPage, verbose }) {
  const { owner, repo: name } = parseRepo(repo);

  const items = await ghRequest({
    method: "GET",
    path: `/repos/${owner}/${name}/issues`,
    query: { state: "open", per_page: perPage ?? 30 },
    verbose,
  });

  // Issues API may include pull requests; filter them out.
  const issuesOnly = items.filter((it) => !("pull_request" in it));

  if (issuesOnly.length === 0) {
    console.log("(no open issues)");
    return;
  }

  for (const it of issuesOnly) {
    // requirement says "Id and Title" → print id and title
    console.log(`${it.id}\t${it.title}`);
  }
}

async function cmdCreate({ repo, title, body, verbose }) {
  if (!title) die("ERROR: --title is required");
  const { owner, repo: name } = parseRepo(repo);

  const created = await ghRequest({
    method: "POST",
    path: `/repos/${owner}/${name}/issues`,
    body: { title, body },
    verbose,
  });

  console.log(
    `created: #${created.number} (id=${created.id}) ${created.title}`,
  );
  console.log(created.html_url);
}

async function cmdClose({ repo, number, verbose }) {
  if (!number) die("ERROR: --number is required");
  const n = Number(number);
  if (!Number.isInteger(n) || n <= 0)
    die("ERROR: --number must be a positive integer");

  const { owner, repo: name } = parseRepo(repo);

  const updated = await ghRequest({
    method: "PATCH",
    path: `/repos/${owner}/${name}/issues/${n}`,
    body: { state: "closed" },
    verbose,
  });

  console.log(`closed: #${updated.number} (id=${updated.id}) ${updated.title}`);
  console.log(updated.html_url);
}

async function main() {
  const { values, positionals } = parseArgs({
    args: process.argv.slice(2),
    allowPositionals: true,
    options: {
      help: { type: "boolean", short: "h" },
      verbose: { type: "boolean", short: "v" },

      repo: { type: "string" },
      title: { type: "string" },
      body: { type: "string" },
      number: { type: "string" },
      "per-page": { type: "string" },
    },
  });

  if (values.help || positionals.length === 0) {
    console.log(HELP);
    return;
  }

  const command = positionals[0];
  const verbose = !!values.verbose;

  try {
    if (command === "list") {
      await cmdList({
        repo: values.repo,
        perPage: values["per-page"] ? Number(values["per-page"]) : undefined,
        verbose,
      });
      return;
    }

    if (command === "create") {
      await cmdCreate({
        repo: values.repo,
        title: values.title,
        body: values.body,
        verbose,
      });
      return;
    }

    if (command === "close") {
      await cmdClose({
        repo: values.repo,
        number: values.number,
        verbose,
      });
      return;
    }

    die(`ERROR: unknown command: ${command}\n\n${HELP}`);
  } catch (e) {
    die(`ERROR: ${e?.message ?? e}`);
  }
}

await main();
