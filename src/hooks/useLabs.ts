import { useEffect, useState } from "react"
import type { Label } from "../types/label"
import { labelService } from "../api/services/label-services";

export const useLabels = () => {
  const [labels, setLabels] = useState<Label[]>([])
  const [loading, setLoading] = useState(false)

  const getLabels = async () => {
    try {
      setLoading(true)
      const { data } = await labelService.findAll()
      setLabels(data)
    } catch (error) {
      console.error("Erro ao buscar labels:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getLabels()
  }, [])

  return {
    loading,
    getLabels,
    labels
  }
}
