import React from "react"
import {
    Check, Copy,
    Download,
    RefreshCw
} from "lucide-react"

function ResultPart({result, handleCopy, handleReset, copied }) {

    return (
        <div className="space-y-4" >
            <div className="rounded-xl border border-[#e4e4de] bg-[#fafaf6] flex flex-col items-center gap-4 px-5 py-5" >
                <img
                    src={result.imageUrl}
                    alt={`QR code for ${result.content}`}
                    className="w-32 h-32 rounded-lg bg-white border border-[#E4E4DE] p-3"
                />
                <span className="font-mono text-xs tracking-widest text-[#6b6f76]" >
                    CODE&nbsp;
                    <span className="text-[#2b59ff]" >{result.code}</span>
                </span>
            </div>
            <div>
                <label className="font-mono text-[11px] tracking-widest text-[#6b6f76]" >
                    ENCODED CONTENT
                </label>
                <div className="mt-2 flex items-start gap-2 rounded-xl border border-[#e4e4de] bg-white px-4 py-2.5" >
                    <span className="text-sm text-[#14161a] break-all flex-1" >
                        {result.content}
                    </span>
                    <button
                        onClick={handleCopy}
                        aria-label="Copy content"
                        className="text-[#6b6f76] hover:text-[#14161a] transition shrink-0"
                    >
                        {
                            copied ? (
                                <Check className="w-4 h-4 text-[#2b9f6b]" strokeWidth={1.75} />
                            ) : (
                                <Copy className="w-4 h-4" strokeWidth={1.75} />
                            )
                        }
                    </button>
                </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3" >
                <a
                    href={result.imageUrl}
                    download={`${result.code}.png`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 rounded-lg border border-[#e4e4de]
                    hover:border-[#2b59ff] text-[#1416a] font-medium py-3 transition"
                >
                    <Download className="w-4 h-4" strokeWidth={1.75} />
                    Download PNG
                </a>
                <button
                    onClick={handleReset}
                    className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-[#2b59ff] 
                    hover:bg-[#1f45d6] text-white font-medium py-3 transition"
                >
                    <RefreshCw className="w-4 h-4" strokeWidth={1.75} />
                    Create another
                </button>
            </div>
        </div>
    )
}

export default ResultPart