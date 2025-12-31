import { use } from "react"
import { useAuth } from "../context/AuthContext"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "./ui/avatar"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"

export function UserMenu() {
  const {user} = useAuth()


  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2 rounded-full focus:outline-none">
          <Avatar className="h-9 w-9">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>BM</AvatarFallback>
          </Avatar>

          <span className="hidden sm:block text-sm font-medium text-neutral-50">
            {user?.name ?? ""} 
          </span>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuItem>Perfil</DropdownMenuItem>
        <DropdownMenuItem>Configurações</DropdownMenuItem>
        <DropdownMenuItem className="text-red-500">
          Sair
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
