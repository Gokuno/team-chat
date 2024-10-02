import { AlertTriangle, HashIcon, Loader, MessageSquareText, SendHorizonal } from "lucide-react";

import { useGetChannels } from "@/features/channels/api/use-get-channels";
import { useCurrentMember } from "@/features/members/api/use-current-member";
import { useGetWorkspace } from "@/features/workspaces/api/use-get-workspace";

import { useWorkspaceId } from "@/hooks/use-workspace-id"

import WorkspaceHeader from "./workspace-header";
import { WorkspaceSection } from "./workspace-section";
import { SidebarItem } from "./sidebar-item";

export const WorkspaceSidebar = () => {
    const workspaceId = useWorkspaceId();

    const { data: member, isLoading: memberLoading } = useCurrentMember({ workspaceId });
    const { data: workspace, isLoading: workspaceLoading } = useGetWorkspace({ id: workspaceId });
    const { data: channels, isLoading: channelsLoading } = useGetChannels({ workspaceId });

    if (workspaceLoading || memberLoading) {
        return (
            <div className="flex flex-col bg-slate-700 h-full items-center justify-center">
                <Loader className="size-5 animate-spin text-white" />
            </div>
        )
    }

    if (!workspace || !member) {
        return (
            <div className="flex flex-col gap-y-2 bg-slate-700 h-full items-center justify-center">
                <AlertTriangle className="size-5 text-white" />
                <p className="text-white text-sm">
                    Proyecto no encontrado
                </p>
            </div>
        )
    }

    return (
        <div className="flex flex-col bg-slate-700 h-full">
            <WorkspaceHeader workspace={workspace} isAdmin={member.role === "admin"} />
            <div className="flex flex-col px-2 mt-3">
                <SidebarItem
                    label="Mensajes"
                    icon={MessageSquareText}
                    id="threads"
                />
                <SidebarItem
                    label="Borradores y Enviados"
                    icon={SendHorizonal}
                    id="drafts"
                />
            </div>
            <WorkspaceSection
                label="Canales"
                hint="Nuevo canal"
                onNew={() => { }}
            >
                {channels?.map((item) => (
                    <SidebarItem
                        key={item._id}
                        icon={HashIcon}
                        label={item.name}
                        id={item._id}
                    />
                ))}
            </WorkspaceSection>
        </div>
    )
}