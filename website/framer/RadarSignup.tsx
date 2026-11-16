// Headcorn International Airshow: radar plus boarding-pass email sign-up.
// Framer code component. Assets > Code > + > New component, name it
// RadarSignup, replace everything with this file, save, drag onto the page,
// set width to Fill.
//
// Set two things in the right-hand panel:
//   Image          -> headcorn-from-the-air-busy-day.jpg (or any aerial shot)
//   Mailchimp URL  -> the form "action" URL from Mailchimp:
//                     Audience > Signup forms > Embedded forms, copy the URL
//                     inside action="..." (it contains list-manage.com/subscribe/post).
// Sign-ups go straight into your Mailchimp audience, with Mailchimp's own
// confirmation and error messages shown on the pass.

import * as React from "react"
import { addPropertyControls, ControlType, useIsStaticRenderer } from "framer"

interface Blip {
    label: string
    value: string
    x: number
    y: number
}

interface Props {
    image?: { src?: string; alt?: string } | string
    blips: Blip[]
    coords: string
    eyebrow: string
    titleTop: string
    titleAccent: string
    body: string
    mailchimpUrl: string
    tag: string
    passCode: string
    passFrom: string
    passTo: string
    fields: string
    button: string
    privacy: string
    style?: React.CSSProperties
}

type State = { kind: "idle" | "sending" | "ok" | "error"; msg: string }

// Mailchimp's embedded-form endpoint answers JSONP when /post becomes /post-json,
// which lets the form submit without leaving the page.
function mailchimpJsonp(action: string, data: Record<string, string>): Promise<{ result: string; msg: string }> {
    return new Promise((resolve, reject) => {
        const cb = "hiaMc" + Date.now() + Math.floor(Math.random() * 1000)
        const url = action.replace("/subscribe/post?", "/subscribe/post-json?")
        const params = new URLSearchParams(data)
        params.set("c", cb)
        const s = document.createElement("script")
        const w = window as any
        const done = () => {
            window.clearTimeout(timer)
            delete w[cb]
            s.remove()
        }
        const timer = window.setTimeout(() => {
            done()
            reject(new Error("timeout"))
        }, 12000)
        w[cb] = (res: { result: string; msg: string }) => {
            done()
            resolve(res)
        }
        s.onerror = () => {
            done()
            reject(new Error("network"))
        }
        s.src = url + (url.includes("?") ? "&" : "?") + params.toString()
        document.body.appendChild(s)
    })
}

const stripTags = (t: string) => (t || "").replace(/<[^>]*>/g, "").replace(/^\d+ - /, "")

/**
 * @framerSupportedLayoutWidth any-prefer-fixed
 * @framerSupportedLayoutHeight auto
 * @framerIntrinsicWidth 1200
 */
