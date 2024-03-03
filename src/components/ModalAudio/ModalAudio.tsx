import React, { useEffect } from "react"
import Modal from "../Modal"
import { IAudio } from "../Audio/Audio"
import Button from "../Button"

interface IProps {
  audio: IAudio | false
  onDeleteAudio: (audio: IAudio) => void
  setSelectAudio: () => void
  updateAudio: (audio: IAudio) => void
}

const ModalAudio = ({
  audio,
  onDeleteAudio,
  setSelectAudio,
  updateAudio,
}: IProps) => {
  const ref = React.useRef<HTMLAudioElement>(null)
  const [showAudio, setShowAudio] = React.useState(false)
  const [showModalDelete, setShowModalDelete] = React.useState(false)
  const [isPlaying, setIsPlaying] = React.useState(false)
  const [title, setTitle] = React.useState((audio && audio?.title) || "")

  const stopAudio = () => {
    const audio = ref.current
    if (audio) {
      audio.pause()
      audio.currentTime = 0
      setIsPlaying(false)
    }
  }

  useEffect(() => {
    if (audio) setShowAudio(true)
  }, [audio && audio?.date])

  useEffect(() => {
    if (showAudio) {
      if (audio) {
        setTitle(audio?.title || "")
      }
    } else {
      setTitle("")
    }
  }, [showAudio])

  // Efecto para detectar cuando el audio termina
  useEffect(() => {
    const audio = ref.current
    if (audio) {
      const handleAudioEnd = () => setIsPlaying(false)
      audio.addEventListener("ended", handleAudioEnd)

      return () => {
        audio.removeEventListener("ended", handleAudioEnd)
      }
    }
  }, [])

  // Función para eliminar el audio
  const handleDeleteAudio = () => {
    if (isPlaying) {
      stopAudio()
    }
    if (audio) {
      if (onDeleteAudio) onDeleteAudio(audio)
    }
  }

  return (
    <>
      <Modal
        textAccept="Guardar"
        visible={showAudio}
        onRequestClose={() => {
          setSelectAudio()
          setShowAudio(false)
        }}
        onAccept={() => {
          if (audio) {
            updateAudio({
              ...audio,
              title,
            })
            setShowAudio(false)
            setSelectAudio()
          }
        }}
      >
        <div className="flex items-center justify-between">
          <div className="gap-3 flex flex-col">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="h-[38px] px-4 bg-gray-100 outline-none"
              placeholder="titulo del audio"
            />

            {audio && <audio controls ref={ref} src={audio?.audio_url} />}
          </div>
          <Button
            mode="alert"
            onClick={() => {
              handleDeleteAudio()
              setShowAudio(false)
            }}
            title="Eliminar"
          />
        </div>
      </Modal>

      <Modal
        onRequestClose={() => setShowModalDelete(false)}
        onAccept={handleDeleteAudio}
        visible={showModalDelete}
      >
        ¿Está seguro que desea eliminar este audio?
      </Modal>
    </>
  )
}

ModalAudio.propTypes = {}

export default ModalAudio
