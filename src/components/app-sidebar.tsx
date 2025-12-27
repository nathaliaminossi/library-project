import { Calendar, Home, Inbox, Search, Settings } from "lucide-react"


import {
    Sidebar, SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "./ui/sidebar"
import { ModeToggle } from "./mode-toggle"



// Menu items.
const items = [
    {
        title: "Home",
        url: "/userHome",
        icon: Home,
    },
    {
        title: "Livros",
        url: "/materials",
        icon: Inbox,
    },
    {
        title: "Pendentes",
        url: "/bonifications",
        icon: Calendar,
    },
    {
        title: "Lidos",
        url: "/location",
        icon: Search,
    },
    {
        title: "Configurações",
        url: "/userConfig",
        icon: Settings,
    },
]

export function AppSidebar() {
    return (
        <Sidebar className="">
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Biblioteca</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <a href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>

                </SidebarGroup>

            </SidebarContent>
            <ModeToggle />

        </Sidebar>
    )
}