import { StrictMode } from 'react'
import {Provider} from "./components/ui/provider.jsx"
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {  Route, RouterProvider, createBrowserRouter, createRoutesFromElements} from 'react-router-dom'
import Home from './pages/Home.jsx'
import Chats from './pages/Chats.jsx'
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
      <Route path='' element={<Home/>}/>
      <Route path='/chats' element={<Chats/>}/>
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider>
      <RouterProvider
        router={router}
      
      />
    </Provider>
  </StrictMode>,
)
