interface Props {
  paginaAtual: number
  totalPaginas: number
  onChange: (pagina: number) => void
}

const MAX_BOTOES = 7

export function Paginacao({ paginaAtual, totalPaginas, onChange }: Props) {
  if (totalPaginas <= 1) return null

  function gerarPaginas(): (number | '...')[] {
    if (totalPaginas <= MAX_BOTOES) {
      return Array.from({ length: totalPaginas }, (_, i) => i + 1)
    }

    const paginas: (number | '...')[] = [1]

    if (paginaAtual > 3) paginas.push('...')

    const inicio = Math.max(2, paginaAtual - 1)
    const fim = Math.min(totalPaginas - 1, paginaAtual + 1)

    for (let i = inicio; i <= fim; i++) paginas.push(i)

    if (paginaAtual < totalPaginas - 2) paginas.push('...')

    paginas.push(totalPaginas)

    return paginas
  }

  return (
    <nav className="paginacao-nav">
      <ul className="paginacao">
        <li>
          <button
            onClick={() => onChange(paginaAtual - 1)}
            disabled={paginaAtual === 1}
          >
            ‹
          </button>
        </li>

        {gerarPaginas().map((item, i) =>
          item === '...' ? (
            <li key={`ellipsis-${i}`} className="ellipsis">…</li>
          ) : (
            <li key={item}>
              <button
                onClick={() => onChange(item)}
                className={item === paginaAtual ? 'ativa' : ''}
              >
                {item}
              </button>
            </li>
          )
        )}

        <li>
          <button
            onClick={() => onChange(paginaAtual + 1)}
            disabled={paginaAtual === totalPaginas}
          >
            ›
          </button>
        </li>
      </ul>
    </nav>
  )
}
