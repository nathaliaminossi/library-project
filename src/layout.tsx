import { SidebarProvider } from "./components/ui/sidebar"
import { Outlet } from "react-router"


export default function Layout() {
  return (
    <SidebarProvider>
   
      <main className="h-full w-full">
        {/* <SidebarTrigger /> */}
        <Outlet/>
      </main>
    </SidebarProvider>
  )
}