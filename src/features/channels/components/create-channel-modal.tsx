import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useWorkspaceId } from "@/hooks/use-workspace-id";

import { useCreateChannel } from "../api/use-create-channel";
import { useCreateChannelModal } from "../store/use-create-channel-modal";

export const CreateChannelModal = () => {
    const router = useRouter();
    const workspaceId = useWorkspaceId();

    const { mutate, isPending } = useCreateChannel();
    const [open, setOpen] = useCreateChannelModal();


    const [name, setName] = useState("");

    const handleClose = () => {
        setName("");
        setOpen(false);
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\s+/g, "-").toLowerCase();
        setName(value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        mutate(
            { name, workspaceId },
            {
                onSuccess: (id) => {
                    toast.success("Canal creado");
                    router.push(`/workspace/${workspaceId}/channel/${id}`);
                    handleClose();
                },
                onError: () => {
                    toast.error("Creacion de canal fallida");
                }
            },
        );
    };

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Agrega un canal</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                        value={name}
                        disabled={isPending}
                        onChange={handleChange}
                        required
                        autoFocus
                        minLength={3}
                        maxLength={80}
                        placeholder="e.g. planeacion-presupuesto"
                    />
                    <div className="flex justify-end">
                        <Button disabled={false} className="bg-black text-white">
                            Crear
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};