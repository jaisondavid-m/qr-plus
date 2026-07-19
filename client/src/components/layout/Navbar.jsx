import React from "react"
import { Link, useNavigate, useLocation, Links } from "react-router-dom"
import { QrCode, PlusCircle, BarChart3, LogOut } from "lucide-react"

function Navbar() {

    const navigate = useNavigate()
    const location = useLocation()

    function handleLogout() {
        localStorage.removeItem("token")
        navigate("/login")
    }

    const links = [
        { to: "/home", label: "Home", icon: QrCode },
        { to: "/create", label: "Create", icon: PlusCircle },
        { to: "/analytics", label: "Analytics", icon: BarChart3 },
    ]

    return (
        <header className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur border-b border-[#e4e4de]" >
            <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between" >
                <Link
                    to="/home"
                    className="flex items-center gap-2 text-[#14161]"
                >   
                    <QrCode className="w-5 h-5 text-[#2b59ff]" strokeWidth={1.75} />
                    <span className="font-mono text-xs tracking-[0.25em] font-semibold" >
                        QR-PLUS
                    </span>
                </Link>

                <nav className="hidden md:flex items-center gap-1" >
                    {
                        links.map(({ to, label, icon: Icon }) => {
                            const active = location.pathname.startsWith(to)
                            return (
                                <Link
                                    key={to}
                                    to={to}
                                    className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition
                                            ${
                                                active
                                                    ? "bg-[#2b59ff]/10 text-[#2b59ff]"
                                                    : "text-[#6b6f76] hover:text-[#14161a] hover:bg-[#fafaf6]"
                                            }
                                        `}
                                >
                                    <Icon className="w-4 h-4" strokeWidth={1.75} />
                                    {label}
                                </Link>
                            )
                        })
                    }
                </nav>

                <button
                    onClick={handleLogout}
                    className="flex items-center gap-1.5 text-sm font-medium text-[#6b6f76] hover:text-[#c4342e] transition"
                >
                    <LogOut className="w-4 h-4" strokeWidth={1.75} />
                    <span className="hidden sm:inline" >Logout</span>
                </button>

            </div>

            <nav className="md:hidden flex items-center justify-around border-t border-[#e4e4de] px-2 py-1.5" >
                {
                    links.map(({ to, label, icon: Icon }) => {
                        const active = location.pathname.startsWith(to)
                        return (
                            <Link
                                key={to}
                                to={to}
                                className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-lg text-[11px] font-medium transition
                                        ${
                                            active
                                                ? "text-[#2b59ff]"
                                                : "text-[#6b6f76]"
                                        }
                                    `}
                            >
                                <Icon className="w-4 h-4 " strokeWidth={1.75} />
                                {label}
                            </Link>
                        )
                    })
                }
            </nav>

        </header>
    )

}

export default Navbar