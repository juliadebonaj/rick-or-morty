interface Props {
  status: string
  species: string
  onStatusChange: (valor: string) => void
  onSpeciesChange: (valor: string) => void
}

export function Filtros({ status, species, onStatusChange, onSpeciesChange }: Props) {
  return (
    <fieldset className="filtros">
      <legend>Filtrar</legend>

      <label htmlFor="filtro-status">Status</label>
      <select
        id="filtro-status"
        value={status}
        onChange={(e) => onStatusChange(e.target.value)}
      >
        <option value="">Todos</option>
        <option value="alive">Alive</option>
        <option value="dead">Dead</option>
        <option value="unknown">Unknown</option>
      </select>

      <label htmlFor="filtro-species">Espécie</label>
      <select
        id="filtro-species"
        value={species}
        onChange={(e) => onSpeciesChange(e.target.value)}
      >
        <option value="">Todas</option>
        <option value="Human">Human</option>
        <option value="Alien">Alien</option>
        <option value="Humanoid">Humanoid</option>
        <option value="Robot">Robot</option>
        <option value="Animal">Animal</option>
        <option value="Mythological Creature">Mythological Creature</option>
        <option value="unknown">Unknown</option>
      </select>
    </fieldset>
  )
}
