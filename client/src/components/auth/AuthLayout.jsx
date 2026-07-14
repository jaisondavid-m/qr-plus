import React from "react"
import { QrCode, Sun, TrendingUp } from "lucide-react"
import QrPreview from "./QrPreview.jsx"
import ScanTicker from "./ScanTicker.jsx"

function AuthLayout({
    mode = "login",
    previewId = "",
    eyebrow,
    title,
    subtitle,
    children,
}) {

    // const role = mode === "register" ? "user" : "?"
    const sub = previewId.trim() ? previewId.trim() : "-"
    const status = mode === "register" ? "PENDING · FIRST CODE" : "READY TO SCAN"

    return (
        <div className="min-h-screen w-full auth-void font-body flex" >
            <aside
                className="hidden md:flex md:w-[42%] lg:w-[38%] flex-col justify-between border-r border-[#1F2140] px-10 py-10 relative overflow-hidden
                text-white bg-[#0F172A]"
            >   
                <div>
                    <div className="flex items-center gap-2 text-[#7C5CFF]" >
                        <QrCode className="w-5 h-5 auth-pulse" strokeWidth={1.75} />
                        <span className="font-mono text-xs tracking-[0.2em] text-[#8A8DAE]" >
                            QR-PLUS&nbsp;CONSOLE
                        </span>
                    </div>
                    <h1 className="font-display text-3xl lg:text-4xl font-semibold text-[#EDEEF7] mt-8 leading-tight" > 
                        Every scan
                        <br/>
                        tells a story.
                    </h1>
                    <p className="font-body text-sm text-[#8A8DAE] mt-4 max-w-xs leading-relaxed" >
                        Generate a code, drop it anywhere and watch where,
                        when and how often if gets scanned.
                        {/* Your password never leaves this device unhashed. What comes back */}
                        {/* is a token - a small, signed statement about who you are. */}
                    </p>
                </div>

                <div className="relative rounded-xl border border-[#E4E4DE] bg-white px-5 py-5 flex items-center gap-5" >
                    <QrPreview seed={sub} />
                    <div className="flex flex-col gap-3" >
                        <div>
                            <span className="font-mono text-[11px] tracking-widest text-[#6B6F76]" > 
                                LIVE PREVIEW
                            </span>
                            <div className="font-mono text-sm text-[#14161A] mt-1" >
                                encodes: <span className="text-[#2B59FF]" >{sub}</span>
                                {sub === "-" && (
                                    <span className="auth-cursor text-[#2B59FF]" >
                                        ▍
                                    </span>
                                )}
                            </div>
                            <span className="text-[10px] text-[#6B6F76] tracking-widest" >
                                {status}
                            </span>
                        </div>
                        <ScanTicker mode={mode} />
                    </div>
                </div>
            </aside>
            <main className="flex-1 flex items-center justify-center px-6 py-12" >
                <div className="w-full max-w-sm rounded-3xl bg-white shadow-xl border border-slate-200 auth-rise p-10" >
                    {eyebrow && (
                        <span className="font-mono text-xs tracking-[0.25em] text-[#2B59FF]" >
                            {eyebrow}
                        </span>
                    )}
                    <h2 className="font-display text-2xl font-semibold text-[#14161A] mt-3" >  
                        {title}
                    </h2>
                    {subtitle && (
                        <p className="font-body text-sm text-[#6B6F76] mt-2 mb-2" >
                            {subtitle}
                        </p>
                    )}
                    {!subtitle && <div className="mb-8" />}
                    {children}
                </div>
            </main>
        </div>
    )
}

export default AuthLayout