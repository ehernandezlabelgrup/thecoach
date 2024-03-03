import {
  TEModal,
  TEModalBody,
  TEModalContent,
  TEModalDialog,
  TEModalFooter,
} from "tw-elements-react"
import Button from "../Button"

interface IProps {
  visible: boolean
  onRequestClose?: () => void
  onAccept?: () => void
  children: React.ReactNode
  textAccept?: string
}

const Modal = ({
  visible,
  onRequestClose,
  children,
  onAccept,
  textAccept = "Aceptar",
}: IProps) => {
  return (
    <TEModal
      zIndex={9999}
      show={visible}
      setShow={onRequestClose ? onRequestClose : () => null}
    >
      <TEModalDialog>
        <TEModalContent>
          {/* <!--Modal body--> */}
          <TEModalBody>{children}</TEModalBody>
          <TEModalFooter className="gap-3">
            {onRequestClose && (
              <Button mode="alert" onClick={onRequestClose} title="Cancelar" />
            )}
            {onAccept && (
              <Button mode="primary" onClick={onAccept} title={textAccept} />
            )}
          </TEModalFooter>
        </TEModalContent>
      </TEModalDialog>
    </TEModal>
  )
}

export default Modal
