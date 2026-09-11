import React from "react";
import { AbsoluteFill, Easing, useCurrentFrame } from "remotion";

// The apo-video SpineRing (src/components/SpineRing.tsx in ../apo-video),
// ported as a seamless 12s cover: four directed arc arrows, sharp mono node
// boxes with step numbers, and a white token gliding node to node. No apo
// logo — the ring itself is the composition. 360 frames = exactly 2 laps of
// 180, and the token state is a pure function of (frame % 180), so the video
// loops invisibly.

const WIDTH = 1600;
const HEIGHT = 900;
const LAP = 180;

// Design tokens from ../apo-video/src/theme.ts (dashboard identity: pure
// black, monochrome, color reserved for state).
const color = {
  background: "oklch(0 0 0)",
  foreground: "oklch(1 0 0)",
  card: "oklch(0.18 0 0)",
  mutedForeground: "oklch(0.6 0 0)",
  borderStrong: "oklch(0.65 0 0)",
  success: "oklch(0.78 0.19 155)",
  destructive: "oklch(0.8 0.16 25)",
} as const;

const FONT = `"JetBrains Mono Nerd Font", "JetBrains Mono", ui-monospace, monospace`;

const RING = 420;
const RADIUS = RING / 2 - 14;

const NODES = ["Run agent", "Verdict", "Evidence", "Improve"] as const;

// Token schedule within one lap, as an explicit cyclic segment list covering
// every frame: dwell on a node, then travel to the next. Travels are 23
// frames and eased (accelerate out, settle in) — the apo video's glide, just
// loopable. The last travel wraps past 180 so the token lands back on Run
// agent exactly at the seam.
type Segment =
  | { kind: "dwell"; node: number; start: number; end: number }
  | { kind: "travel"; from: number; to: number; start: number; end: number };

const SEGMENTS: Segment[] = [
  { kind: "dwell", node: 0, start: 13, end: 20 },
  { kind: "travel", from: 0, to: 1, start: 20, end: 43 },
  { kind: "dwell", node: 1, start: 43, end: 73 },
  { kind: "travel", from: 1, to: 2, start: 73, end: 97 },
  { kind: "dwell", node: 2, start: 97, end: 122 },
  { kind: "travel", from: 2, to: 3, start: 122, end: 145 },
  { kind: "dwell", node: 3, start: 145, end: 170 },
  { kind: "travel", from: 3, to: 0, start: 170, end: 193 },
];

// Ease for the token's glide: slow out of the node, cruise, settle in.
const easeGlide = Easing.inOut(Easing.cubic);

// Small interpolation helpers for the highlight that follows the token.
const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const smoothstep = (v: number) => {
  const x = clamp01(v);
  return x * x * (3 - 2 * x);
};
// Angular window (degrees) over which a node lights up around the token.
const PROX_ON = 10;
const PROX_OFF = 38;
// oklch color interpolation via CSS color-mix (rendered by Chromium).
const mix = (a: string, b: string, t: number) =>
  t <= 0 ? a : t >= 1 ? b : `color-mix(in oklch, ${a}, ${b} ${Math.round(t * 100)}%)`;

const mod = (v: number, m: number) => ((v % m) + m) % m;

