import React from "react"

function ResolveImageUrl(imagePath) {
    try {
        const origin = new URL(import.meta.env.VITE_API_BACKEND_URL).origin
        return `${origin}${imagePath}`
    } catch {
        return imagePath
    }
}

export default ResolveImageUrl