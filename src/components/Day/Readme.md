# Day Component

## Descripción

El componente `Day` es un componente de React que maneja la visualización de un día en un calendario o agenda. Dependiendo del estado de carga, muestra un contenido diferente: `DayLoading` para el estado de carga y `DayEmpty` para un día sin eventos programados.

## Características

- **DayEmpty**: Muestra un día sin eventos, con opciones para agregar actividades o notas.
- **DayLoading**: Visualiza un estado de carga con animaciones de "carga" estilizadas.

## Requisitos

- React 16.8 o superior.
- Componentes `DayEmpty` y `DayLoading` presentes en el proyecto.

## Instalación

Asegúrate de que todos los componentes y dependencias están correctamente instalados en tu proyecto.

## Uso

Importa y utiliza el componente `Day` en tu aplicación de React.

```jsx
import React from "react";
import Day from "./path/to/Day";

function CalendarView() {
  const loading = false; // Determina si mostrar el estado de carga o no
  return <Day loading={loading} />;
}

export default CalendarView;
```

## Props

El componente `Day` acepta las siguientes propiedades:

| Propiedad | Tipo    | Descripción                                                                            |
| --------- | ------- | -------------------------------------------------------------------------------------- |
| loading   | boolean | Si es `true`, muestra el componente `DayLoading`. De lo contrario, muestra `DayEmpty`. |

## Estructura Interna

- **DayEmpty**: Contiene elementos de UI para un día sin eventos, incluyendo iconos y acciones.
- **DayLoading**: Presenta un diseño de carga con elementos gráficos.

## Estilos

Asegúrate de incluir los archivos CSS correspondientes para `DayEmpty` y `DayLoading` para garantizar que los estilos se apliquen correctamente.

## Contribuciones

Las contribuciones son bienvenidas. Por favor, sigue las guías de contribución del proyecto para asegurar una integración fluida.

## Licencia

Este proyecto se distribuye bajo la licencia MIT. Consulta el archivo `LICENSE` en el repositorio para más detalles.