export default function RadarSignup(props: Props) {
    const {
        image,
        blips,
        coords,
        eyebrow,
        titleTop,
        titleAccent,
        body,
        mailchimpUrl,
        tag,
        passCode,
        passFrom,
        passTo,
        fields,
        button,
        privacy,
        style,
    } = props
    const isStatic = useIsStaticRenderer()
    const [email, setEmail] = React.useState("")
    const [state, setState] = React.useState<State>({ kind: "idle", msg: "" })
    const src = typeof image === "string" ? image : image?.src
    const id = React.useId()

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
            setState({ kind: "error", msg: "Please enter a valid email address." })
            return
        }
        if (!mailchimpUrl || !mailchimpUrl.includes("list-manage.com")) {
            setState({ kind: "error", msg: "Sign-up is not connected yet." })
            return
        }
        setState({ kind: "sending", msg: "" })
        try {
            const data: Record<string, string> = { EMAIL: email }
            if (tag) data.tags = tag
            const res = await mailchimpJsonp(mailchimpUrl, data)
            if (res.result === "success") {
                setState({ kind: "ok", msg: "You're on the list. Check your inbox to confirm." })
                setEmail("")
            } else {
                setState({ kind: "error", msg: stripTags(res.msg) || "Something went wrong. Please try again." })
            }
        } catch {
            setState({ kind: "error", msg: "Couldn't connect. Please try again." })
        }
    }

    const fieldPairs = (fields || "")
        .split("|")
        .filter((f) => f.includes(":"))
        .map((f) => [f.slice(0, f.indexOf(":")), f.slice(f.indexOf(":") + 1)])
        .filter(([k, v]) => k && v)

    return (
        <section className="hiars" style={style}>
            <style>{CSS}</style>
            <div className="hiars-inner">
                <div
                    className="hiars-radar"
                    role="img"
                    aria-label={`Radar over Headcorn Aerodrome: ${(blips || []).map((b) => `${b.label} ${b.value}`).join(", ")}`}
                    style={{ backgroundImage: src ? `url("${src}")` : undefined }}
                >
                    <div className="hiars-shade" />
                    <div className="hiars-rings" />
                    <div className="hiars-cross" />
                    {!isStatic && <div className="hiars-sweep" />}
                    <div className="hiars-home" />
                    {(blips || []).map((b, i) => (
                        <div className="hiars-blip" key={i} style={{ left: `${b.x}%`, top: `${b.y}%` }}>
                            <i />
                            <span>
                                {b.label}
                                <b>{b.value}</b>
                            </span>
                        </div>
                    ))}
                    <div className="hiars-coords">{coords}</div>
                </div>

                <div className="hiars-copy">
                    <div className="hiars-cap">{eyebrow}</div>
                    <h2 className="hiars-title">
                        {titleTop} <span style={{ color: "#D40F0F" }}>{titleAccent}</span>
                    </h2>
                    <p className="hiars-body">{body}</p>

                    <form className="hiars-pass" onSubmit={onSubmit} noValidate>
                        <div className="hiars-main">
                            <div className="hiars-top">
                                <span>BOARDING PASS</span>
                                <b>{passCode}</b>
                            </div>
                            <div className="hiars-route">
                                <div>
                                    <small>FROM</small>
                                    {passFrom}
                                </div>
                                <span className="hiars-line" />
                                <svg viewBox="0 0 24 24" aria-hidden="true">
                                    <path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5z" />
                                </svg>
                                <span className="hiars-line" />
                                <div>
                                    <small>TO</small>
                                    {passTo}
                                </div>
                            </div>
                            <div className="hiars-fields">
                                {fieldPairs.map(([k, v], i) => (
                                    <div key={i}>
                                        <small>{k.trim()}</small>
                                        {v.trim()}
                                    </div>
                                ))}
                            </div>
                            {state.kind === "ok" ? (
                                <p className="hiars-ok" role="status">
                                    {state.msg}
                                </p>
                            ) : (
                                <>
                                    <label className="hiars-label" htmlFor={id}>
                                        Email address
                                    </label>
                                    <input
                                        id={id}
                                        type="email"
                                        name="EMAIL"
                                        autoComplete="email"
                                        placeholder="you@example.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                    <button type="submit" disabled={state.kind === "sending"}>
                                        {state.kind === "sending" ? "Sending..." : button}
                                    </button>
                                    {state.kind === "error" && (
                                        <p className="hiars-err" role="alert">
                                            {state.msg}
                                        </p>
                                    )}
                                </>
                            )}
                            <p className="hiars-privacy">{privacy}</p>
                        </div>
                        <div className="hiars-stub" aria-hidden="true">
                            <div className="hiars-seat">
                                SEAT<b>YOURS</b>
                            </div>
                            <div className="hiars-barcode" />
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@500;700&family=Oswald:wght@400;500;600;700&display=swap');
.hiars{width:100%;background:#0A1543;color:#F4F5F8;font-family:Oswald,sans-serif;container-type:inline-size;overflow:hidden}
.hiars *{box-sizing:border-box;margin:0;padding:0}
.hiars-inner{max-width:1120px;margin:0 auto;padding:80px 24px;display:grid;grid-template-columns:1.05fr 1fr;gap:56px;align-items:center}
.hiars-radar{position:relative;aspect-ratio:1;width:100%;max-width:520px;justify-self:center;border-radius:50%;overflow:hidden;background:#13205E center/cover;box-shadow:0 0 0 1px rgba(255,255,255,.15),0 30px 80px -20px #000}
.hiars-shade{position:absolute;inset:0;background:radial-gradient(circle,rgba(10,21,67,.35) 0%,rgba(5,10,36,.85) 75%)}
.hiars-rings{position:absolute;inset:0;background:repeating-radial-gradient(circle,transparent 0 calc(16.66% - 1px),rgba(255,255,255,.22) calc(16.66% - 1px) 16.66%);-webkit-mask:radial-gradient(circle,#000 70.7%,transparent 70.8%);mask:radial-gradient(circle,#000 70.7%,transparent 70.8%)}
.hiars-cross{position:absolute;inset:0;background:linear-gradient(90deg,transparent calc(50% - .5px),rgba(255,255,255,.22) 0 calc(50% + .5px),transparent 0),linear-gradient(0deg,transparent calc(50% - .5px),rgba(255,255,255,.22) 0 calc(50% + .5px),transparent 0)}
.hiars-sweep{position:absolute;inset:0;border-radius:50%;background:conic-gradient(from 0deg,rgba(212,15,15,0) 0deg,rgba(212,15,15,0) 290deg,rgba(212,15,15,.55) 359deg,rgba(255,255,255,.9) 360deg);animation:hiars-spin 5s linear infinite;mix-blend-mode:screen}
@keyframes hiars-spin{to{transform:rotate(360deg)}}
.hiars-home{position:absolute;left:50%;top:50%;width:14px;height:14px;border:2px solid #fff;transform:translate(-50%,-50%) rotate(45deg)}
.hiars-blip{position:absolute;transform:translate(-6px,-50%);display:flex;align-items:center;gap:10px}
.hiars-blip i{position:relative;flex:none;width:12px;height:12px;border-radius:50%;background:#D40F0F;box-shadow:0 0 0 3px rgba(212,15,15,.35)}
.hiars-blip i:after{content:'';position:absolute;inset:-10px;border-radius:50%;border:2px solid #D40F0F;animation:hiars-ping 2s ease-out infinite}
@keyframes hiars-ping{from{transform:scale(.4);opacity:1}to{transform:scale(1.8);opacity:0}}
.hiars-blip span{font-family:'JetBrains Mono',monospace;font-size:11px;line-height:1.3;background:rgba(5,10,36,.85);padding:5px 8px;border-left:2px solid #D40F0F;white-space:nowrap;text-transform:uppercase}
.hiars-blip span b{display:block;font-size:13px}
.hiars-coords{position:absolute;left:50%;bottom:9%;transform:translateX(-50%);font-family:'JetBrains Mono',monospace;font-size:11px;opacity:.8;white-space:nowrap}
.hiars-cap{text-transform:uppercase;letter-spacing:.14em;font-size:12px;color:#8A93B8}
.hiars-title{font-size:clamp(44px,8cqw,88px);line-height:.9;font-weight:700;text-transform:uppercase;margin:12px 0 20px}
.hiars-body{font-weight:400;font-size:19px;line-height:1.45;color:#C9CEE4;max-width:480px}
.hiars-pass{margin-top:36px;display:grid;grid-template-columns:1fr 120px;background:#F4F5F8;color:#0A1543;border-radius:12px;max-width:560px;
  -webkit-mask:radial-gradient(circle 12px at calc(100% - 120px) 0,transparent 98%,#000) top/100% 51% no-repeat,radial-gradient(circle 12px at calc(100% - 120px) 100%,transparent 98%,#000) bottom/100% 51% no-repeat;
  mask:radial-gradient(circle 12px at calc(100% - 120px) 0,transparent 98%,#000) top/100% 51% no-repeat,radial-gradient(circle 12px at calc(100% - 120px) 100%,transparent 98%,#000) bottom/100% 51% no-repeat}
.hiars-main{padding:20px 22px 22px;border-right:2px dashed #C5CAD9}
.hiars-top{display:flex;justify-content:space-between;align-items:center;font-size:12px;letter-spacing:.18em;font-weight:600}
.hiars-top b{color:#D40F0F}
.hiars-route{display:flex;align-items:center;gap:12px;margin:14px 0 12px}
.hiars-route div{font-size:34px;font-weight:700;line-height:1}
.hiars-route small,.hiars-fields small{display:block;font-size:10px;letter-spacing:.16em;font-weight:500;color:#5A6390;font-family:Oswald,sans-serif}
.hiars-route svg{width:26px;height:26px;fill:#D40F0F;flex:none}
.hiars-line{flex:1;border-top:2px dotted #AEB4CC}
.hiars-fields{display:grid;grid-template-columns:repeat(4,auto);gap:4px 14px;font-family:'JetBrains Mono',monospace;font-size:13px;font-weight:700;margin-bottom:14px}
.hiars-label{display:block;text-transform:uppercase;letter-spacing:.14em;font-size:12px;color:#5A6390;margin-bottom:6px}
.hiars-pass input{width:100%;font:500 16px Oswald,sans-serif;padding:13px 14px;border:2px solid #0A1543;border-radius:6px;margin-bottom:10px;background:#fff;color:#0A1543}
.hiars-pass button{width:100%;min-height:48px;background:#D40F0F;color:#fff;border:0;border-radius:6px;padding:14px;font:700 17px Oswald,sans-serif;letter-spacing:.12em;text-transform:uppercase;cursor:pointer}
.hiars-pass button:disabled{opacity:.7;cursor:default}
.hiars-err{color:#B00C0C;font-size:14px;margin-top:8px}
.hiars-ok{font-size:20px;font-weight:600;padding:12px 0}
.hiars-privacy{font-size:12px;line-height:1.35;color:#4A5280;margin-top:10px;font-weight:400}
.hiars-stub{display:flex;flex-direction:column;justify-content:space-between;align-items:center;padding:20px 10px}
.hiars-seat{text-align:center;font-size:11px;letter-spacing:.16em;color:#5A6390}
.hiars-seat b{display:block;font-size:30px;color:#0A1543;letter-spacing:0}
.hiars-barcode{width:64px;height:120px;background:repeating-linear-gradient(0deg,#0A1543 0 2px,transparent 2px 4px,#0A1543 4px 7px,transparent 7px 9px,#0A1543 9px 10px,transparent 10px 13px)}
@container (max-width:760px){
  .hiars-inner{grid-template-columns:1fr;gap:32px;padding:56px 16px}
  .hiars-blip span{font-size:9px;padding:4px 6px}.hiars-blip span b{font-size:11px}
  .hiars-pass{grid-template-columns:1fr 76px;
    -webkit-mask:radial-gradient(circle 10px at calc(100% - 76px) 0,transparent 98%,#000) top/100% 51% no-repeat,radial-gradient(circle 10px at calc(100% - 76px) 100%,transparent 98%,#000) bottom/100% 51% no-repeat;
    mask:radial-gradient(circle 10px at calc(100% - 76px) 0,transparent 98%,#000) top/100% 51% no-repeat,radial-gradient(circle 10px at calc(100% - 76px) 100%,transparent 98%,#000) bottom/100% 51% no-repeat}
  .hiars-main{padding:16px}
  .hiars-route div{font-size:24px}
  .hiars-fields{grid-template-columns:repeat(2,auto)}
  .hiars-barcode{width:40px}
  .hiars-seat b{font-size:22px}
}
@media (prefers-reduced-motion:reduce){.hiars-sweep,.hiars-blip i:after{animation:none}}
`

addPropertyControls(RadarSignup, {
    image: { type: ControlType.ResponsiveImage, title: "Image" },
    blips: {
        type: ControlType.Array,
        title: "Blips",
        control: {
            type: ControlType.Object,
            controls: {
                label: { type: ControlType.String, title: "Label", defaultValue: "THE THEME" },
                value: { type: ControlType.String, title: "Value", defaultValue: "CLASSIFIED" },
                x: { type: ControlType.Number, title: "X %", min: 5, max: 80, defaultValue: 30 },
                y: { type: ControlType.Number, title: "Y %", min: 10, max: 85, defaultValue: 26 },
            },
        },
        defaultValue: [
            { label: "THE THEME", value: "CLASSIFIED", x: 30, y: 26 },
            { label: "HEADLINE ACTS", value: "NEW YEAR", x: 64, y: 40 },
            { label: "NATIONS", value: "INBOUND", x: 36, y: 70 },
        ],
    },
    coords: { type: ControlType.String, title: "Coordinates", defaultValue: "51°09'N 000°38'E · HEADCORN" },
    eyebrow: { type: ControlType.String, title: "Eyebrow", defaultValue: "What's next" },
    titleTop: { type: ControlType.String, title: "Title", defaultValue: "On the radar for" },
    titleAccent: { type: ControlType.String, title: "Title (red)", defaultValue: "2027." },
    body: {
        type: ControlType.String,
        title: "Body",
        displayTextArea: true,
        defaultValue:
            "A bigger show. More nations inbound. The theme stays classified, and the headline acts land in the new year. Get the news before anyone else.",
    },
    mailchimpUrl: {
        type: ControlType.String,
        title: "Mailchimp URL",
        placeholder: "https://xxxx.us21.list-manage.com/subscribe/post?u=...&id=...",
        defaultValue: "",
    },
    tag: {
        type: ControlType.String,
        title: "Tag ID",
        placeholder: "Optional: the number from Mailchimp's embedded form",
        defaultValue: "",
    },
    passCode: { type: ControlType.String, title: "Pass code", defaultValue: "HIA 27" },
    passFrom: { type: ControlType.String, title: "From", defaultValue: "ANYWHERE" },
    passTo: { type: ControlType.String, title: "To", defaultValue: "EGKH" },
    fields: {
        type: ControlType.String,
        title: "Pass fields",
        defaultValue: "DATE:26 JUN 27|GATES:10:00|FLYING:12:00|CLASS:FIRST TO KNOW",
    },
    button: { type: ControlType.String, title: "Button", defaultValue: "Get on the list" },
    privacy: {
        type: ControlType.String,
        title: "Small print",
        defaultValue: "Lineup news and ticket updates from the Headcorn International Airshow. Unsubscribe any time.",
    },
})
