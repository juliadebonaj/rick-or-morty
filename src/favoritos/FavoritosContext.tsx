import { createContext, useContext, useReducer } from 'react'
import type { Estado, Action, Personagem } from '../shared/types'

interface FavoritosContextType {
  state: Estado
  dispatch: React.Dispatch<Action>
}

const estadoInicial: Estado = {
  favoritos: [],
}

function favoritosReducer(state: Estado, action: Action): Estado {
  switch (action.type) {
    case 'ADICIONAR': {
      const jaExiste = state.favoritos.find((p) => p.id === action.payload.id)
      if (jaExiste) return state
      return { favoritos: [...state.favoritos, action.payload] }
    }
    case 'REMOVER':
      return {
        favoritos: state.favoritos.filter((p) => p.id !== action.payload),
      }
    case 'LIMPAR':
      return estadoInicial
    default:
      return state
  }
}

const FavoritosContext = createContext<FavoritosContextType | null>(null)

export function FavoritosProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(favoritosReducer, estadoInicial)

  return (
    <FavoritosContext.Provider value={{ state, dispatch }}>
      {children}
    </FavoritosContext.Provider>
  )
}

export function useFavoritos(): FavoritosContextType {
  const context = useContext(FavoritosContext)
  if (!context) {
    throw new Error('useFavoritos deve ser usado dentro de um FavoritosProvider')
  }
  return context
}

export type { Personagem }
