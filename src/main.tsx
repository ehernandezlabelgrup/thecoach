
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
// import React from 'react'
// ReactDOM.createRoot(document.getElementById('root')!).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
// )
class MyReactAppElement extends HTMLElement {
  constructor() {
    super()
  }

  connectedCallback() {
    this.renderReactComponent()
  }

  renderReactComponent() {
    const container = document.createElement("div")
    this.appendChild(container)
    ReactDOM.createRoot(container).render(<App />)
  }
}
customElements.define("the-coach", MyReactAppElement)