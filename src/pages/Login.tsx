import { LoginCard } from "../components/loginCard"

export default function Login() {
    return (

        <div className="flex min-h-screen justify-center">



            {/* Lado esquerdo */}
            <div className="hidden md:flex w-full flex-1 bg-linear-to-b  from-indigo-950  to-indigo-400 text-white p-12 items-center">


                <div>
                    <h3 className="text-3xl font-bold">My<span className="text-indigo-300">Library</span></h3>
                    <h1 className="md:text-7xl  font-bold mb-4">
                        Bem-vindo á sua biblioteca vitual!
                    </h1>
                    <p className="text-lg p-4  opacity-90 max-w-md">
                        “A leitura de todos os bons livros é como uma conversa com as melhores mentes dos séculos passados.”
                        — René Descartes
                    </p>
                </div>
            </div>


            {/* Lado direito */}
            <div className="flex w-full flex-1 items-center justify-center">
                <LoginCard />
            </div>

        </div>
    )
}