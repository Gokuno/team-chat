import { PiTextAa } from "react-icons/pi";
import { MdSend } from "react-icons/md";
import { useEffect, useRef } from "react";
import { ImageIcon, Smile } from "lucide-react";
import Quill, { type QuillOptions } from "quill";

import { Button } from "./ui/button";

import "quill/dist/quill.snow.css";

const Editor = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const container = containerRef.current;
        const editorContainer = container.appendChild(
            container.ownerDocument.createElement("div"),
        );

        const options: QuillOptions = {
            theme: "snow",
        };

        new Quill(editorContainer, options);

        return () => {
            if (container) {
                container.innerHTML = "";
            }
        };

    }, []);

    return (
        <div className="flex flex-col">
            <div className="flex flex-col border mb-1 border-slate-200 rounded-md overflow-hidden focus-within:border-slate-300 focus-within:shadow-sm transition bg-white">
                <div ref={containerRef} className="h-full ql-custom" />
                <div className="flex px-2 pb-2 z-[5]">
                    <Button
                        disabled={false}
                        size="sm"
                        variant="ghost"
                        onClick={() => { }}
                    >
                        <PiTextAa className="size-5" />
                    </Button>
                    <Button
                        disabled={false}
                        size="sm"
                        variant="ghost"
                        onClick={() => { }}
                    >
                        <Smile className="size-5" />
                    </Button>
                    <Button
                        disabled={false}
                        size="sm"
                        variant="ghost"
                        onClick={() => { }}
                    >
                        <ImageIcon className="size-5" />
                    </Button>
                    <Button
                        disabled={false}
                        onClick={() => { }}
                        size="iconSm"
                        className="ml-auto bg-blue-800 hover:bg-blue-800/80 text-white"
                    >
                        <MdSend className="size-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Editor;