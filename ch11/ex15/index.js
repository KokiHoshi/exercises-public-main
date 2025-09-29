/**
 * ベース URL のパスとクエリを修正した文字列を返す
 * @param {{
 *   base: string,
 *   path?: string,
 *   addQuery?: [string, string][]
 * }} options
 * @returns {string}
 */
export function modifyUrl({ base, path, addQuery }) {
  const url = new URL(base);

  if (path) {
    url.pathname = path.startsWith("/") ? path : path.replace(/^\.\//, "/");
  }

  if (addQuery) {
    for (const [k, v] of addQuery) {
      url.searchParams.set(k, v);
    }
  }

  return url.toString();
}
