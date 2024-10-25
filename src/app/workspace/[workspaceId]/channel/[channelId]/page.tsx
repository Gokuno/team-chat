"use client";

import { Loader, TriangleAlert } from "lucide-react";

import { useChannelId } from "@/hooks/use-channel-id";

import { useGetChannel } from "@/features/channels/api/use-get-channel";
import { Header } from "./header";
import { ChatInput } from "./chat-input";


const ChannelIdPage = () => {
    const channelId = useChannelId();

    const { data: channel, isLoading: channelLoading } = useGetChannel({ id: channelId });

    if (channelLoading) {
        return (
            <div className="h-full flex-1 flex items-center justify-center">
                <Loader className="animate-spin size-6 text-gray-500" />
            </div>
        );
    }

    if (!channel) {
        return (
            <div className="h-full flex-1 flex flex-col gap-y-2 items-center justify-center">
                <TriangleAlert className="size-10 text-gray-500" />
                <span className="text-md text-gray-500">
                    Canal no encontrado
                </span>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full">
            <Header title={channel.name} />
            <div className="flex-1" />
            <ChatInput />
        </div>
    );
};

export default ChannelIdPage