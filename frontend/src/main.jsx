import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import App from "./App.jsx"
import "./index.css"

// document.documentElement.setAttribute("data-theme", "retro")
const rootElement = document.getElementById("root")
if (!rootElement) throw new Error("Root element not found")

createRoot(rootElement).render(
  <StrictMode>
    {/* wrap the <App/> with <BrowserRouter> to allow my application to use react-router components */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
)
