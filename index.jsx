import { useState } from "react";
import { Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Area, ComposedChart } from "recharts";

const data = [
  { month: "Sep 24", avg: 3.47, negPct: 5, posPct: 58, n: 19 },
  { month: "Oct 24", avg: 3.58, negPct: 17, posPct: 75, n: 12 },
  { month: "Nov 24", avg: 4.0, negPct: 0, posPct: 100, n: 1 },
  { month: "Dec 24", avg: 3.57, negPct: 14, posPct: 71, n: 7 },
  { month: "Jan 25", avg: 3.75, negPct: 0, posPct: 75, n: 4 },
  { month: "Feb 25", avg: 2.44, negPct: 50, posPct: 19, n: 16 },
  { month: "Mar 25", avg: 2.48, negPct: 48, posPct: 26, n: 31 },
  { month: "Apr 25", avg: 2.2, negPct: 60, posPct: 15, n: 20 },
  { month: "May 25", avg: 2.77, negPct: 38, posPct: 42, n: 26 },
  { month: "Jun 25", avg: 2.92, negPct: 31, posPct: 54, n: 13 },
  { month: "Jul 25", avg: 2.46, negPct: 46, posPct: 15, n: 13 },
  { month: "Aug 25", avg: 2.83, negPct: 31, posPct: 31, n: 29 },
  { month: "Sep 25", avg: 3.4, negPct: 30, posPct: 55, n: 20 },
  { month: "Oct 25", avg: 3.52, negPct: 28, posPct: 57, n: 40 },
  { month: "Nov 25", avg: 3.84, negPct: 19, posPct: 68, n: 37 },
  { month: "Dec 25", avg: 4.09, negPct: 18, posPct: 72, n: 57 },
  { month: "Jan 26", avg: 3.47, negPct: 33, posPct: 53, n: 30 },
  { month: "Feb 26", avg: 2.78, negPct: 56, posPct: 39, n: 18 }
];

const TT = ({ active, payload }) => {
  if (!active || !payload || !payload.length) return null;
  const d = payload[0] && payload[0].payload;
  if (!d) return null;
  const nc = d.negPct >= 40 ? "#ef4444" : d.negPct >= 25 ? "#f59e0b" : "#22c55e";
  return (
    <div style={{ background: "#1a1a2e", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 8, padding: "12px 16px", fontFamily: "sans-serif", color: "#e0e0e0", fontSize: 13, lineHeight: 1.7 }}>
      <div style={{ fontWeight: 700, fontSize: 14, color: "#fff" }}>{d.month}</div>
      <div>Avg Rating: <span style={{ color: "#60a5fa", fontWeight: 600 }}>{d.avg.toFixed(2)}</span></div>
      <div>Negative: <span style={{ color: nc, fontWeight: 600 }}>{d.negPct}%</span></div>
      <div>Positive: <span style={{ color: "#22c55e", fontWeight: 600 }}>{d.posPct}%</span></div>
      <div style={{ color: "#888", fontSize: 11, marginTop: 2 }}>{d.n} reviews</div>
    </div>
  );
};

const RatingDot = (props) => {
  const { cx, cy, payload } = props;
  if (!cx || !cy || !payload) return null;
  const c = payload.avg < 2.5 ? "#ef4444" : payload.avg < 3.0 ? "#f59e0b" : payload.avg < 3.5 ? "#60a5fa" : "#22c55e";
  const r = Math.max(4, Math.min(8, payload.n / 7));
  return <circle cx={cx} cy={cy} r={r} fill={c} stroke="#1a1a2e" strokeWidth={2} />;
};

