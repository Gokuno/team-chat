import { usePathname } from "next/navigation"
import { Bell, Home, MessageSquare, MoreHorizontal } from "lucide-react"

import { UserButton } from "@/features/auth/components/user-button"

import { SidebarButton } from "./sidebar-button"
import { WorkspaceSwitcher } from "./workspace-switcher"

export const Sidebar = () => {
    const pathname = usePathname();

    return (
        <aside className="w-[70px] h-full bg-slate-800 flex flex-col gap-y-4 items-center pt-9 pb-4">
            <WorkspaceSwitcher />
            <SidebarButton icon={Home} label="Inicio" isActive={pathname.includes("/workspace")} />
            <SidebarButton icon={MessageSquare} label="DMs" isActive />
            <SidebarButton icon={Bell} label="Actividad" isActive />
            <SidebarButton icon={MoreHorizontal} label="Mas" isActive />
            <div className="flex flex-col items-center justify-center gap-y-1 mt-auto mr-2">
                <UserButton />
            </div>
        </aside>
    )
}