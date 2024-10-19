import { toast } from "sonner";
import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { Trash2Icon } from "lucide-react";

import { useUpdateChannel } from "@/features/channels/api/use-update-channel";
import { useRemoveChannel } from "@/features/channels/api/use-remove-channel";
import { useCurrentMember } from "@/features/members/api/use-current-member";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useConfirm } from "@/hooks/use-confirm";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { useChannelId } from "@/hooks/use-channel-id";
import {
    Dialog,
    DialogContent,
    DialogClose,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog";

interface HeaderProps {
    title: string;
};

export const Header = ({ title }: HeaderProps) => {
    const router = useRouter();
    const channelId = useChannelId();
    const workspaceId = useWorkspaceId();
    const [ConfirmDialog, confirm] = useConfirm(
        "¿Eliminar este canal?",
        "Se eliminara este canal. Esta accion sera permanente",
    );

    const [value, setValue] = useState(title);
    const [editOpen, setEditOpen] = useState(false);

    const { data: member } = useCurrentMember({ workspaceId });
    const { mutate: updateChannel, isPending: isUpdatingChannel } = useUpdateChannel();
    const { mutate: removeChannel, isPending: isRemovingChannel } = useRemoveChannel();

    const handleEditOpen = (value: boolean) => {
        if (member?.role !== "admin") return;

        setEditOpen(value);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\s+/g, "-").toLowerCase();
        setValue(value);
    };

    const handleDelete = async () => {
        const ok = await confirm();

        if (!ok) return;

        removeChannel({ id: channelId }, {
            onSuccess: () => {
                toast.success("Canal eliminado");
                router.push(`/workspace/${workspaceId}`)
            },
            onError: () => {
                toast.error("Eliminacion de canal fallida");
            }
        });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        updateChannel({ id: channelId, name: value }, {
            onSuccess: () => {
                toast.success("Canal actualizado");
                setEditOpen(false);
            },
            onError: () => {
                toast.error("Actualizacion de canal fallida")
            }
        });
    };

    return (
        <div className="bg-white border-b h-[49px] flex items-center px-4 overflow-hidden">
            <ConfirmDialog />
            <Dialog>
                <DialogTrigger asChild>
                    <Button
                        variant="ghost"
                        className="text-lg font-semibold px-2 overflow-hidden w-auto"
                        size="sm"
                    >
                        <span className="truncate"># {title}</span>
                        <FaChevronDown className="size-2.5 ml-2" />
                    </Button>
                </DialogTrigger>
                <DialogContent className="p-0 bg-gray-50 overflow-hidden">
                    <DialogHeader className="p-4 border-b bg-white">
                        <DialogTitle>
                            # {title}
                        </DialogTitle>
                    </DialogHeader>
                    <div className="px-4 pb-4 flex flex-col gap-y-2">
                        <Dialog open={editOpen} onOpenChange={handleEditOpen} >
                            <DialogTrigger asChild>
                                <div className="px-5 py-4 bg-white rounded-lg border cursor-pointer hover:bg-gray-50">
                                    <div className="flex items-center justify-between">
                                        <p className="text-sm font-semibold">
                                            Nombre del canal
                                        </p>
                                        {member?.role === "admin" && (
                                            <p className="text-sm text-blue-800 hover:underline font-semibold">
                                                Editar
                                            </p>
                                        )}
                                    </div>
                                    <p className="text-sm">
                                        # {title}
                                    </p>
                                </div>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>
                                        Renombra este canal
                                    </DialogTitle>
                                </DialogHeader>
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <Input
                                        value={value}
                                        disabled={isUpdatingChannel}
                                        onChange={handleChange}
                                        required
                                        autoFocus
                                        minLength={3}
                                        maxLength={80}
                                        placeholder="e.g. plan-de-presupuesto"
                                    />
                                    <DialogFooter>
                                        <DialogClose asChild>
                                            <Button variant="outline" disabled={isUpdatingChannel}>
                                                Cancelar
                                            </Button>
                                        </DialogClose>
                                        <Button disabled={isUpdatingChannel} className="bg-blue-800 text-white">
                                            Guardar
                                        </Button>
                                    </DialogFooter>
                                </form>
                            </DialogContent>
                        </Dialog>
                        {member?.role === "admin" && (
                            <button
                                onClick={handleDelete}
                                disabled={isRemovingChannel}
                                className="flex items-center gap-x-2 px-5 py-4 bg-white rounded-lg cursor-pointer border hover:bg-gray-50 text-rose-600"
                            >
                                <Trash2Icon className="size-4" />
                                <p className="text-sm font-semibold">Eliminar canal</p>
                            </button>
                        )}
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}