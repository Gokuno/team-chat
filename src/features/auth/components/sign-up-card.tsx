import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { TriangleAlert } from "lucide-react";

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
import { useAuthActions } from "@convex-dev/auth/react";

interface SignUpCardProps {
    setState: (setState: SignInFlow) => void;
};

export const SignUpCard = ({ setState }: SignUpCardProps) => {
    const { signIn } = useAuthActions();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [pending, setPending] = useState(false);

    const onPasswordSignUp = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError("Las contraseñas no coinciden");
            return
        }

        setPending(true)
        signIn("password", { name, email, password, flow: "signUp" })
            .catch(() => {
                setError("Hubo un error")
            })
            .finally(() => {
                setPending(false);
            })
    };

    const onProviderSignUp = (value: "google") => {
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
                    Registrate para continuar
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
                <form onSubmit={onPasswordSignUp} className="space-y-2.5">
                    <Input
                        disabled={pending}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Nombre Completo"
                        required
                    />
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
                        //type="password"
                        required
                    />
                    <Input
                        disabled={pending}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirma contraseña"
                        //type="password"
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
                        onClick={() => onProviderSignUp("google")}
                        size="lg"
                        disabled={pending}
                        className="w-full relative"
                    >
                        <FcGoogle className="size-5 absolute top-3 left-2.5" />
                        Inicia con Google
                    </Button>
                </div>
                <div className="text-xs text-muted-foreground">
                    ¿Ya tienes una cuenta? <span onClick={() => setState("signIn")} className="text-blue-900 hover:underline cursor-pointer">Inicia sesion</span>
                </div>
            </CardContent>
        </Card>
    );
};