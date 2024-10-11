import r2wc from "@r2wc/react-to-web-component";
import App from "./App";
import "./index.css";
// Definimos las propiedades que queremos exponer en el Web Component
// Ajusta esto según las props que tenga tu componente App
const AppWebComponent = r2wc(App, {
  props: {
    // Ejemplo: si tu App tiene una prop 'title', la definirías así:
    // title: 'string',
    id_program: "string",
    base_url: "string",
  },
});

// Definimos el nombre del custom element
customElements.define("the-coach", AppWebComponent);

// Esta función se ejecutará cuando el componente se monte en el DOM
function mountApp() {
  const appElement = document.createElement("the-coach");
  document.body.appendChild(appElement);
  appElement.setAttribute("id_program", "3");
  appElement.setAttribute("base_url", "https://thetraktor.com");
}

// Esperamos a que el DOM esté completamente cargado antes de montar nuestra app
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", mountApp);
} else {
  mountApp();
}
