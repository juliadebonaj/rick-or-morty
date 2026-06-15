export interface Personagem {
  id: number
  name: string
  status: string
  species: string
  image: string
}

export interface Estado {
  favoritos: Personagem[]
}

export type Action =
  | { type: 'ADICIONAR'; payload: Personagem }
  | { type: 'REMOVER'; payload: number }
  | { type: 'LIMPAR' }
