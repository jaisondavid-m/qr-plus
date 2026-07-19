import { create } from "zustand"
import { jwtDecode } from "jwt-decode"

const useAuthStore = create((set) => ({

    token: null,
    user: null,
    isAuthenticated: false,
    loading: true,

    logoutTimer: null,

    login(token) {
        try {
            const user = jwtDecode(token)
            
            localStorage.setItem("token", token)

            const expires = user.exp * 1000 - Date.now()

            setTimeout(() => {

                useAuthStore.getState().logout()

                window.location.href = "/login"

            }, expires)

            set({
                token,
                user,
                isAuthenticated: true,
                loading: false,
            })

        } catch {
            
            localStorage.removeItem("token")

            set({
                token: null,
                user: null,
                isAuthenticated: false,
                loading: false,
            })

        }
    },

    logout() {

        localStorage.removeItem("token")

        set({
            token: null,
            user: null,
            isAuthenticated: false,
            loading: false,
        })

    },

    initialize() {

        const token = localStorage.getItem("token")

        if (!token) {
            set({
                loading: false,
                isAuthenticated: false,
            })
            return
        }

        try {

            const user = jwtDecode(token)

            if (user.exp * 1000 < Date.now()) {

                localStorage.removeItem("token")

                set({
                    token: null,
                    user: null,
                    isAuthenticated: false,
                    loading: false,
                })

                return 

            }

            set({
                token,
                user,
                isAuthenticated: true,
                loading: false,
            })

        } catch {

            localStorage.removeItem("token")

            set({
                token: null,
                user: null,
                isAuthenticated: false,
                loading: false,
            })

        }

    },

}))

export default useAuthStore