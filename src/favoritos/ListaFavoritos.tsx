import { useFavoritos } from './FavoritosContext'

export function ListaFavoritos() {
  const { state, dispatch } = useFavoritos()
  const { favoritos } = state

  return (
    <aside className="lista-favoritos">
      <h2>Favoritos</h2>

      {favoritos.length === 0 ? (
        <p>Nenhum favorito ainda.</p>
      ) : (
        <>
          <ul>
            {favoritos.map((p) => (
              <li key={p.id}>
                <img src={p.image} alt={p.name} />
                <span className="nome">{p.name}</span>
                <button
                  className="botao-remover-item"
                  onClick={() => dispatch({ type: 'REMOVER', payload: p.id })}
                  title="Remover"
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
          <button
            className="botao-limpar"
            onClick={() => dispatch({ type: 'LIMPAR' })}
          >
            Limpar tudo
          </button>
        </>
      )}
    </aside>
  )
}
