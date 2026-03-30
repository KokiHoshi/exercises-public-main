const BASE_URL = 'https://api.github.com';

export function parseRepo(repo) {
  if (!repo || !repo.includes('/')) {
    throw new Error('--repo must be in format <owner>/<name>');
  }

  const [owner, name] = repo.split('/', 2);
  if (!owner || !name) {
    throw new Error('--repo must be in format <owner>/<name>');
  }

  return { owner, repo: name };
}

export function getToken(token = process.env.GITHUB_TOKEN) {
  if (!token) {
    throw new Error(
      'GITHUB_TOKEN env var is required (Personal Access Token).',
    );
  }
  return token;
}

export async function ghRequest({
  method,
  path,
  query,
  body,
  verbose = false,
  token,
}) {
  const resolvedToken = getToken(token);

  const url = new URL(BASE_URL + path);
  if (query) {
    for (const [k, v] of Object.entries(query)) {
      if (v !== undefined && v !== null) {
        url.searchParams.set(k, String(v));
      }
    }
  }

  const headers = {
    Accept: 'application/vnd.github+json',
    Authorization: `Bearer ${resolvedToken}`,
    'X-GitHub-Api-Version': '2022-11-28',
  };

  const init = {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  };

  if (verbose) {
    console.error('---- HTTP REQUEST ----');
    console.error(method, url.toString());
    console.error('headers:', headers);
    if (body) console.error('body:', body);
  }

  const res = await fetch(url, init);

  const contentType = res.headers.get('content-type') || '';
  const isJson = contentType.includes('application/json');

  const text = await res.text();
  const data = isJson && text ? JSON.parse(text) : text;

  if (verbose) {
    console.error('---- HTTP RESPONSE ----');
    console.error('status:', res.status, res.statusText);
    console.error('headers:', Object.fromEntries(res.headers.entries()));
    console.error('body:', data);
  }

  if (!res.ok) {
    const msg =
      data && typeof data === 'object' && data.message
        ? data.message
        : String(data);
    throw new Error(`GitHub API request failed (${res.status}): ${msg}`);
  }

  return data;
}

export async function listIssues({
  repo,
  perPage = 30,
  verbose = false,
  token,
}) {
  const { owner, repo: name } = parseRepo(repo);

  const items = await ghRequest({
    method: 'GET',
    path: `/repos/${owner}/${name}/issues`,
    query: { state: 'open', per_page: perPage },
    verbose,
    token,
  });

  return items.filter((it) => !('pull_request' in it));
}

export async function createIssue({
  repo,
  title,
  body = '',
  verbose = false,
  token,
}) {
  if (!title) {
    throw new Error('--title is required');
  }

  const { owner, repo: name } = parseRepo(repo);

  return ghRequest({
    method: 'POST',
    path: `/repos/${owner}/${name}/issues`,
    body: { title, body },
    verbose,
    token,
  });
}

export async function closeIssue({ repo, number, verbose = false, token }) {
  if (!number) {
    throw new Error('--number is required');
  }

  const n = Number(number);
  if (!Number.isInteger(n) || n <= 0) {
    throw new Error('--number must be a positive integer');
  }

  const { owner, repo: name } = parseRepo(repo);

  return ghRequest({
    method: 'PATCH',
    path: `/repos/${owner}/${name}/issues/${n}`,
    body: { state: 'closed' },
    verbose,
    token,
  });
}
