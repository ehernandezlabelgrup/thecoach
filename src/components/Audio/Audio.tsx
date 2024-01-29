import { useRef, useState, useEffect } from "react";
import Modal from "../Modal";

const Audio = ({ audio, onDeleteAudio }) => {
  const ref = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  // Función para reproducir el audio
  const playAudio = () => {
    const audio = ref.current;
    if (audio) {
      audio.play();
      setIsPlaying(true);
    }
  };

  // Función para pausar el audio
  const pauseAudio = () => {
    const audio = ref.current;
    if (audio) {
      audio.pause();
      setIsPlaying(false);
    }
  };

  // Función para detener el audio
  const stopAudio = () => {
    const audio = ref.current;
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
      setIsPlaying(false);
    }
  };

  // Efecto para detectar cuando el audio termina
  useEffect(() => {
    const audio = ref.current;
    if (audio) {
      const handleAudioEnd = () => setIsPlaying(false);
      audio.addEventListener("ended", handleAudioEnd);

      return () => {
        audio.removeEventListener("ended", handleAudioEnd);
      };
    }
  }, []);

  // Función para eliminar el audio
  const handleDeleteAudio = () => {
    if (isPlaying) {
      stopAudio(); // Detiene el audio si está en reproducción
    }
    onDeleteAudio(); // Llama a la función pasada por props para eliminar el audio
  };

  return (
    <div className="audio">
      <button
        className="flex flex-row items-center"
        onClick={() => setShowModal(true)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="w-5 h-5 fill-green-700"
        >
          <path
            fillRule="evenodd"
            d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm14.024-.983a1.125 1.125 0 0 1 0 1.966l-5.603 3.113A1.125 1.125 0 0 1 9 15.113V8.887c0-.857.921-1.4 1.671-.983l5.603 3.113Z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      <Modal visible={showModal}>
        <div className="flex items-center justify-between">
          <audio controls ref={ref} src={audio?.audio_url} />
          <button
            onClick={() => {
              setShowModalDelete(true);
              setShowModal(false);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="w-6 h-6 fill-red-500"
            >
              <path
                fillRule="evenodd"
                d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </Modal>

      <Modal
        onRequestClose={() => setShowModalDelete(false)}
        onAccept={handleDeleteAudio}
        visible={showModalDelete}
      >
        ¿Está seguro que desea eliminar este audio?
      </Modal>
    </div>
  );
};

export default Audio;
