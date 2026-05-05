import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';

// require download package:
// react-bootstrap, react-router-dom, font awesome, @reduxjs/toolkit react-redux, firebase, fast-deep-equal

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
