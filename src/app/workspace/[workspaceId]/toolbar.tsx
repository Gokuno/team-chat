import { Info, Search } from "lucide-react";

import { useGetWorkspace } from "@/features/workspaces/api/use-get-workspace";

import { Button } from "@/components/ui/button";
import { useWorkspaceId } from "@/hooks/use-workspace-id";

export const Toolbar = () => {
    const workspaceId = useWorkspaceId();
    const { data } = useGetWorkspace({ id: workspaceId });

    return (
        <nav className="bg-[#242522] flex items-center justify-between h-10 p-1.5">
            <div className="flex-1" />
            <div className="min-w-[280px] max-[642px] grow-[2] shrink">
                <Button variant="slack" size="sm" className="bg-slate-400/25 hover:bg-slate-600 w-full justify-start h-7 px-2 mt-1 mb-1">
                    <Search className="size-4 text-white mr-2" />
                    <span className="text-white text-xs">
                        Buscar {data?.name}
                    </span>
                </Button>
            </div>
            <div className="ml-auto flex-1 flex items-center justify-end">
                <Button variant="transparent">
                    <Info className="size=5 text-white" />
                </Button>
            </div>
        </nav>
    )
}