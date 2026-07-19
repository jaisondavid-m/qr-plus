import React, { useEffect } from 'react'
import Router from "../router/Router.jsx"
import useAuthStore from "../store/authStore.js"

function App() {

  const initialize = useAuthStore(state => state.initialize)

  useEffect(() => {
    initialize()
  }, [])

  return (
    <Router />
  )

}

export default App