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

export function RegisterCard() {
  return (
    <Card className="w-full max-w-sm border-0 shadow-none">
      <CardHeader>
        <CardTitle>Cadastre-se já!</CardTitle>
        <CardDescription>

        </CardDescription>

      </CardHeader>
      <CardContent>
        <form>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="name">Nome</Label>
              <Input className="    border-0 
    border-b 
    border-gray-300 
    rounded-none 
    focus:border-blue-900 
    focus:ring-0
"
                id="name"
                type="name"
                placeholder=""
                required
              />
            </div>
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
                <a
                  href="#"
                  className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                >
                  Esqueceu sua senha?
                </a>
              </div>
              <Input className="    border-0 
    border-b 
    border-gray-300 
    rounded-none 
    focus:border-blue-900 
    focus:ring-0"
                id="password" type="password" required />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Confirme sua senha</Label>

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
        <Button type="submit" className="w-full bg-blue-900">
          Cadastrar
        </Button>

        <CardAction className="flex items-center justify-center gap-0 ml-13">
          <Label htmlFor="login">Já possui uma conta?</Label>
          <Button variant="link">Entrar agora!</Button>
        </CardAction>

      </CardFooter>
    </Card>
  )
}
