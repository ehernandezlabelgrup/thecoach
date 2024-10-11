import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";

interface IProps {
  children: React.ReactNode;
  title: string;
  button: React.ReactNode;
  textAccept: string;
  onAccept: () => void;
}

export default function CustomModal({
  children,
  title,
  button,
  textAccept,
  onAccept,
}: IProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <button onClick={onOpen}>{button}</button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent className="rounded-none">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
              <ModalBody>{children}</ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancelar
                </Button>
                <Button
                  className="rounded-none"
                  color="primary"
                  onPress={() => {
                    onAccept();
                    onClose();
                  }}
                >
                  {textAccept}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
