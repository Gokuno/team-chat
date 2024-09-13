"use client"

import { useEffect, useMemo } from "react";

import { UserButton } from "@/features/auth/components/user-button";

import { useGetWorkspaces } from "@/features/workspaces/api/use-get-workspaces";
import { useCreateWorkspaceModal } from "@/features/store/use-create-workspace-modal";

export default function Home() {
  const [open, setOpen] = useCreateWorkspaceModal();

  const { data, isLoading } = useGetWorkspaces();

  const workspacesId = useMemo(() => data?.[0]?._id, [data]);

  useEffect(() => {
    if (isLoading) return;

    if (workspacesId) {
      console.log("Redirecciona a espacio de trabajo")
    } else {
      console.log("Abre modulo de creacion")
    }
  }, [workspacesId, isLoading]);

  return (
    <div>
      <UserButton />
    </div>
  )
}
