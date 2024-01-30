import { useMemo } from "react"

interface Props {
  text: string
}

/**
 * Componente que renderiza el calentamiento de un entrenamiento
 * Para mostrarse como se guarda con \n en la base de datos se realiza un split
 */
const WorktoutTextSplit = ({ text = "" }: Props) => {
  /**
   * Se realiza un split para separar cada linea del calentamiento
   */
  const split = useMemo(() => {
    if (text) {
      return text?.split("\n")
    } else {
      return []
    }
  }, [text])
  return (
    <ul className="tc-list tc-list--f workout-cooldown font-light !pt-1 !mt-1 !pb-1 !mb-1">
      {split?.map((item: string, index: number) => (
        <li key={index} className="workout-warmup-line tc-list-item">
          {item}
        </li>
      ))}
    </ul>
  )
}

export default WorktoutTextSplit
