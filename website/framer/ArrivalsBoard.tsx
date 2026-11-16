// Headcorn International Airshow: arrivals board.
// Framer code component. In Framer: Assets > Code > + > New component,
// name it ArrivalsBoard, replace everything with this file, save, then drag
// it onto the page and set its width to Fill.
//
// Every row is editable in the right-hand panel. When an act is announced,
// change its row from CLASSIFIED to the act's name and its style to Revealed.

import * as React from "react"
import { addPropertyControls, ControlType, useIsStaticRenderer } from "framer"

type Tone = "landed" | "classified" | "newyear" | "inbound" | "revealed"

interface Row {
    flight: string
    text: string
    status: string
    tone: Tone
}

interface Props {
    eyebrow: string
    titleTop: string
    titleBottom: string
    nextLabel: string
    nextDate: string
    ghost: string
    rows: Row[]
    footLeft: string
    footRight: string
    highlight: string
    background: string
    style?: React.CSSProperties
}

const RED = "#D40F0F"
const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+"

function usePrefersReducedMotion() {
    const [reduced, setReduced] = React.useState(true)
    React.useEffect(() => {
        if (typeof window === "undefined" || !window.matchMedia) return
        const m = window.matchMedia("(prefers-reduced-motion: reduce)")
        setReduced(m.matches)
        const on = (e: MediaQueryListEvent) => setReduced(e.matches)
        m.addEventListener?.("change", on)
        return () => m.removeEventListener?.("change", on)
    }, [])
    return reduced
}

// One split-flap tile. Renders its real letter on the server and in the
// canvas, so the text is always in the page for Google. Spins only in the
// browser, once, when `go` turns true.
function Flap({ ch, go, delay, color }: { ch: string; go: boolean; delay: number; color: string }) {
    const [shown, setShown] = React.useState(ch)
    React.useEffect(() => {
        setShown(ch)
        if (!go || ch === " ") return
        let n = 6 + delay
        const id = window.setInterval(() => {
            n -= 1
            if (n <= 0) {
                setShown(ch)
                window.clearInterval(id)
            } else {
                setShown(CHARS[Math.floor(Math.random() * CHARS.length)])
            }
        }, 55)
        return () => window.clearInterval(id)
    }, [go, ch, delay])
    if (ch === " ") return <span className="hiaab-flap hiaab-sp" />
    return (
        <span className="hiaab-flap" style={{ color }}>
            {shown}
        </span>
    )
}

/**
 * @framerSupportedLayoutWidth any-prefer-fixed
 * @framerSupportedLayoutHeight auto
 * @framerIntrinsicWidth 1200
 */
