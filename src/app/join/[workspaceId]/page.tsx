"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useEffect } from "react";
import { Loader } from "lucide-react";
import { toast } from "sonner";
import VerificationInput from "react-verification-input";

import { useJoin } from "@/features/workspaces/api/use-join";
import { useGetWorkspaceInfo } from "@/features/workspaces/api/use-get-workspace-info";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useWorkspaceId } from "@/hooks/use-workspace-id";


const JoinPage = () => {
    const router = useRouter();
    const workspaceId = useWorkspaceId();

    const { mutate, isPending } = useJoin();
    const { data, isLoading } = useGetWorkspaceInfo({ id: workspaceId });

    const isMember = useMemo(() => data?.isMember, [data?.isMember]);

    useEffect(() => {
        if (isMember) {
            router.push(`/workspace/${workspaceId}`);
        }
    }, [isMember, router, workspaceId]);

    const handleComplete = (value: string) => {
        mutate({ workspaceId, joinCode: value }, {
            onSuccess: (id) => {
                router.replace(`/workspace/${id}`);
                toast.success("Se unio a espacio de trabajo");
            },

            onError: () => {
                toast.error("Union al espacio de trabajo fallida");
            }
        })
    };

    if (isLoading) {
        return (
            <div className="h-full flex items-center justify-center">
                <Loader className="size-6 animate-spin text-gray-500" />
            </div>
        );
    }

    return (
        <div className="h-full flex flex-col gap-y-8 items-center justify-center bg-white p-8 rounded-lg shadow-md">
            <Image src="/logo-no-background.png" width={120} height={120} alt="Logo" />
            <div className="flex flex-col gap-y-4 items-center justify-center max-w-md">
                <div className="flex flex-col gap-y-2 items-center justify-center">
                    <h1 className="text-2xl font-bold">
                        Unete a {data?.name}
                    </h1>
                    <p className="text-md text-gray-500">
                        Ingresa el codigo para unirte al espacio de trabajo
                    </p>
                </div>
                <VerificationInput
                    onComplete={handleComplete}
                    length={6}
                    classNames={{
                        container: cn("flex gap-x-2", isPending && "opacity-60 cursor-not-allowed"),
                        character: "uppercase h-auto rounded-md border border-gray-300 flex items-center justify-center text-lg font-medium text-gray-500",
                        characterInactive: "bg-gray-100",
                        characterSelected: "bg-white text-black",
                        characterFilled: "bg-white text-black"
                    }}
                    autoFocus
                />
            </div>
            <div className="flex gap-x-4">
                <Button
                    size="lg"
                    variant="outline"
                    asChild
                >
                    <Link href="/">
                        Regresar a Inicio
                    </Link>
                </Button>
            </div>
        </div>
    )
}

export default JoinPage