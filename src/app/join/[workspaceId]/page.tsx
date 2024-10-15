"use client";

import Image from "next/image";
import Link from "next/link";
import { Loader } from "lucide-react";
import VerificationInput from "react-verification-input";

import { useGetWorkspaceInfo } from "@/features/workspaces/api/use-get-workspace-info";

import { Button } from "@/components/ui/button";
import { useWorkspaceId } from "@/hooks/use-workspace-id";


const JoinPage = () => {
    const workspaceId = useWorkspaceId();

    const { data, isLoading } = useGetWorkspaceInfo({ id: workspaceId });

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
                    length={6}
                    classNames={{
                        container: "flex gap-x-2",
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