import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export const SignInCard = () => {
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
                        value=""
                        onChange={() => { }}
                        placeholder="Email"
                        type="email"
                        required
                    />
                    <Input
                        disabled={false}
                        value=""
                        onChange={() => { }}
                        placeholder="Password"
                        type="password"
                        required
                    />
                    <Button variant="slack" type="submit" className="w-full" size="lg" disabled={false}>
                        Continuar
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
};