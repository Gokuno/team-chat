import Image from "next/image";
import { Delta, Op } from "quill/core";
import { PiTextAa } from "react-icons/pi";
import { MdSend } from "react-icons/md";
import { MutableRefObject, useEffect, useLayoutEffect, useRef, useState } from "react";
import { ImageIcon, Smile, Paperclip, XIcon } from "lucide-react";
import Quill, { type QuillOptions } from "quill";

import { cn } from "@/lib/utils";

import { Hint } from "./hint";
import { Button } from "./ui/button";
import { EmojiPopover } from "./emoji-popover";

import "quill/dist/quill.snow.css";

type EditorValue = {
    image: File | null;
    body: string
};

interface EditorProps {
    onSubmit: ({ image, body }: EditorValue) => void;
    onCancel?: () => void;
    placeholder?: string;
    defaultValue?: Delta | Op[];
    disabled?: boolean;
    innerRef?: MutableRefObject<Quill | null>;
    variant?: "create" | "update";
};

const Editor = ({
    onCancel,
    onSubmit,
    placeholder = "Escribe algo...",
    defaultValue = [],
    disabled = false,
    innerRef,
    variant = "create"
}: EditorProps) => {
    const [text, setText] = useState("");
    const [image, setImage] = useState<File | null>(null);
    const [isToolbarVisible, setIsToolbarVisible] = useState(true);

    const submitRef = useRef(onSubmit);
    const placeholderRef = useRef(placeholder);
    const quillRef = useRef<Quill | null>(null);
    const defaultValueRef = useRef(defaultValue);
    const containerRef = useRef<HTMLDivElement>(null);
    const disabledRef = useRef(disabled);
    const imageElementRef = useRef<HTMLInputElement>(null);

    useLayoutEffect(() => {
        submitRef.current = onSubmit;
        placeholderRef.current = placeholder;
        defaultValueRef.current = defaultValue;
        disabledRef.current = disabled;
    });

    useEffect(() => {
        if (!containerRef.current) return;

        const container = containerRef.current;
        const editorContainer = container.appendChild(
            container.ownerDocument.createElement("div"),
        );

        const options: QuillOptions = {
            theme: "snow",
            placeholder: placeholderRef.current,
            modules: {
                toolbar: [
                    ["bold", "italic", "strike", "underline"],
                    ["link"],
                    [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
                ],
                keyboard: {
                    bindings: {
                        enter: {
                            key: "Enter",
                            handler: () => {
                                // TODO Submit form
                                return;
                            }
                        },
                        shift_enter: {
                            key: "Enter",
                            shiftKey: true,
                            handler: () => {
                                quill.insertText(quill.getSelection()?.index || 0, "\n");
                            },
                        },
                    }
                },
            },
        };

        const quill = new Quill(editorContainer, options);
        quillRef.current = quill;
        quillRef.current.focus();

        if (innerRef) {
            innerRef.current = quill;
        }

        quill.setContents(defaultValueRef.current);
        setText(quill.getText());

        quill.on(Quill.events.TEXT_CHANGE, () => {
            setText(quill.getText())
        });

        return () => {
            quill.off(Quill.events.TEXT_CHANGE);
            if (container) {
                container.innerHTML = "";
            }
            if (quillRef.current) {
                quillRef.current = null;
            }
            if (innerRef) {
                innerRef.current = null;
            }
        };

    }, [innerRef]);

    const toggleToolbar = () => {
        setIsToolbarVisible((current) => !current);
        const toolbarElement = containerRef.current?.querySelector(".ql-toolbar");

        if (toolbarElement) {
            toolbarElement.classList.toggle("hidden");
        }
    };

    const onEmojiSelect = (emoji: any) => {
        const quill = quillRef.current;

        quill?.insertText(quill?.getSelection()?.index || 0, emoji.native);
    }

    const isEmpty = text.replace(/<(.|\n)*?>/g, "").trim().length === 0;

    // console.log({ isEmpty, text });

    return (
        <div className="flex flex-col">
            <input
                type="file"
                accept="image/*"
                ref={imageElementRef}
                onChange={(event) => setImage(event.target.files![0])}
                className="hidden"
            />
            <div className="flex flex-col border mb-1 border-slate-200 rounded-md overflow-hidden focus-within:border-slate-300 focus-within:shadow-sm transition bg-white">
                <div ref={containerRef} className="h-full ql-custom" />
                {!!image && (
                    <div className="p-2">
                        <div className="relative size-[64px] flex items-center justify-center group/image">
                            <Hint label="Eliminar imagen">
                                <button
                                    onClick={() => {
                                        setImage(null);
                                        imageElementRef.current!.value = "";
                                    }}
                                    className="hidden group-hover/image:flex rounded-full bg-black/70 hover:bg-black absolute -top-2.5 -right-2.5 text-white size-6 z-[4] border-2 border-white items-center justify-center"
                                >
                                    <XIcon className="size-3.5" />
                                </button>
                            </Hint>
                            <Image
                                src={URL.createObjectURL(image)}
                                alt="Cargado"
                                fill
                                className="rounded-xl overflow-hidden border object-cover"
                            />
                        </div>
                    </div>
                )}
                <div className="flex px-2 pb-2 z-[5]">
                    <Hint label={isToolbarVisible ? "Esconder opciones de formato" : "Mostrar opciones de formato"}>
                        <Button
                            disabled={disabled}
                            size="sm"
                            variant="ghost"
                            onClick={toggleToolbar}
                        >
                            <PiTextAa className="size-5" />
                        </Button>
                    </Hint>
                    <EmojiPopover onEmojiSelect={onEmojiSelect}>
                        <Button
                            disabled={disabled}
                            size="sm"
                            variant="ghost"
                        >
                            <Smile className="size-5" />
                        </Button>
                    </EmojiPopover>
                    <Hint label="Adjuntar archivo">
                        <Button
                            disabled={false}
                            size="sm"
                            variant="ghost"
                            onClick={() => { }}
                        >
                            <Paperclip className="size-5" />
                        </Button>
                    </Hint>
                    {variant === "create" && (
                        <Hint label="Imagen">
                            <Button
                                disabled={disabled}
                                size="sm"
                                variant="ghost"
                                onClick={() => imageElementRef.current?.click()}
                            >
                                <ImageIcon className="size-5" />
                            </Button>
                        </Hint>
                    )}
                    {variant === "update" && (
                        <div className="ml-auto flex items-center gap-x-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => { }}
                                disabled={disabled}
                            >
                                Cancelar
                            </Button>
                            <Button
                                disabled={disabled || isEmpty}
                                variant="slack"
                                size="sm"
                                onClick={() => { }}
                            >
                                Guardar
                            </Button>
                        </div>
                    )}
                    {variant === "create" && (
                        <Button
                            disabled={disabled || isEmpty}
                            onClick={() => { }}
                            size="iconSm"
                            className={cn(
                                "ml-auto",
                                isEmpty
                                    ? "bg-white hover:bg-white text-gray-400"
                                    : "bg-black hover:bg-black/80 text-white"
                            )}
                        >
                            <MdSend className="size-4" />
                        </Button>
                    )}
                </div>
            </div>
            {variant === "create" && (
                <div className={cn(
                    "p-2 text-[12px] text-gray-500 flex justify-end opacity-0 transition",
                    !isEmpty && "opacity-100"
                )}>
                    <p>
                        <strong>Shift + Enter</strong> para agregar una linea nueva
                    </p>
                </div>
            )}
        </div>
    );
};

export default Editor;