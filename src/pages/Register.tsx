import { RegisterCard } from "../components/registerCard"

export default function Register() {
    return (
        <div className="flex min-h-screen">



            {/* Lado esquerdo */}
            <div className="hidden md:flex w-2/5 bg-gradient-to-b  from-indigo-950  to-[#f3ebde] bg-[#cbc5e7] text-white p-12 items-center">
                <div>
                    <h1 className="text-4xl font-bold mb-4">
                        Bem-vindo á sua biblioteca vitual!
                    </h1>
                    <p className="text-lg opacity-90 max-w-md">
                        “A leitura de todos os bons livros é como uma conversa com as melhores mentes dos séculos passados.”
                        — René Descartes
                    </p>
                </div>
            </div>


            {/* Lado direito */}
            <div className="flex w-full md:w-[50vw] items-center justify-center">
                <RegisterCard  />
            </div>

        </div>


    )
}