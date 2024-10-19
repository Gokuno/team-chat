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
import { TriangleAlert } from "lucide-react";

interface SignInCardProps {
    setState: (setState: SignInFlow) => void;
};

export const SignInCard = ({ setState }: SignInCardProps) => {
    const { signIn } = useAuthActions();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [pending, setPending] = useState(false);

    const onPasswordSignIn = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setPending(true);
        signIn("password", { email, password, flow: "signIn" })
            .catch(() => {
                setError("Correo o contraseña invalida");
            })
            .finally(() => {
                setPending(false);
            });
    };

    const onProviderSignIn = (value: "google") => {
        setPending(true);
        signIn(value)
            .finally(() => {
                setPending(false);
            })
    };

    return (
        <Card className="w-full h-full p-8">
            <CardHeader className="px-0 pt-0" >
                <CardTitle>
                    Iniciar sesion para continuar
                </CardTitle>
                <CardDescription>
                    Use su correo electronico u otro servicio para continuar
                </CardDescription>
            </CardHeader>
            {!!error && (
                <div className="bg-rose-100 p-3 rounded-md flex items-center gap-x-2 text-sm text-rose-700 mb-6">
                    <TriangleAlert className="size-4" />
                    <p>{error}</p>
                </div>
            )}
            <CardContent className="space-y-5 px-0 pb-0">
                <form onSubmit={onPasswordSignIn} className="space-y-2.5">
                    <Input
                        disabled={pending}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Correo electronico"
                        type="email"
                        required
                    />
                    <Input
                        disabled={pending}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Contraseña"
                        type="password"
                        required
                    />
                    <Button variant="slack" type="submit" className="w-full" size="lg" disabled={pending}>
                        Continuar
                    </Button>
                </form>
                <Separator />
                <div className="flex flex-col gap-y-2.5">
                    <Button
                        variant="outline"
                        onClick={() => onProviderSignIn("google")}
                        size="lg"
                        disabled={pending}
                        className="w-full relative"
                    >
                        <FcGoogle className="size-5 absolute top-3 left-2.5" />
                        Inicia con Google
                    </Button>
                </div>
                <div className="text-xs text-muted-foreground">
                    ¿Aun no tienes una cuenta? <span onClick={() => setState("signUp")} className="text-blue-900 hover:underline cursor-pointer">Registrate</span>
                </div>
            </CardContent>
        </Card>
    );
};