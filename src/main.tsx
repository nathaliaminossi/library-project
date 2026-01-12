import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import { ThemeProvider } from "./components/theme-provider.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";
import Library from "./pages/Library.tsx";
import Login from "./pages/Login.tsx";
import { Toaster } from "sonner";
import "./global.css";
import AppLayout from "./layouts/app-layout.tsx";
import LibraryRead from "./pages/LibraryRead.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <Toaster position="top-right" />
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/library" element={<Library />} />
            <Route path="/lidos" element={<LibraryRead/>}/>
          </Route>
        </Routes>
      </AuthProvider>
    </ThemeProvider>
  </BrowserRouter>
);
