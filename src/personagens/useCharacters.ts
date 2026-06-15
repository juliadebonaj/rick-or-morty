import { useState, useEffect } from 'react'
import type { Personagem } from '../shared/types'

interface ApiResposta {
  info: {
    pages: number
  }
  results: Personagem[]
}

interface Filtros {
  busca: string
  status: string
  species: string
  pagina: number
}

interface UseCharactersResult {
  personagens: Personagem[]
  carregando: boolean
  erro: string | null
  totalPaginas: number
}

export function useCharacters({ busca, status, species, pagina }: Filtros): UseCharactersResult {
  const [personagens, setPersonagens] = useState<Personagem[]>([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState<string | null>(null)
  const [totalPaginas, setTotalPaginas] = useState(1)

  useEffect(() => {
    setCarregando(true)
    setErro(null)

    const timer = setTimeout(() => {
      const params = new URLSearchParams()
      if (busca.trim()) params.set('name', busca.trim())
      if (status) params.set('status', status)
      if (species) params.set('species', species)
      params.set('page', String(pagina))

      fetch(`https://rickandmortyapi.com/api/character?${params}`)
        .then((res) => {
          if (res.status === 404) {
            setPersonagens([])
            setTotalPaginas(1)
            setErro('Nenhum personagem encontrado.')
            return null
          }
          if (!res.ok) throw new Error(`Erro ${res.status}`)
          return res.json() as Promise<ApiResposta>
        })
        .then((data) => {
          if (data) {
            const termo = busca.trim().toLowerCase()
            const filtrados = termo
              ? data.results.filter((p) =>
                  p.name.split(' ').some((palavra) =>
                    palavra.toLowerCase().startsWith(termo)
                  )
                )
              : data.results
            setPersonagens(filtrados)
            setTotalPaginas(data.info.pages)
          }
        })
        .catch((err: Error) => {
          setErro(err.message)
          setPersonagens([])
          setTotalPaginas(1)
        })
        .finally(() => setCarregando(false))
    }, 400)

    return () => clearTimeout(timer)
  }, [busca, status, species, pagina])

  return { personagens, carregando, erro, totalPaginas }
}
