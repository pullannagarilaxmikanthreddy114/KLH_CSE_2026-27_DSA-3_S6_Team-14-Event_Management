import { useMemo, useState } from "react";
import { kmpSearch, rabinKarpSearch, zFunction } from "../algorithms/patternMatching";

const coverage = [
  { co: "CO1", title: "Problem analysis & strategy", topics: "Problem signatures, complexity, choosing exact search, dynamic programming, flow, approximation or randomized methods.", used: "Event search, schedule planning and capacity allocation" },
  { co: "CO2", title: "Advanced pattern matching", topics: "KMP, Z-function, Rabin–Karp, suffix arrays, LCP and suffix automaton concepts.", used: "Explore search; live KMP, Z and Rabin–Karp demo below" },
  { co: "CO3", title: "Dynamic programming", topics: "Interval DP, bitmask DP, subset DP and DP on trees.", used: "Event conflict/schedule planning and attendee assignment examples" },
  { co: "CO4", title: "Network flow & matching", topics: "Ford–Fulkerson, Edmonds–Karp, Dinic, max-flow/min-cut, matching and capacity constraints.", used: "Ticket-capacity and attendee-allocation model" },
  { co: "CO5", title: "Complexity & approximation", topics: "P, NP, NP-complete, NP-hard, polynomial reductions (3-SAT → Vertex Cover → Independent Set) and approximation ratios.", used: "Event selection under budget/capacity constraints" },
  { co: "CO6", title: "Randomized & parallel algorithms", topics: "Las Vegas vs Monte Carlo, parallel prefix sum/reduce, work-span analysis.", used: "Recommendation ranking and event-statistics aggregation" },
];

export default function AlgorithmCoverage() {
  const [text, setText] = useState("Hyderabad Tech Summit — Music Festival — Tech Workshop");
  const [pattern, setPattern] = useState("Tech");
  const [algorithm, setAlgorithm] = useState("KMP");
  const result = useMemo(() => {
    if (!pattern) return { positions: [], detail: "Enter a non-empty pattern." };
    if (algorithm === "KMP") return { positions: kmpSearch(text, pattern), detail: "Prefix/LPS table avoids rechecking matched characters." };
    if (algorithm === "Rabin–Karp") return { positions: rabinKarpSearch(text, pattern), detail: "Rolling hash finds candidate windows; matching windows are verified to avoid hash-collision false positives." };
    const joined = `${pattern.toLowerCase()}$${text.toLowerCase()}`;
    const z = zFunction(joined);
    const positions = [];
    for (let i = pattern.length + 1; i < joined.length; i++) if (z[i] >= pattern.length) positions.push(i - pattern.length - 1);
    return { positions, detail: "Z-values show the longest prefix match at every position in pattern + separator + text." };
  }, [text, pattern, algorithm]);

  return <section className="algorithm-coverage" aria-labelledby="co-coverage-title">
    <div className="algorithm-coverage-heading">
      <span>ADVANCED ALGORITHMS · CO1–CO6</span>
      <h2 id="co-coverage-title">Algorithms behind Eventora</h2>
      <p>These topics are integrated into existing event workflows; this is not a separate Algorithms Lab page.</p>
    </div>
    <div className="co-coverage-grid">
      {coverage.map((item) => <article className="co-coverage-card" key={item.co}>
        <span className="co-tag">{item.co}</span><h3>{item.title}</h3><p>{item.topics}</p><small><strong>Eventora use:</strong> {item.used}</small>
      </article>)}
    </div>
    <div className="pattern-demo">
      <div><span className="co-tag">CO2 · LIVE DEMO</span><h3>Try pattern matching</h3><p>Compare exact matching strategies against event-related text.</p></div>
      <label>Text<input value={text} onChange={(e) => setText(e.target.value)} /></label>
      <label>Pattern<input value={pattern} onChange={(e) => setPattern(e.target.value)} placeholder="Type a pattern" /></label>
      <label>Algorithm<select value={algorithm} onChange={(e) => setAlgorithm(e.target.value)}><option>KMP</option><option>Z-function</option><option>Rabin–Karp</option></select></label>
      <div className="pattern-result"><strong>Match positions (0-based):</strong> {result.positions.length ? result.positions.join(", ") : "No match found"}<p>{result.detail}</p></div>
    </div>
    <style>{`
      .algorithm-coverage{margin:34px 0;padding:28px;border:1px solid rgba(148,163,184,.22);border-radius:22px;background:rgba(15,23,42,.55);color:#e5e7eb}
      .algorithm-coverage-heading span{font-size:11px;letter-spacing:.12em;font-weight:800;color:#a78bfa}.algorithm-coverage-heading h2{margin:8px 0;font-size:27px}.algorithm-coverage-heading p,.co-coverage-card p,.pattern-demo p{color:#aeb8cb;line-height:1.6;font-size:13px}
      .co-coverage-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:13px;margin-top:20px}.co-coverage-card{padding:17px;border:1px solid rgba(148,163,184,.2);border-radius:15px;background:rgba(30,41,59,.62)}.co-tag{display:inline-block;font-size:10px;font-weight:900;letter-spacing:.08em;color:#c4b5fd;background:rgba(139,92,246,.16);padding:5px 8px;border-radius:7px}.co-coverage-card h3,.pattern-demo h3{font-size:16px;margin:10px 0}.co-coverage-card small{display:block;color:#cbd5e1;line-height:1.55;margin-top:12px}.pattern-demo{display:grid;grid-template-columns:1.2fr 1fr 1fr 1fr;gap:13px;margin-top:18px;padding:18px;border-radius:16px;background:rgba(2,6,23,.55);align-items:end}.pattern-demo label{display:flex;flex-direction:column;gap:7px;font-size:12px;color:#cbd5e1}.pattern-demo input,.pattern-demo select{width:100%;min-width:0;border:1px solid #475569;border-radius:9px;background:#111827;color:#f9fafb;padding:10px;font:inherit}.pattern-result{grid-column:1/-1;border-top:1px solid #334155;padding-top:12px;font-size:13px;overflow-wrap:anywhere}.pattern-result p{margin:7px 0 0}@media(max-width:900px){.co-coverage-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.pattern-demo{grid-template-columns:1fr 1fr}}@media(max-width:560px){.algorithm-coverage{padding:16px}.co-coverage-grid,.pattern-demo{grid-template-columns:1fr}.pattern-result{grid-column:auto}}
    `}</style>
  </section>;
}
