export function isEmailAddress(str) {
  if (typeof str !== "string") return false;
  if (str !== str.trim()) return false;

  const at = str.indexOf("@");
  if (at <= 0) return false;
  if (str.indexOf("@", at + 1) !== -1) return false;

  const local = str.slice(0, at);
  const domain = str.slice(at + 1);

  if (domain.length === 0 || domain.length > 255) return false;
  if (local.length === 0 || local.length > 64) return false;

  const atext = "A-Za-z0-9!#$%&'*+/=?^_`{|}~-";
  const atomRe = new RegExp(`^[${atext}]+$`);

  const localParts = local.split(".");
  if (localParts.some((p) => p.length === 0 || !atomRe.test(p))) return false;

  const domainParts = domain.split(".");
  if (domainParts.some((p) => p.length === 0 || !atomRe.test(p))) return false;

  return true;
}
