import Link from "next/link";
import { LucideIcon } from "lucide-react";
import { IconType } from "react-icons/lib";
import { cva, type VariantProps } from "class-variance-authority";

import { Button } from "@/components/ui/button";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { cn } from "@/lib/utils";

const sidebarItemVariants = cva(
    "my-sidebar-item flex items-center gap-1.5 justify-start font-normal h-7 px-[18px] text-sm overflow-hidden",
    {
        variants: {
            variant: {
                default: "text-[#f9edffff]",
                active: "text-[#334155] bg-white/90 hover:bg-white/90",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    },
);

interface SidebarItemProps {
    label: string;
    id: string;
    icon: LucideIcon | IconType;
    variant?: VariantProps<typeof sidebarItemVariants>["variant"];
};

export const SidebarItem = ({
    label,
    id,
    icon: Icon,
    variant,
}: SidebarItemProps) => {
    const workspaceId = useWorkspaceId();

    return (
        <Button
            variant="transparent"
            size="sm"
            asChild
        >
            <Link
                href={`/workspace/${workspaceId}/channel/${id}`}
                className={cn(sidebarItemVariants({ variant }))}
            >
                <Icon className="size-3.5 mr-1 shrink-0" />
                <span className="text-sm truncate">{label}</span>
            </Link>
        </Button>
    )
};