export default function App() {
  const [view, setView] = useState("rating");
  const showR = view === "rating" || view === "both";
  const showN = view === "sentiment" || view === "both";

  return (
    <div style={{ background: "linear-gradient(135deg, #0f0f1a, #1a1a2e, #16213e)", minHeight: "100vh", padding: "32px 24px", fontFamily: "system-ui, sans-serif", color: "#e0e0e0" }}>
      <div style={{ maxWidth: 960, margin: "0 auto" }}>
        <h1 style={{ fontSize: 26, fontWeight: 700, color: "#fff", margin: 0 }}>O25 Fitness Open Earbuds</h1>
        <p style={{ color: "#6b7280", fontSize: 13, margin: "4px 0 24px", fontFamily: "monospace" }}>B0DLHH8HG7 - Review trend Sep 2024 to Feb 2026 - 393 reviews</p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 24 }}>
          {[
            { l: "LAUNCH AVG", v: "3.5", s: "H2 2024", c: "#22c55e" },
            { l: "TROUGH", v: "2.2", s: "Apr 2025", c: "#ef4444" },
            { l: "PEAK RECOVERY", v: "4.1", s: "Dec 2025", c: "#22c55e" },
            { l: "CURRENT", v: "2.8", s: "Feb 2026", c: "#ef4444" }
          ].map(function(k, i) {
            return (
              <div key={i} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10, padding: "14px 16px" }}>
                <div style={{ fontSize: 10, color: "#6b7280", letterSpacing: "0.1em", fontWeight: 600 }}>{k.l}</div>
                <div style={{ fontSize: 28, fontWeight: 700, color: k.c, fontFamily: "monospace", marginTop: 2 }}>{k.v}</div>
                <div style={{ fontSize: 11, color: "#4b5563" }}>{k.s}</div>
              </div>
            );
          })}
        </div>

        <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
          {[
            { key: "rating", label: "Avg Rating" },
            { key: "sentiment", label: "Negative %" },
            { key: "both", label: "Combined" }
          ].map(function(t) {
            return (
              <button key={t.key} onClick={function() { setView(t.key); }} style={{
                padding: "6px 16px", borderRadius: 6, fontSize: 13, fontWeight: 600, cursor: "pointer",
                border: view === t.key ? "1px solid #60a5fa" : "1px solid rgba(255,255,255,0.1)",
                background: view === t.key ? "rgba(96,165,250,0.15)" : "rgba(255,255,255,0.03)",
                color: view === t.key ? "#60a5fa" : "#6b7280"
              }}>
                {t.label}
              </button>
            );
          })}
        </div>

        <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12, padding: "20px 12px 12px" }}>
          <ResponsiveContainer width="100%" height={380}>
            <ComposedChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 20 }}>
              <defs>
                <linearGradient id="ngr" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="rgr" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#60a5fa" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#60a5fa" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="month" tick={{ fill: "#6b7280", fontSize: 10, fontFamily: "monospace" }} axisLine={{ stroke: "rgba(255,255,255,0.1)" }} tickLine={false} angle={-45} textAnchor="end" height={50} />
              <YAxis yAxisId="rating" domain={[1, 5]} ticks={[1, 2, 3, 4, 5]} tick={{ fill: showR ? "#60a5fa" : "transparent", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis yAxisId="neg" orientation="right" domain={[0, 70]} tick={{ fill: showN ? "#ef4444" : "transparent", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={function(v) { return showN ? v + "%" : ""; }} />
              <Tooltip content={<TT />} />
              <Area yAxisId="rating" type="monotone" dataKey="avg" fill={showR ? "url(#rgr)" : "transparent"} stroke="none" />
              <Line yAxisId="rating" type="monotone" dataKey="avg" stroke={showR ? "#60a5fa" : "transparent"} strokeWidth={2.5} dot={showR ? <RatingDot /> : false} activeDot={showR ? { r: 6, fill: "#60a5fa", stroke: "#fff", strokeWidth: 2 } : false} name="Avg Rating" />
              <Area yAxisId="neg" type="monotone" dataKey="negPct" fill={showN ? "url(#ngr)" : "transparent"} stroke="none" />
              <Line yAxisId="neg" type="monotone" dataKey="negPct" stroke={showN ? "#ef4444" : "transparent"} strokeWidth={2} strokeDasharray={view === "both" ? "6 3" : "0"} dot={showN ? { fill: "#ef4444", r: 3, stroke: "#1a1a2e", strokeWidth: 2 } : false} name="Negative %" />
              {showR ? <ReferenceLine yAxisId="rating" y={3.24} stroke="rgba(255,255,255,0.15)" strokeDasharray="6 4" /> : null}
              {showN ? <ReferenceLine yAxisId="neg" y={40} stroke="rgba(239,68,68,0.3)" strokeDasharray="4 4" /> : null}
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginTop: 20 }}>
          <div style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: 10, padding: "14px 16px" }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#ef4444", textTransform: "uppercase", letterSpacing: "0.05em" }}>H1 2025 Crash</div>
            <div style={{ fontSize: 12, color: "#9ca3af", marginTop: 6, lineHeight: 1.5 }}>Avg dropped to 2.6, 45% negative. Fit, sound, connectivity complaints dominate.</div>
          </div>
          <div style={{ background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.2)", borderRadius: 10, padding: "14px 16px" }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#22c55e", textTransform: "uppercase", letterSpacing: "0.05em" }}>Q4 2025 Recovery</div>
            <div style={{ fontSize: 12, color: "#9ca3af", marginTop: 6, lineHeight: 1.5 }}>Holiday deals drove recovery. Dec hit 4.09 avg. Positive price sentiment peaked.</div>
          </div>
          <div style={{ background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.2)", borderRadius: 10, padding: "14px 16px" }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#f59e0b", textTransform: "uppercase", letterSpacing: "0.05em" }}>YTD 2026 Decline</div>
            <div style={{ fontSize: 12, color: "#9ca3af", marginTop: 6, lineHeight: 1.5 }}>Feb 2.78 avg, 56% neg. Connectivity tripled vs Q4. Without deals, quality issues exposed.</div>
          </div>
        </div>

        <div style={{ marginTop: 16, fontSize: 11, color: "#4b5563", fontFamily: "monospace" }}>
          Dot size = review volume | green (3.5+) blue (3.0-3.5) amber (2.5-3.0) red (&lt;2.5)
        </div>
      </div>
    </div>
  );
}
