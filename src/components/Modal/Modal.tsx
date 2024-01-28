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
}

const Modal = ({ visible, onRequestClose, children, onAccept }: IProps) => {
  return (
    <TEModal
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
              <Button mode="primary" onClick={onAccept} title="Aceptar" />
            )}
          </TEModalFooter>
        </TEModalContent>
      </TEModalDialog>
    </TEModal>
  )
}

export default Modal
