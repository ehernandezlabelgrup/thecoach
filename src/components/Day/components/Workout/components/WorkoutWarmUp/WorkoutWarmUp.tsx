
interface Props{
    warmup: string
    
}

/**
 * Componente que renderiza el calentamiento de un entrenamiento
 * Para mostrarse como se guarda con \n en la base de datos se realiza un split
 */
const WorkoutWarmUp = ({
    warmup
}: Props) => {

    /**
     * Se realiza un split para separar cada linea del calentamiento
     */
    const split = warmup.split('\n')
  return (
    <ul className="tc-list tc-list--f workout-warmup mt-1 font-light">
        {
            split.map((item: string, index: number) => (
                <li key={index} className="workout-warmup-line tc-list-item">{item}</li>
            ))
        }
</ul>
  )
}

export default WorkoutWarmUp