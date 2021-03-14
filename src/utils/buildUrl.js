export function buildUrl({ baseUrl, path, queryParams }) {
  const host = baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`;
  path = path.startsWith("/") ? path.slice(1) : path;
  const queryString = queryParams
    ? `?${new URLSearchParams(queryParams).toString()}`
    : "";
  return `${host}${path}${queryString}`;
}
