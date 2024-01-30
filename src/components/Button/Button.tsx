import { useMemo } from "react"

interface IProps {
  onClick: () => void
  mode?: "primary" | "alert"
  title: string
}

const Button = ({ onClick, mode = "primary", title }: IProps) => {
  const styles = useMemo(() => {
    if (mode === "alert") {
      return "bg-red-400 text-white hover:bg-red-500 focus:bg-red-500 active:bg-red-600"
    }

    if (mode === "primary") {
      return "bg-blue-400 text-white hover:bg-primary-300 focus:bg-blue-600 active:bg-blue-400"
    }
  }, [mode])

  return (
    <button
      type="button"
      className={`inline-block rounded ${styles} px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal transition duration-150 ease-in-out ed-100 focus:outline-none focus:ring-0`}
      onClick={onClick}
    >
      {title}
    </button>
  )
}

export default Button
