import { useState } from "react";
import { ChevronDown, ListFilter, SquarePen } from "lucide-react";

import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { PreferencesModal } from "./preferences-modal";
import { Doc } from "../../../../convex/_generated/dataModel";

interface WorkspaceIdLayoutProps {
    workspace: Doc<"workspaces">
    isAdmin: boolean;
}

export const WorkspaceHeader = ({ workspace, isAdmin }: WorkspaceIdLayoutProps) => {
    const [preferencesopen, setPreferencesOpen] = useState(false);

    return (
        <>
            <PreferencesModal open={preferencesopen} setOpen={setPreferencesOpen} initialValue={workspace.name} />
            <div className="flex items-center justify-between px-4 h-[49px] gap-0.5">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="transparent"
                            className="font-semibold text-lg text-white w-auto p-1.5 overflow-hidden"
                        >
                            <span className="truncate">{workspace.name}</span>
                            <ChevronDown className="size-4 ml-1 shrink-0" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent side="bottom" align="start" className="w-64">
                        <DropdownMenuItem
                            className="cursor-pointer capitalize"
                        >
                            <div className="size-9 relative overflow-hidden bg-blue-800 text-white font-semibold text-xl rounded-md flex items-center justify-center mr-2">
                                {workspace.name.charAt(0).toUpperCase()}
                            </div>
                            <div className="flex flex-col items-start">
                                <p className="font-bold">{workspace.name}</p>
                                <p className="text-xs text-muted-foreground">Proyecto Activo</p>
                            </div>
                        </DropdownMenuItem>
                        {isAdmin && (
                            <>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                    className="cursor-pointer py-2"
                                    onClick={() => { }}
                                >
                                    Invita personas a {workspace.name}
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                    className="cursor-pointer py-2"
                                    onClick={() => setPreferencesOpen(true)}
                                >
                                    Preferencias
                                </DropdownMenuItem>
                            </>
                        )}

                    </DropdownMenuContent>
                </DropdownMenu>
                <div className="flex items-center gap-0.5">
                    <Hint label="Buscar conversacion" side="bottom">
                        <Button className="text-white hover:bg-slate-600" size="iconSm">
                            <ListFilter className="size-5" />
                        </Button>
                    </Hint>
                    <Hint label="Nuevo Mensaje" side="bottom">
                        <Button className="text-white hover:bg-slate-600" size="iconSm">
                            <SquarePen className="size-5" />
                        </Button>
                    </Hint>
                </div>
            </div>
        </>
    )
}

export default WorkspaceHeader;