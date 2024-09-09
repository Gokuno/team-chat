import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useAuthActions } from "@convex-dev/auth/react";

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

interface SignInCardProps {
    setState: (setState: SignInFlow) => void;
};

export const SignInCard = ({ setState }: SignInCardProps) => {
    const { signIn } = useAuthActions();


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleProviderSignIn = (value: "google") => {
        signIn(value);
    }

    return (
        <Card className="w-full h-full p-8">
            <CardHeader className="px-0 pt-0" >
                <CardTitle>
                    Inciar sesion para continuar
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
                    ¿No tiene una cuenta aun? <span onClick={() => setState("signUp")} className="text-blue-900 hover:underline cursor-pointer">Registrate</span>
                </div>
            </CardContent>
        </Card>
    );
};