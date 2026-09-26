# ⭐ To-Do App

Aplicación web responsive de gestión de tareas desarrollada con **React y TypeScript**.

El objetivo del proyecto fue construir una aplicación de tareas utilizando `useReducer` para administrar el estado, `useEffect` para persistir la información en `localStorage` y **Zod** para validar los datos almacenados antes de utilizarlos.

---

## 📌 Descripción

Este proyecto consiste en una aplicación de lista de tareas que permite agregar, completar y eliminar tareas de forma sencilla.

La aplicación utiliza un `useReducer` para centralizar la lógica relacionada con el estado de las tareas y mantener las diferentes acciones organizadas.

Las tareas se almacenan automáticamente en `localStorage`, permitiendo conservar la información incluso después de recargar la página.

Para garantizar que los datos recuperados desde `localStorage` tengan la estructura esperada, se implementaron esquemas de validación utilizando **Zod**.

Además, la aplicación muestra información sobre el progreso de las tareas, incluyendo el número de tareas completadas, pendientes y el porcentaje de progreso mediante una barra visual.

La interfaz fue construida utilizando **Tailwind CSS** y componentes de **shadcn/ui**, buscando mantener una estructura limpia, reutilizable y responsive.

---

## 🚀 Demo

👉 Demo pendiente.

---

## 🛠️ Tecnologías utilizadas

- React
- TypeScript
- Tailwind CSS
- shadcn/ui
- Zod
- Lucide React
- localStorage

---

## 🎯 Características principales

- 📝 Agregar nuevas tareas
- ⌨️ Agregar tareas presionando la tecla **Enter**
- ✅ Marcar tareas como completadas o pendientes
- 🗑️ Eliminar tareas
- 📊 Visualización del progreso de las tareas
- 📈 Porcentaje de tareas completadas
- 💾 Persistencia de datos mediante `localStorage`
- 🔐 Validación de datos almacenados utilizando **Zod**
- 🧠 Administración del estado mediante `useReducer`
- 🎨 Clases condicionales según el estado de cada tarea
- 📱 Diseño responsive
- 🧩 Uso de componentes reutilizables mediante shadcn/ui

---

## 🧠 Aprendizajes

Durante este proyecto reforcé conceptos importantes de **React, TypeScript y manejo de estado**, entre ellos:

- Manejo de estado local con `useState`
- Administración de estados complejos utilizando `useReducer`
- Creación y tipado de acciones para un reducer mediante TypeScript
- Implementación de funciones puras para actualizar el estado
- Uso de `useEffect` para sincronizar el estado de React con `localStorage`
- Persistencia y recuperación de información desde `localStorage`
- Validación de datos en tiempo de ejecución utilizando **Zod**
- Creación de esquemas con `z.object()` y validación mediante `safeParse()`
- Uso de `z.infer` y esquemas de validación como fuente de seguridad para datos externos
- Renderizado condicional en React
- Uso de clases condicionales dependiendo del estado de una tarea
- Manejo de eventos de teclado y formularios
- Uso de `map()` y `filter()` para transformar y actualizar arreglos sin modificar el estado original
- Organización de la lógica de negocio mediante un reducer
- Creación de interfaces con componentes de shadcn/ui
- Uso de iconos mediante Lucide React
- Desarrollo de interfaces responsive con Tailwind CSS

---

## 🔄 Manejo del estado

La aplicación utiliza `useReducer` para centralizar las operaciones relacionadas con las tareas.

El reducer contempla tres acciones principales:

- `ADD_TODO` — agrega una nueva tarea.
- `TOGGLE_TODO` — cambia una tarea entre completada y pendiente.
- `DELETE_TODO` — elimina una tarea.

El estado mantiene información sobre:

- Lista de tareas.
- Número total de tareas.
- Número de tareas completadas.
- Número de tareas pendientes.

Esta estructura permite mantener la lógica de actualización del estado separada de la interfaz.

---

## 💾 Persistencia y validación de datos

Cada vez que el estado de las tareas cambia, `useEffect` guarda la información actualizada en `localStorage`.

Al iniciar la aplicación, los datos almacenados son recuperados y validados mediante **Zod** antes de incorporarse al estado de React.

Esto permite comprobar que los datos almacenados mantengan la estructura esperada y evitar utilizar información inválida.

Si los datos no existen o no superan la validación, la aplicación inicia con una lista de tareas vacía.

---

## 👨‍💻 Autor

Desarrollado por **Aldo Sandoval Zepeda**
_(Frontend Developer en formación con enfoque en desarrollo de interfaces modernas y responsivas.)_

---

## ⭐ Notas finales

Este proyecto forma parte de mi portafolio y demuestra habilidades en desarrollo frontend utilizando React y TypeScript, manejo de estado con `useReducer`, persistencia de información con `localStorage`, validación de datos con Zod, componentes reutilizables y diseño responsive con Tailwind CSS.

El proyecto también representa una práctica de organización de lógica de negocio mediante reducers y de validación de datos externos antes de utilizarlos dentro de la aplicación.
