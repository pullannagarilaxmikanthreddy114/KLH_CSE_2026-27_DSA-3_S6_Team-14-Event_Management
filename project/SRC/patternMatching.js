// CO2: Exact pattern-matching algorithms used by Eventora search utilities.
export function kmpSearch(text = "", pattern = "") {
  if (!pattern) return [];
  const s = text.toLowerCase();
  const p = pattern.toLowerCase();
  const lps = Array(p.length).fill(0);
  for (let i = 1, len = 0; i < p.length;) {
    if (p[i] === p[len]) lps[i++] = ++len;
    else if (len) len = lps[len - 1];
    else lps[i++] = 0;
  }
  const matches = [];
  for (let i = 0, j = 0; i < s.length;) {
    if (s[i] === p[j]) { i++; j++; }
    if (j === p.length) { matches.push(i - j); j = lps[j - 1]; }
    else if (i < s.length && s[i] !== p[j]) {
      if (j) j = lps[j - 1]; else i++;
    }
  }
  return matches;
}

export function zFunction(value = "") {
  const s = value.toLowerCase();
  const z = Array(s.length).fill(0);
  let left = 0, right = 0;
  for (let i = 1; i < s.length; i++) {
    if (i <= right) z[i] = Math.min(right - i + 1, z[i - left]);
    while (i + z[i] < s.length && s[z[i]] === s[i + z[i]]) z[i]++;
    if (i + z[i] - 1 > right) { left = i; right = i + z[i] - 1; }
  }
  return z;
}

export function rabinKarpSearch(text = "", pattern = "") {
  if (!pattern || pattern.length > text.length) return [];
  const s = text.toLowerCase(), p = pattern.toLowerCase();
  const base = 256, mod = 1000000007;
  let patternHash = 0, windowHash = 0, power = 1;
  for (let i = 0; i < p.length; i++) {
    patternHash = (patternHash * base + p.charCodeAt(i)) % mod;
    windowHash = (windowHash * base + s.charCodeAt(i)) % mod;
    if (i < p.length - 1) power = (power * base) % mod;
  }
  const matches = [];
  for (let i = 0; i <= s.length - p.length; i++) {
    if (patternHash === windowHash && s.slice(i, i + p.length) === p) matches.push(i);
    if (i < s.length - p.length) {
      windowHash = (windowHash - s.charCodeAt(i) * power % mod + mod) % mod;
      windowHash = (windowHash * base + s.charCodeAt(i + p.length)) % mod;
    }
  }
  return matches;
}

export function containsPattern(text, pattern) {
  if (!text || !pattern) return false;
  return kmpSearch(text, pattern).length > 0;
}

export function findMatches(events, pattern) {
  if (!pattern?.trim()) return events;
  return events.filter((event) => containsPattern(
    `${event.title || ""} ${event.category || ""} ${event.location || event.venue || ""} ${event.city || ""}`,
    pattern
  ));
}

export default containsPattern;
