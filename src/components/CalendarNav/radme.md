# CalendarNav Component

## Descripción

El componente `CalendarNav` es un componente de React que proporciona una interfaz de navegación de calendario. Permite a los usuarios seleccionar fechas y ver el mes actual. Este componente integra `Pikaday` para la selección de fechas y `dayjs` para la manipulación de fechas.

## Características

- Selección de fecha con `Pikaday`.
- Visualización y navegación del mes actual.
- Botón para seleccionar rápidamente la fecha actual.
- Diseño responsivo con CSS adaptable.

## Requisitos

- React 16.8 o superior (para Hooks).
- `Pikaday` y `dayjs` instalados.

## Instalación

Asegúrate de tener instaladas las dependencias necesarias:

```bash
npm install dayjs pikaday
```

## Uso

Para usar el componente `CalendarNav`, impórtalo en tu componente de React y pásale las props necesarias.

```jsx
import React from "react";
import { CalendarNav } from "./path/to/CalendarNav";

function App() {
  return (
    <div>
      <CalendarNav loading={false} />
    </div>
  );
}

export default App;
```

## Props

| Propiedad | Tipo    | Descripción                     |
| --------- | ------- | ------------------------------- |
| loading   | boolean | Estado de carga del componente. |

## Estilos

Incluye `pikaday/css/pikaday.css` y `./styles.css` en tu proyecto para garantizar que el estilo se aplique correctamente.

## Contribuciones

Las contribuciones a este proyecto son bienvenidas. Por favor, asegúrate de seguir las mejores prácticas de desarrollo y de documentar cualquier cambio o mejora.

## Licencia

Este proyecto se distribuye bajo la licencia MIT. Consulta el archivo `LICENSE` para más detalles.

---

Este formato proporciona una descripción clara y detallada de tu componente, facilitando a otros desarrolladores entender y utilizar tu código de manera efectiva.
