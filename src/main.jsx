import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { UserProvider } from './context/UserContext'
import { DeveloperProvider } from './context/DeveloperContext'
import { ContentProvider } from './context/ContentContext'
import './styles/index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <DeveloperProvider>
          <ContentProvider>
            <App />
          </ContentProvider>
        </DeveloperProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
)

