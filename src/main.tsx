/* eslint-disable react-refresh/only-export-components */
import App from './App'
import './index.css'
import r2wc from "@r2wc/react-to-web-component"

const WebGreeting = r2wc(App)
customElements.define("web-greeting", WebGreeting)
