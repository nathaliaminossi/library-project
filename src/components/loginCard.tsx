import { Eye, EyeOff, User } from "lucide-react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


export function LoginCard() {
  const [openEyes, setEyes] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const nav = useNavigate()
  const {login} = useAuth()



 const onLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()


    try {
        await login({email, password})
        toast.success("Login feito com sucesso")
        nav("/library", {replace: true})
    }
    catch(e: unknown) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        toast.error((e as any).response?.data?.message)
    }
    

    
 }

  return (
    <Card className="w-full  max-w-[60%] border border-border bg-background shadow-sm">
      <CardHeader className="space-y-1">
        <CardTitle className="text-4xl text-indigo-800/60 font-semibold tracking-tight">
          Entrar na plataforma
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          Acesse sua conta para continuar
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={onLogin} className="space-y-6">
          {/* Email */}
          <div className="space-y-2">
            <Label className="text-foreground/70" htmlFor="email">
              <User size={17} /> E-mail
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="seu@email.com"
              className="
                text-foreground/70
                border-border
                bg-transparent
                focus-visible:ring-0
              "
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Senha */}
          <div className="space-y-2">
            <Label className="text-foreground/70 " htmlFor="password">
              <div onClick={() => setEyes(prev => !prev)} className="flex cursor-pointer items-center gap-2">
                {!openEyes ?  <EyeOff size={17} /> : <Eye size={17}/> }
                Senha
               
              </div>
            </Label>
            <Input
              placeholder="Ift749@"
              id="password"
              type={!openEyes ? "password" : "text"}
              className="
                text-foreground/70
                border-border
                bg-transparent
                focus-visible:ring-0
              "
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

              <Button
              variant={"default"}
          type="submit"
          className="w-full "
        >
          Entrar
        </Button>
        </form>
      </CardContent>

      <CardFooter className="flex flex-col gap-4">
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <span>Não possui conta?</span>
          <Button variant="link" className="px-0 text-indigo-800/70">
            Cadastre-se
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
