import { toast } from "sonner";
import { CopyIcon, RefreshCcw } from "lucide-react";

import { useNewJoinCode } from "@/features/workspaces/api/use-new-join-code";

import { Button } from "@/components/ui/button";
import { useConfirm } from "@/hooks/use-confirm";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

interface InviteModalPros {
    open: boolean;
    setOpen: (open: boolean) => void;
    name: string;
    joinCode: string;
};

export const InviteModal = ({
    open,
    setOpen,
    name,
    joinCode,
}: InviteModalPros) => {
    const workspaceId = useWorkspaceId();
    const [ConfirmDialog, confirm] = useConfirm(
        "¿Estas seguro?",
        "Esto desactivara el codigo actual y generara uno nuevo."
    );

    const { mutate, isPending } = useNewJoinCode();

    const handleNewCode = async () => {
        const ok = await confirm();

        if (!ok) return;

        mutate({ workspaceId }, {
            onSuccess: () => {
                toast.success("Codigo de invitacion regenerado");
            },
            onError: () => {
                toast.error("Fallo en regeneracion de codigo");
            }
        });
    };

    const handleCopy = () => {
        const inviteLink = `${window.location.origin}/join/${workspaceId}`;

        navigator.clipboard
            .writeText(inviteLink)
            .then(() => toast.success("Enlace copiado"));
    };

    return (
        <>
            <ConfirmDialog />
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            Invita personas a {name}
                        </DialogTitle>
                        <DialogDescription className="text-gray-500 mt-3">
                            Usa el codigo debajo para invitar a personas a tu espacio de trabajo
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex flex-col gap-y-4 items-center justify-center py-10">
                        <p className="text-4xl font-bold tracking-widest uppercase">
                            {joinCode}
                        </p>
                        <Button
                            onClick={handleCopy}
                            variant="ghost"
                            size="sm"
                        >
                            Copiar enlace
                            <CopyIcon className="size-4 ml-2" />
                        </Button>
                    </div>
                    <div className="flex items-center justify-between w-full">
                        <Button
                            disabled={isPending}
                            onClick={handleNewCode}
                            variant="outline"
                        >
                            Codigo nuevo
                            <RefreshCcw className="size-4 ml-2" />
                        </Button>
                        <DialogClose asChild>
                            <Button className="bg-black text-white">
                                Cerrar
                            </Button>
                        </DialogClose>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
};