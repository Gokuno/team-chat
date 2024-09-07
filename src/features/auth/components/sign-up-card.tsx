import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { SignInFlow } from "../types";

interface SignUpCardProps {
    setState: (setState: SignInFlow) => void;
};

export const SignUpCard = ({ setState }: SignUpCardProps) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    return (
        <Card className="w-full h-full p-8">
            <CardHeader className="px-0 pt-0" >
                <CardTitle>
                    Registrate para continuar
                </CardTitle>
                <CardDescription>
                    Use su correo electronico u otro servicio para continuar
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5 px-0 pb-0">
                <form className="space-y-2.5">
                    <Input
                        disabled={false}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Correo electronico"
                        type="email"
                        required
                    />
                    <Input
                        disabled={false}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Contraseña"
                        type="password"
                        required
                    />
                    <Input
                        disabled={false}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirma contraseña"
                        type="password"
                        required
                    />
                    <Button variant="slack" type="submit" className="w-full" size="lg" disabled={false}>
                        Continuar
                    </Button>
                </form>
                <Separator />
                <div className="flex flex-col gap-y-2.5">
                    <Button
                        variant="outline"
                        onClick={() => { }}
                        size="lg"
                        disabled={false}
                        className="w-full relative"
                    >
                        <FcGoogle className="size-5 absolute top-3 left-2.5" />
                        Incia con Google
                    </Button>
                </div>
                <div className="text-xs text-muted-foreground">
                    ¿Ya tienes una cuenta? <span onClick={() => setState("signIn")} className="text-blue-900 hover:underline cursor-pointer">Inicia sesion</span>
                </div>
            </CardContent>
        </Card>
    );
};