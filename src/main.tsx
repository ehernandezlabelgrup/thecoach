/* eslint-disable react-refresh/only-export-components */
import App from "./App"
import "./index.css"
import r2wc from "@r2wc/react-to-web-component"

const WebGreeting = r2wc(App, {
  props: ["id", "URL_BASE"],
})
customElements.define("the-coach", WebGreeting)
