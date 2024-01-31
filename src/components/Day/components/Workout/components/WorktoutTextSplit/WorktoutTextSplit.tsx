import { useMemo } from "react"

interface Props {
  text: string
  className?: string
  slipt?: boolean
}

/**
 * Componente que renderiza el calentamiento de un entrenamiento
 * Para mostrarse como se guarda con \n en la base de datos se realiza un split
 */
const WorktoutTextSplit = ({
  text = "",
  className = "",
  slipt = true,
}: Props) => {
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

  if (!slipt)
    return (
      <div
        className={`text-[10px] whitespace-nowrap text-ellipsis overflow-hidden ${className}`}
      >
        {text}
      </div>
    )

  return (
    <div className={`text-gray-400 text-[12px] leading-[14px] ${className}`}>
      {split?.map((item: string, index: number) => (
        <div key={index} className="!text-[12px]">
          {item}
        </div>
      ))}
    </div>
  )
}

export default WorktoutTextSplit
