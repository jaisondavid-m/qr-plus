export default function PasswordStrength(pw) {

    if (!pw) return { label: "", pct: 0, color: "#23253F" }

    let score = 0

    if (pw.length >= 8 ) score++
    if (pw.length >= 12 ) score++
    if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) score++
    if (/[0-9]/.test(pw)) score++
    if (/[^A-Za-z0-9]/.test(pw)) score++

    const levels = [
        { label: "Weak", color: "#FF6161" },
        { label: "Weak", color: "#FF6161" },
        { label: "Okay", color: "#F5B9FC" },
        { label: "Good", color: "#35E8C6" },
        { label: "Strong", color: "#35E8C6" },
        { label: "Strong", color: "#35E8C6" }
    ]

    return { ...levels[score], pct: (score/5)*100 }

}