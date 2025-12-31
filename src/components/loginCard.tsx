import { Button } from "./ui/button"
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "./ui/card"
import { Input } from "./ui/input"
import { Label } from "./ui/label"



export function LoginCard() {
    return (
        <Card className="w-full max-w-sm border-0 shadow-none">
            <CardHeader>
                <CardTitle>Entre já!</CardTitle>
                <CardDescription>

                </CardDescription>

            </CardHeader>
            <CardContent>
                <form>
                    <div className="flex flex-col gap-6">

                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input className="    border-0 
    border-b 
    border-gray-300 
    rounded-none 
    focus:border-blue-900 
    focus:ring-0"
                                id="email"
                                type="email"
                                placeholder="a@exemplo.com"
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <div className="flex items-center">
                                <Label htmlFor="password">Senha</Label>

                            </div>
                            <Input className="    border-0 
    border-b 
    border-gray-300 
    rounded-none 
    focus:border-blue-900 
    focus:ring-0"
                                id="password" type="password" required />
                        </div>

                    </div>

                </form>
            </CardContent>
            <CardFooter className="flex-col gap-2">
                <Button type="submit" className="w-full bg-indigo-950/80 ">
                    Cadastrar
                </Button>

                <CardAction className="flex items-center justify-center gap-0 ml-13">
                    <Label htmlFor="login">Não possui conta?</Label>
                    <Button variant="link" >Cadastre-se já!</Button>
                </CardAction>

            </CardFooter>
        </Card>
    )
}
