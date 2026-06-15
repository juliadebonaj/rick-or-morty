interface Props {
  valor: string
  onChange: (valor: string) => void
}

export function Busca({ valor, onChange }: Props) {
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <label htmlFor="busca">Buscar personagem</label>
      <input
        id="busca"
        type="search"
        placeholder="Buscar personagem..."
        value={valor}
        onChange={(e) => onChange(e.target.value)}
      />
    </form>
  )
}
