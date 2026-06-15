import { useFavoritos } from '../favoritos/FavoritosContext'
import type { Personagem } from '../shared/types'

interface Props {
  personagem: Personagem
  selecionado: boolean
  onToggle: (personagem: Personagem) => void
}

export function CardPersonagem({ personagem, selecionado, onToggle }: Props) {
  const { state, dispatch } = useFavoritos()
  const ehFavorito = state.favoritos.some((p) => p.id === personagem.id)

  function handleFavoritar(e: React.MouseEvent) {
    e.stopPropagation()
    if (ehFavorito) {
      dispatch({ type: 'REMOVER', payload: personagem.id })
    } else {
      dispatch({ type: 'ADICIONAR', payload: personagem })
    }
  }

  return (
    <article
      className={`card-personagem${selecionado ? ' selecionado' : ''}`}
      onClick={() => onToggle(personagem)}
    >
      <img src={personagem.image} alt={personagem.name} />
      <div className="info">
        <h3>{personagem.name}</h3>
        <p>
          {personagem.status.charAt(0).toUpperCase() + personagem.status.slice(1)} — {personagem.species}
        </p>
        <button
          className={`botao-favoritar${ehFavorito ? ' remover' : ''}`}
          onClick={handleFavoritar}
        >
          {ehFavorito ? 'Remover favorito' : 'Favoritar'}
        </button>
      </div>
      {selecionado && <span className="check">✓</span>}
    </article>
  )
}
