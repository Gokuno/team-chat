import { IconType } from "react-icons/lib";
import { LucideIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";


interface SidebarButtonProps {
    icon: LucideIcon | IconType;
    label: string;
    isActive?: boolean;
};

export const SidebarButton = ({
    icon: Icon,
    label,
    isActive,
}: SidebarButtonProps) => {
    return (
        <div className="flex flex-col items-center justify-center gap-y-0.5 cursor-pointer group">
            <Button
                variant="transparent"
                className={cn(
                    "size-9 p-2 group-hover:bg-white/10",
                    isActive && "bg-white/10"
                )}
            >
                <Icon className="size-5 text-white group-hover:scale-110 transition-all" />
            </Button>
            <span className="text-[11px] text-white group-hover:text-accent">
                {label}
            </span>
        </div>
    )
};