export const LoopEngineeringCover: React.FC = () => {
  const frame = useCurrentFrame();
  const lap = Math.floor(frame / LAP); // 0 or 1
  const within = mod(frame, LAP);

  const segment =
    SEGMENTS.find((s) =>
      s.start < s.end
        ? within >= s.start && within < s.end
        : within >= s.start || within < s.end - LAP,
    ) ?? SEGMENTS[0];
  const traveling = segment.kind === "travel";
  const segStart = segment.start;
  const segEnd = segment.end;
  // mod() handles the last leg, whose window wraps past 180 into frame 0.
  const progress = traveling
    ? easeGlide(Math.min(1, mod(within - segStart, LAP) / (segEnd - segStart)))
    : 1;

  // The leg currently in play: the travel segment itself, or the one that
  // just ended while dwelling on its destination.
  const legIndex = SEGMENTS.indexOf(segment);
  const leg: Segment =
    traveling ? segment : SEGMENTS[mod(legIndex - 1, SEGMENTS.length)];
  const legFrom = traveling
    ? (segment as Extract<Segment, { kind: "travel" }>).from
    : (leg as Extract<Segment, { kind: "travel" }>).from;
  const legTo = traveling
    ? (segment as Extract<Segment, { kind: "travel" }>).to
    : (leg as Extract<Segment, { kind: "travel" }>).to;

  // Verdict lands the moment the token reaches the Verdict node: run 1
  // fails, run 2 passes — the red/green thread of the whole story.
  const verdict = frame >= LAP + 43 ? "pass" : frame >= 43 ? "fail" : "pending";

  // Token angle, wrapping clockwise from Improve back to Run agent.
  const fromDeg = -90 + legFrom * 90;
  const toDeg = -90 + legTo * 90 + (legFrom === 3 ? 360 : 0);
  const tokenDeg = fromDeg + (toDeg - fromDeg) * progress;
  const tokenRad = (tokenDeg * Math.PI) / 180;

  // Dwell pulse once arrived (same formula as SpineRing), anchored at the
  // dwell start so it is identical every lap.
  const dwellPhase = traveling ? 0 : within - segStart;
  const pulse = traveling ? 1 : 1 + 0.12 * Math.sin((dwellPhase / 28) * Math.PI);

  // Node highlight follows the token instead of teleporting to the
  // destination at departure: each box's activation is its angular
  // proximity to the token, so a node lights up as its arrow arrives and
  // fades again as the token moves on.
  const nodeActivation = (index: number) => {
    const nodeDeg = -90 + index * 90;
    const d = Math.abs(mod(tokenDeg - nodeDeg + 180, 360) - 180);
    return smoothstep(1 - clamp01((d - PROX_ON) / (PROX_OFF - PROX_ON)));
  };

  // Per-arc green state: the leg in play fills toward the token and its
  // arrowhead lands green just before arrival; the leg just traveled fades
  // back to gray over the first frames of the next leg instead of popping
  // off the moment the token departs.
  const prevLegFrom = traveling
    ? (SEGMENTS[mod(legIndex - 2, SEGMENTS.length)] as Extract<Segment, { kind: "travel" }>).from
    : -1;
  const arcState = [0, 1, 2, 3].map(
    (i): { green: number; head: number; fillTo: number | null } => {
      if (i === legFrom) {
        return traveling
          ? { green: 1, head: smoothstep((progress - 0.7) / 0.3), fillTo: tokenDeg }
          : { green: 1, head: 1, fillTo: null };
      }
      if (traveling && i === prevLegFrom) {
        const fade = 1 - clamp01((within - segStart) / 8);
        return { green: fade, head: fade, fillTo: null };
      }
      return { green: 0, head: 0, fillTo: null };
    },
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: color.background,
        fontFamily: FONT,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={{ position: "relative", width: RING, height: RING }}>
        <svg viewBox={`0 0 ${RING} ${RING}`} width={RING} height={RING}>
          {[0, 1, 2, 3].map((index) => (
            <ArcArrow key={index} index={index} state={arcState[index]} />
          ))}
        </svg>

        {/* Token: white dot over black ring, sliding under the boxes */}
        {(() => {
          const x = RING / 2 + RADIUS * Math.cos(tokenRad);
          const y = RING / 2 + RADIUS * Math.sin(tokenRad);
          return (
            <div
              style={{
                position: "absolute",
                left: x,
                top: y,
                width: 24,
                height: 24,
                borderRadius: "50%",
                background: color.foreground,
                border: `5px solid ${color.background}`,
                transform: `translate(-50%, -50%) scale(${pulse.toFixed(3)})`,
                boxShadow: "0 0 14px rgba(255,255,255,0.35)",
              }}
            />
          );
        })()}

        {NODES.map((label, index) => (
          <NodeBox
            key={label}
            label={label}
            step={index + 1}
            index={index}
            activation={nodeActivation(index)}
            verdict={index === 1 ? verdict : undefined}
          />
        ))}

        {/* Center: no logo, just the loop name and the run counter */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
            textAlign: "center",
          }}
        >
          <span
            style={{
              fontSize: 19,
              color: color.mutedForeground,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
            }}
          >
            the loop
          </span>
          <span style={{ fontSize: 24, color: color.mutedForeground }}>
            run {lap + 1} / 2
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const polar = (deg: number, radius = RADIUS) => {
  const r = (deg * Math.PI) / 180;
  return {
    x: RING / 2 + radius * Math.cos(r),
    y: RING / 2 + radius * Math.sin(r),
  };
};

/** Half-angle a node box subtends on the ring, plus margin. Wide boxes
 *  (top/bottom) take a bigger bite than tall ones. */
const halfAngleOf = (node: number) => {
  const horizontal = node === 0 || node === 2;
  const halfExtent = horizontal ? 92 : 50;
  return (Math.asin(Math.min(1, halfExtent / RADIUS)) * 180) / Math.PI;
};

/**
 * One directed arc of the ring (shaft + solid arrowhead), ported from
 * SpineRing. Green amounts come precomputed from the parent: the shaft
 * fills toward the token on the leg in play, the arrowhead lands green
 * just before the token arrives, and everything fades back to gray on
 * departure instead of popping off.
 */
const ArcArrow: React.FC<{
  index: number;
  state: { green: number; head: number; fillTo: number | null };
}> = ({ index, state }) => {
  const next = (index + 1) % 4;
  const fromDeg = -90 + index * 90 + halfAngleOf(index);
  const toDeg = -90 + next * 90 - halfAngleOf(next) + (index === 3 ? 360 : 0);
  let spanDeg = toDeg - fromDeg;
  if (spanDeg <= 0) spanDeg += 360;
  const p1 = polar(fromDeg);
  const p2 = polar(toDeg);
  const arcLength = ((spanDeg * Math.PI) / 180) * RADIUS;

  // Green overlay: fills toward the token while its leg is in play
  // (fillTo), covers the whole arc while dwelling or fading out, and tints
  // toward gray as `green` decays — never popping off instantly.
  const greenToDeg = state.fillTo !== null ? state.fillTo : toDeg;
  const greenSpan = Math.min(spanDeg, Math.max(0, greenToDeg - fromDeg));
  const gp1 = polar(fromDeg);
  const gp2 = polar(greenToDeg);
  const greenLarge = greenSpan > 180 ? 1 : 0;
  const greenD =
    state.green > 0.02 && greenSpan > 0.5
      ? `M ${gp1.x.toFixed(1)} ${gp1.y.toFixed(1)} A ${RADIUS} ${RADIUS} 0 ${greenLarge} 1 ${gp2.x.toFixed(1)} ${gp2.y.toFixed(1)}`
      : undefined;

  // Arrowhead at the arc's end, pointed along the clockwise tangent.
  const tangent = ((toDeg + 90) * Math.PI) / 180;
  const radial = (toDeg * Math.PI) / 180;
  const u = { x: Math.cos(tangent), y: Math.sin(tangent) };
  const v = { x: Math.cos(radial), y: Math.sin(radial) };
  const tip = { x: p2.x + u.x * 10, y: p2.y + u.y * 10 };
  const back = { x: p2.x - u.x * 4, y: p2.y - u.y * 4 };
  const cornerA = { x: back.x + v.x * 10, y: back.y + v.y * 10 };
  const cornerB = { x: back.x - v.x * 10, y: back.y - v.y * 10 };
  const f = (n: number) => n.toFixed(1);
  return (
    <g>
      <path
        d={`M ${f(p1.x)} ${f(p1.y)} A ${RADIUS} ${RADIUS} 0 0 1 ${f(p2.x)} ${f(p2.y)}`}
        fill="none"
        stroke={color.mutedForeground}
        strokeWidth={3}
      />
      {greenD ? (
        <path
          d={greenD}
          fill="none"
          stroke={mix(color.mutedForeground, color.success, state.green)}
          strokeWidth={3.5}
        />
      ) : null}
      <polygon
        points={`${f(tip.x)},${f(tip.y)} ${f(cornerA.x)},${f(cornerA.y)} ${f(cornerB.x)},${f(cornerB.y)}`}
        fill={mix(color.mutedForeground, color.success, state.head)}
      />
    </g>
  );
};

/** Node box, ported from SpineNode: sharp corners, mono, step number. The
 *  highlight is continuous (0..1 activation from token proximity), so the
 *  border/fill/text glide between resting and active with the token — a
 *  landed verdict keeps its state color and says so. */
const NodeBox: React.FC<{
  label: string;
  step: number;
  index: number;
  activation: number;
  verdict?: "pending" | "fail" | "pass";
}> = ({ label, step, index, activation, verdict }) => {
  const deg = -90 + index * 90;
  const rad = (deg * Math.PI) / 180;
  const verdictLanded = verdict === "fail" || verdict === "pass";
  const accent = verdictLanded
    ? verdict === "fail"
      ? color.destructive
      : color.success
    : mix(color.borderStrong, color.foreground, activation);
  const text = verdictLanded
    ? accent
    : mix(color.mutedForeground, color.foreground, activation);
  return (
    <div
      style={{
        position: "absolute",
        left: RING / 2 + RADIUS * Math.cos(rad),
        top: RING / 2 + RADIUS * Math.sin(rad),
        transform: "translate(-50%, -50%)",
        minWidth: 170,
        padding: "12px 18px",
        borderWidth: 2,
        borderStyle: "solid",
        borderColor: accent,
        backgroundColor: mix(color.background, color.card, activation),
        color: text,
        boxShadow:
          activation > 0.02
            ? `0 0 18px rgba(255,255,255,${(0.12 * activation).toFixed(3)})`
            : undefined,
        fontSize: 23,
        fontWeight: 600,
        textAlign: "center",
        lineHeight: 1.25,
      }}
    >
      <div
        style={{
          fontSize: 14,
          fontWeight: 400,
          color: color.mutedForeground,
          letterSpacing: "0.2em",
        }}
      >
        {String(step).padStart(2, "0")}
      </div>
      {verdictLanded ? (verdict === "fail" ? "FAIL" : "PASS") : label}
    </div>
  );
};
