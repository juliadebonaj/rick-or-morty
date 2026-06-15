import { useFavoritos } from '../favoritos/FavoritosContext'

export function Header() {
  const { state } = useFavoritos()

  return (
    <header>
      <h1>Rick and Morty</h1>
      <span className="contador">
        Favoritos: {state.favoritos.length}
      </span>
    </header>
  )
}
