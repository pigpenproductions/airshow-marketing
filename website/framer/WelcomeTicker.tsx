// Headcorn International Airshow: scrolling welcome strip.
// Framer code component. Assets > Code > + > New component, name it
// WelcomeTicker, replace everything with this file, save, drag onto the page
// above the arrivals board, set width to Fill.

import * as React from "react"
import { addPropertyControls, ControlType } from "framer"

interface Props {
    words: string[]
    seconds: number
    background: string
    color: string
    style?: React.CSSProperties
}

const Plane = ({ color }: { color: string }) => (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" style={{ fill: color, flex: "none" }}>
        <path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5z" />
    </svg>
)

/**
 * @framerSupportedLayoutWidth any-prefer-fixed
 * @framerSupportedLayoutHeight auto
 * @framerIntrinsicWidth 1200
 */
export default function WelcomeTicker(props: Props) {
    const { words, seconds, background, color, style } = props
    const list = (words || []).filter(Boolean)
    const half = (key: string) =>
        list.map((w, i) => (
            <span className="hiatk-item" key={key + i}>
                {w}
                <Plane color={color} />
            </span>
        ))
    return (
        <div className="hiatk" style={{ ...style, background, color }} aria-hidden="true">
            <style>{CSS}</style>
            <div className="hiatk-track" style={{ animationDuration: `${seconds}s` }}>
                {half("a")}
                {half("b")}
            </div>
        </div>
    )
}

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Oswald:wght@600&display=swap');
.hiatk{width:100%;overflow:hidden;white-space:nowrap;padding:11px 0}
.hiatk-track{display:inline-flex;animation:hiatk-move linear infinite;will-change:transform}
.hiatk-item{display:inline-flex;align-items:center;gap:28px;padding-right:28px;font:600 15px Oswald,sans-serif;letter-spacing:.12em;text-transform:uppercase}
@keyframes hiatk-move{to{transform:translateX(-50%)}}
@media (prefers-reduced-motion:reduce){.hiatk-track{animation:none}}
`

addPropertyControls(WelcomeTicker, {
    words: {
        type: ControlType.Array,
        title: "Words",
        control: { type: ControlType.String },
        defaultValue: [
            "Welcome",
            "Bienvenue",
            "Willkommen",
            "Welkom",
            "Benvenuti",
            "Velkommen",
            "Witamy",
            "Bienvenidos",
            "Headcorn · 26-27 June 2027",
        ],
    },
    seconds: { type: ControlType.Number, title: "Loop (sec)", min: 10, max: 120, defaultValue: 40 },
    background: { type: ControlType.Color, title: "Background", defaultValue: "#D40F0F" },
    color: { type: ControlType.Color, title: "Text", defaultValue: "#FFFFFF" },
})
