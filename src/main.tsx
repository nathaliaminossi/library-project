import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router'
import Layout from './layout.tsx'
import { ThemeProvider } from './components/theme-provider.tsx'
import { AuthProvider } from './context/AuthContext.tsx'
import Library from './pages/Library.tsx'
import './global.css'



createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
      <AuthProvider>
        <Routes>
          {/* rotas que não respeitam o layout */}

          <Route path="/" />


          {/* rotas que respeitam */}

          <Route element={<Layout />}>
            <Route path='/library' element={<Library />} />
          </Route>


        </Routes>
      </AuthProvider>
    </ThemeProvider>
  </BrowserRouter>
)