export default function ArrivalsBoard(props: Props) {
    const {
        eyebrow,
        titleTop,
        titleBottom,
        nextLabel,
        nextDate,
        ghost,
        rows,
        footLeft,
        footRight,
        highlight,
        background,
        style,
    } = props
    const isStatic = useIsStaticRenderer()
    const reduced = usePrefersReducedMotion()
    const ref = React.useRef<HTMLDivElement>(null)
    const [go, setGo] = React.useState(false)

    React.useEffect(() => {
        if (isStatic || reduced || !ref.current || typeof IntersectionObserver === "undefined") return
        const io = new IntersectionObserver(
            ([e]) => {
                if (e.isIntersecting) {
                    setGo(true)
                    io.disconnect()
                }
            },
            { threshold: 0.35 }
        )
        io.observe(ref.current)
        return () => io.disconnect()
    }, [isStatic, reduced])

    return (
        <section className="hiaab" style={{ ...style, backgroundColor: background }} ref={ref}>
            <style>{CSS}</style>
            <div className="hiaab-ghost" aria-hidden="true">
                {ghost}
            </div>
            <div className="hiaab-inner">
                <div className="hiaab-head">
                    <div>
                        <div className="hiaab-cap">{eyebrow}</div>
                        <h2 className="hiaab-title">
                            {titleTop}
                            <br />
                            <span style={{ color: RED }}>{titleBottom}</span>
                        </h2>
                    </div>
                    <div className="hiaab-clock">
                        <span className="hiaab-cap">{nextLabel}</span>
                        <b style={{ color: highlight }}>{nextDate}</b>
                    </div>
                </div>

                <div className="hiaab-board" role="table" aria-label="Arrivals board">
                    <div className="hiaab-row hiaab-hdr" role="row">
                        <div role="columnheader">FLIGHT</div>
                        <div role="columnheader">ARRIVAL</div>
                        <div role="columnheader" style={{ textAlign: "right" }}>
                            STATUS
                        </div>
                    </div>
                    {(rows || []).map((r, i) => {
                        const text = (r.text || "").toUpperCase()
                        const letterColor = r.tone === "landed" ? "#F4F5F8" : highlight
                        return (
                            <div className="hiaab-row" role="row" key={i}>
                                <div className="hiaab-flight" role="cell">
                                    {r.flight}
                                </div>
                                <div className="hiaab-flaps" role="cell" aria-label={text}>
                                    <span className="hiaab-sr">{text}</span>
                                    <span aria-hidden="true" className="hiaab-flaps-in">
                                        {[...text].map((c, j) => (
                                            <Flap key={j} ch={c} go={go} delay={j * 2 + i} color={letterColor} />
                                        ))}
                                    </span>
                                </div>
                                <div role="cell" className={`hiaab-status hiaab-${r.tone}`}>
                                    {r.tone === "inbound" && <i />}
                                    {r.status}
                                </div>
                            </div>
                        )
                    })}
                </div>

                <div className="hiaab-foot">
                    <span className="hiaab-cap">{footLeft}</span>
                    <span className="hiaab-cap" style={{ color: "#F4F5F8" }}>
                        {footRight}
                    </span>
                </div>
            </div>
        </section>
    )
}

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@500;700&family=Oswald:wght@400;600;700&display=swap');
.hiaab{position:relative;width:100%;overflow:hidden;color:#F4F5F8;font-family:Oswald,sans-serif;container-type:inline-size;
  background-image:repeating-linear-gradient(90deg,transparent 0 79px,rgba(255,255,255,.025) 79px 80px),repeating-linear-gradient(0deg,transparent 0 79px,rgba(255,255,255,.025) 79px 80px),radial-gradient(120% 80% at 80% 0%,#13205E 0%,rgba(5,10,36,0) 60%)}
.hiaab *{box-sizing:border-box;margin:0;padding:0}
.hiaab-ghost{position:absolute;right:-2%;top:8px;font-weight:700;line-height:.8;font-size:34cqw;color:transparent;-webkit-text-stroke:1px rgba(255,255,255,.06);pointer-events:none;user-select:none}
.hiaab-inner{position:relative;max-width:1120px;margin:0 auto;padding:72px 24px 80px}
.hiaab-cap{text-transform:uppercase;letter-spacing:.14em;font-size:12px;color:#8A93B8}
.hiaab-head{display:flex;justify-content:space-between;align-items:flex-end;flex-wrap:wrap;gap:16px;margin-bottom:28px}
.hiaab-title{font-size:clamp(44px,9cqw,96px);line-height:.9;font-weight:700;text-transform:uppercase;margin-top:6px}
.hiaab-clock{text-align:right}
.hiaab-clock b{display:block;font-family:'JetBrains Mono',monospace;font-size:28px}
.hiaab-board{border:1px solid #1C2656;border-radius:6px;background:#070D2E;box-shadow:0 40px 80px -30px #000}
.hiaab-row{display:grid;grid-template-columns:90px 1fr auto;align-items:center;gap:18px;padding:14px 20px;border-top:1px solid #1C2656}
.hiaab-hdr{border-top:0;padding:12px 20px}
.hiaab-hdr div{font-size:11px;letter-spacing:.2em;color:#8A93B8}
.hiaab-flight{font-family:'JetBrains Mono',monospace;font-size:15px;color:#8A93B8}
.hiaab-flaps-in{display:flex;gap:3px}
.hiaab-flap{position:relative;width:30px;height:42px;border-radius:3px;display:grid;place-items:center;font-family:'JetBrains Mono',monospace;font-weight:700;font-size:24px;
  background:linear-gradient(180deg,#18225A 0 50%,#0E1640 50% 100%);box-shadow:inset 0 -1px 0 rgba(0,0,0,.5)}
.hiaab-flap:after{content:'';position:absolute;left:0;right:0;top:50%;height:1px;background:#02041A}
.hiaab-sp{width:12px;background:none;box-shadow:none}
.hiaab-sp:after{display:none}
.hiaab-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}
.hiaab-status{justify-self:end;font-family:'JetBrains Mono',monospace;font-weight:700;font-size:14px;letter-spacing:.1em;padding:8px 12px;border-radius:3px;white-space:nowrap;display:inline-flex;align-items:center;gap:8px}
.hiaab-landed{color:#8A93B8;border:1px solid #1C2656}
.hiaab-classified{background:#D40F0F;color:#fff}
.hiaab-newyear{color:#FFC23D;border:1px solid #FFC23D}
.hiaab-revealed{background:#F4F5F8;color:#0A1543}
.hiaab-inbound{color:#fff;border:1px solid #D40F0F}
.hiaab-inbound i{width:8px;height:8px;border-radius:50%;background:#D40F0F;animation:hiaab-blink 1s steps(2) infinite}
@keyframes hiaab-blink{50%{opacity:0}}
.hiaab-foot{display:flex;justify-content:space-between;flex-wrap:wrap;gap:12px;margin-top:18px}
@container (max-width:760px){
  .hiaab-inner{padding:48px 16px 56px}
  .hiaab-clock{text-align:left}
  .hiaab-row{grid-template-columns:1fr auto;gap:8px 10px;padding:14px}
  .hiaab-hdr{display:none}
  .hiaab-flight{grid-column:1;grid-row:1;font-size:12px}
  .hiaab-status{grid-column:2;grid-row:1;font-size:11px;padding:5px 8px}
  .hiaab-flaps{grid-column:1/-1}
  .hiaab-flaps-in{gap:2px}
  .hiaab-flap{width:22px;height:32px;font-size:18px}
  .hiaab-sp{width:8px}
}
@media (prefers-reduced-motion:reduce){.hiaab-inbound i{animation:none}}
`

addPropertyControls(ArrivalsBoard, {
    eyebrow: { type: ControlType.String, title: "Eyebrow", defaultValue: "Headcorn Aerodrome · EGKH · Arrivals" },
    titleTop: { type: ControlType.String, title: "Title (white)", defaultValue: "Last June." },
    titleBottom: { type: ControlType.String, title: "Title (red)", defaultValue: "One field in Kent." },
    nextLabel: { type: ControlType.String, title: "Next label", defaultValue: "Next arrivals" },
    nextDate: { type: ControlType.String, title: "Next date", defaultValue: "26 JUN 2027" },
    ghost: { type: ControlType.String, title: "Ghost text", defaultValue: "EGKH" },
    rows: {
        type: ControlType.Array,
        title: "Rows",
        control: {
            type: ControlType.Object,
            controls: {
                flight: { type: ControlType.String, title: "Flight", defaultValue: "HIA 27" },
                text: { type: ControlType.String, title: "Arrival", defaultValue: "THE THEME" },
                status: { type: ControlType.String, title: "Status", defaultValue: "CLASSIFIED" },
                tone: {
                    type: ControlType.Enum,
                    title: "Style",
                    options: ["landed", "classified", "newyear", "inbound", "revealed"],
                    optionTitles: ["Landed (grey)", "Classified (red)", "New year (amber)", "Inbound (blink)", "Revealed (white)"],
                    defaultValue: "classified",
                },
            },
        },
        defaultValue: [
            { flight: "HIA 26", text: "4 HURRICANES", status: "LANDED", tone: "landed" },
            { flight: "HIA 26", text: "30+ AIRCRAFT", status: "LANDED", tone: "landed" },
            { flight: "HIA 26", text: "18 OPERATORS", status: "LANDED", tone: "landed" },
            { flight: "HIA 26", text: "20+ VETERANS", status: "LANDED", tone: "landed" },
            { flight: "HIA 26", text: "2 DEF ATTACHÉS", status: "LANDED", tone: "landed" },
            { flight: "HIA 27", text: "THE THEME", status: "CLASSIFIED", tone: "classified" },
            { flight: "HIA 27", text: "HEADLINERS", status: "NEW YEAR", tone: "newyear" },
            { flight: "HIA 27", text: "MORE NATIONS", status: "INBOUND", tone: "inbound" },
        ],
    },
    footLeft: {
        type: ControlType.String,
        title: "Footnote",
        defaultValue: "2026: defence attachés from two nations. Operators from four countries. An RAF Chinook for Armed Forces Day.",
    },
    footRight: { type: ControlType.String, title: "Footnote right", defaultValue: "2027 goes bigger." },
    highlight: { type: ControlType.Color, title: "2027 letters", defaultValue: "#FFC23D" },
    background: { type: ControlType.Color, title: "Background", defaultValue: "#050A24" },
})
