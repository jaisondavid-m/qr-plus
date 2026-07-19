import React from "react"
import QrPreview from "../auth/QrPreview.jsx"
import {
    Loader2
} from "lucide-react"

function CreateForm({ handleSubmit, content, setContent, loading,  }) {

    return (
        <form onSubmit={handleSubmit} noValidate className="space-y-4" >
            <div className="hidden sm:flex rounded-xl border border-[#e4e4de] bg-[#fafaf6] px-4 py-4 flex items-center gap-5" >
                <QrPreview seed={content} />
                <div className="flex flex-col gap-1 min-w-0" >
                    <span className="font-mono text-[11px] tracking-widest text-[#6b6f76]" >
                        LIVE PREVIEW
                    </span>
                    <div className="font-mono text-sm text-[#14161a] truncate" >
                        encode: <span className="text-[#2b59ff]" >{content.trim() || "-"}</span>
                    </div>
                    <span className="sm:hidden text-[10px] font-mono text-[#6b6f76] tracking-widest" >
                        NOT REAL UNTIL GENERATED
                    </span>
                </div>
            </div>
            <div>
                <label
                    htmlFor="content"
                    className="font-mono text-[11px] tracking-widest text-[#6b6f76]"
                >
                    CONTENT
                </label>
                <textarea
                    id="content"
                    name="content"
                    autoFocus
                    rows={2}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="https://macondo.hackclub.com or any text"
                    className="mt-1 sm:mt-2 w-full rounded-xl bg-white border border-[#e4e4de] px-3 py-2.5 sm:px-4 sm:py-3 text-[#14161a]
                    placeholder:text-[#b7b8b2] outline-none focus:border-[#2b59ff] focus:ring-2 focus:ring-[#2b59ff]/20
                    transition resize-none"
                />
            </div>
            <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center justify-center gap-2 rounded-lg bg-[#2b59ff] hover:bg-[#1f45d6]
                disabled:opacity-60 disabled:cursor-not-allowed text-white font-medium py-2.5 transition focus:outline-none
                focus:ring-2 focus:ring-[#2b59ff]/40 focus:ring-offset-2 focus:ring-offset-[#fafaf6]"
            >
                {
                    loading ? (
                        <>
                            <Loader2 className="w-4 h-4 animate-spin" /> Generating...
                        </>
                    ) : (
                        "Generate QR Code"
                    )
                }
            </button>
        </form>
    )

}

export default CreateForm