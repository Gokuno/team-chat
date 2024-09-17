
import { Loader, Plus } from "lucide-react";
import { useRouter } from "next/navigation";

import { useGetWorkspace } from "@/features/workspaces/api/use-get-workspace";
import { useGetWorkspaces } from "@/features/workspaces/api/use-get-workspaces";
import { useCreateWorkspaceModal } from "@/features/workspaces/store/use-create-workspace-modal";

import { Button } from "@/components/ui/button"
import { useWorkspaceId } from "@/hooks/use-workspace-id"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


export const WorkspaceSwitcher = () => {
    const router = useRouter();
    const workspaceId = useWorkspaceId();
    const [_open, setOpen] = useCreateWorkspaceModal();

    const { data: workspaces, isLoading: workspacesLoading } = useGetWorkspaces();
    const { data: workspace, isLoading: workspaceLoading } = useGetWorkspace({ id: workspaceId });

    const filteredWorkspace = workspaces?.filter(
        (workspace) => workspace?._id !== workspaceId
    );

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button className="size-9 relative overflow-hidden bg-white hover:bg-white/90 text-slate-800 font-semibold text-xl">
                    {workspaceLoading ? (
                        <Loader className="size-5 animate-spin shrink-0" />
                    ) : (
                        workspace?.name.charAt(0).toUpperCase()
                    )}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="bottom" align="start" className="w-64">
                <DropdownMenuItem
                    onClick={() => router.push(`/workspace/${workspaceId}`)}
                    className="cursor-pointer flex-col justify-start items-start capitalize"
                >
                    {workspace?.name}
                    <span className="text-xs text-gray-700">
                        Proyecto activo
                    </span>
                </DropdownMenuItem>
                {filteredWorkspace?.map((workspace) => (
                    <DropdownMenuItem
                        key={workspace._id}
                        className="cursor-pointer capitalize overflow-hidden"
                        onClick={() => router.push(`/workspace/${workspace._id}`)}
                    >
                        <div className="shrink-0 size-6 relative overflow-hidden bg-blue-800 text-white font-semibold text-lg rounded-md flex items-center justify-center mr-2">
                            {workspace.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="truncate">{workspace.name}</div>
                    </DropdownMenuItem>
                ))}
                <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={() => setOpen(true)}
                >
                    <div className="size-6 relative overflow-hidden bg-white text-slate-800 font-semibold text-lg rounded-md flex items-center justify-center mr-2">
                        <Plus />
                    </div>
                    Crea un proyecto nuevo
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}