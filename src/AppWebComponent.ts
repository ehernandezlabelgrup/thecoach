/* eslint-disable @typescript-eslint/ban-ts-comment */
import { createComponent } from '@lit/react'
import App from './App.tsx'
import React from 'react'

createComponent( { 
    tagName: 'mi-app-componente',
// @ts-ignore
    elementClass: App,
react: React,
})
// @ts-ignore
// customElements.define('mi-app-componente', AppWebComponent)
