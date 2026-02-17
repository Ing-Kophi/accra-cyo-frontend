export function getUploadsUrl(path = "") {
  const raw = process.env.REACT_APP_UPLOADS_URL || "";
  const base = raw.replace(/\/+$/, ""); // remove trailing slash
  const cleanPath = String(path).replace(/^\/+/, ""); // remove leading slash

  return cleanPath ? `${base}/${cleanPath}` : base;
}
