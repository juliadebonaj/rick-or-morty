interface Props {
  quantidade: number
  todosSaoFavoritos: boolean
  algumEhFavorito: boolean
  onFavoritar: () => void
  onRemover: () => void
  onCancelar: () => void
}

export function BarraSeleção({ quantidade, todosSaoFavoritos, algumEhFavorito, onFavoritar, onRemover, onCancelar }: Props) {
  return (
    <section className="barra-selecao">
      <p>{quantidade} selecionado{quantidade > 1 ? 's' : ''}</p>
      <div className="acoes">
        {!todosSaoFavoritos && (
          <button className="botao-favoritar-todos" onClick={onFavoritar}>
            Favoritar todos
          </button>
        )}
        {algumEhFavorito && (
          <button className="botao-remover-selecao" onClick={onRemover}>
            Remover dos favoritos
          </button>
        )}
        <button className="botao-cancelar" onClick={onCancelar}>
          Cancelar
        </button>
      </div>
    </section>
  )
}
