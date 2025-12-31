import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router'
import Layout from './layout.tsx'
import { ThemeProvider } from './components/theme-provider.tsx'
import { AuthProvider } from './context/AuthContext.tsx'
import Library from './pages/Library.tsx'
import Register from './pages/Register.tsx'
import Login from './pages/Login.tsx'
import {Toaster} from "sonner"
import './global.css'



createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
      <Toaster
      position='top-right'
      />
      <AuthProvider>
        <Routes>
          {/* rotas que não respeitam o layout */}

          <Route path="/" element={<Register/>} />
          <Route path='login' element={<Login/>}/>
          


          {/* rotas que respeitam */}

          <Route element={<Layout />}>
            <Route path='/library' element={<Library />} />
          </Route>


        </Routes>
      </AuthProvider>
    </ThemeProvider>
  </BrowserRouter>
)
