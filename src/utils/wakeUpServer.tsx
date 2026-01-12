import { useEffect, useState } from "react"


export function WakeUpServer() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    fetch("https://library-spring-api-rtsd.onrender.com/tests/hello/api")
      .then(() => setLoading(false))
      .catch(() => {
        setError(true)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <div className="flex flex-col items-center gap-3 p-6 text-center">
        <span className="animate-spin rounded-full h-6 w-6 border-2 border-muted border-t-transparent" />
        <p className="text-sm opacity-80 max-w-md">
          Iniciando servidor (ambiente de portfólio).
          A primeira requisição pode levar até 50 segundos.
        </p>
      
        
      </div>
    )
  }

  if (error) {
    return (
      <p className="text-sm text-red-500">
        Erro ao conectar com o servidor.
      </p>
    )
  }

  return null
}
