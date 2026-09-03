import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter } from "react-router-dom"

import "@/styles/index.css"

import App from "@/App"

// CodeIsFire.github.io is a user site served from the domain root, so
// BrowserRouter needs no basename. Deep links are recovered by the 404.html
// copy that the deploy workflow writes alongside index.html.
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
