"use client";

import { Loader, LogOut } from "lucide-react";
import { useAuthActions } from "@convex-dev/auth/react";

import {
    Avatar,
    AvatarFallback,
    AvatarImage
} from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useCurrentUser } from "../api/use-current-user";
import { useRouter } from "next/navigation";

export const UserButton = () => {
    const { signOut } = useAuthActions();
    const { data, isLoading } = useCurrentUser();

    const router = useRouter();

    if (isLoading) {
        return <Loader className="size-4 animate-spin text-muted-foreground ml-6 mt-6" />
    }

    if (!data) {
        return null;
    }

    const { image, name } = data;

    const avatarFallback = name!.charAt(0).toUpperCase()

    return (
        <DropdownMenu modal={false}>
            <DropdownMenuTrigger className="outline-none relative">
                <Avatar className="rounded-md size-12 hover:opacity-90 transition ml-2 mt-2">
                    <AvatarImage className="rounded-md" alt={name} src={image} />
                    <AvatarFallback className="bg-blue-800 text-white rounded-md text-2xl font-semibold">
                        {avatarFallback}
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center" side="right" className="w-60">
                <DropdownMenuItem onClick={() => signOut().then(() => { router.push("/auth") })} className="h-10">
                    <LogOut className="size-4 mr-2" />
                    Cerrar sesion
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};