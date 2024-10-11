import { toast } from "sonner";
import { CopyIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { useWorkspaceId } from "@/hooks/use-workspace-id";

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

    const handleCopy = () => {
        const inviteLink = `${window.location.origin}/join/${workspaceId}`;

        navigator.clipboard
            .writeText(inviteLink)
            .then(() => toast.success("Enlace copiado"));
    };

    return (
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
            </DialogContent>
        </Dialog>
    );
};