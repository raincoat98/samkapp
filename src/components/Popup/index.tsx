import { ReactNode } from "react";
import {
  useMediaQuery,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Portal,
  Icon,
  IconButton,
  Center,
} from "@chakra-ui/react";
import { caretLeft, caretRight } from "utils/icons";

export type PopupProps = {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  footerChildren?: ReactNode;
  leftButton?: {
    isDisabled?: boolean;
    onClick: () => void;
  };
  rightButton?: {
    isDisabled?: boolean;
    onClick: () => void;
  };
};

export default function Popup(props: PopupProps) {
  // 가로 세로 모드 구분
  const [isLandscape] = useMediaQuery("(orientation: landscape)");

  return (
    <Portal>
      <Modal
        isOpen={props.isOpen}
        onClose={props.onClose}
        size={isLandscape ? "2xl" : "full"}
        isCentered={isLandscape}
        scrollBehavior={isLandscape ? "inside" : "outside"}
        variant="popup"
      >
        <ModalOverlay />
        <ModalContent
          width="100%"
          height="100%"
          overflow="auto"
          borderWidth={1}
        >
          {/* 헤더 */}
          <ModalHeader>{props.title}</ModalHeader>

          {/* 닫기 버튼 */}
          <ModalCloseButton size="lg" />

          {/* 콘텐츠 영역 */}
          <ModalBody>{props.children}</ModalBody>

          {/* 푸터 */}
          {props.footerChildren && (
            <ModalFooter>{props.footerChildren}</ModalFooter>
          )}
        </ModalContent>

        {/* 좌측 버튼 */}
        {isLandscape && props.leftButton && (
          <Center
            position="absolute"
            top={0}
            left={10}
            width={"20%"}
            height={"100%"}
          >
            <IconButton
              onClick={() => props.leftButton?.onClick()}
              isDisabled={props.leftButton.isDisabled}
              width={50}
              height={50}
              padding={50}
              zIndex="modal"
              icon={<Icon boxSize={50} as={caretLeft} />}
              borderRadius={"full"}
              variant="ghost"
              aria-label="이전"
            />
          </Center>
        )}

        {/* 우측 버튼 */}
        {isLandscape && props.rightButton && (
          <Center
            position="absolute"
            top={0}
            right={10}
            width={"20%"}
            height={"100%"}
          >
            <IconButton
              onClick={() => props.rightButton?.onClick()}
              isDisabled={props.rightButton.isDisabled}
              width={50}
              height={50}
              padding={50}
              zIndex="modal"
              icon={<Icon boxSize={50} as={caretRight} />}
              borderRadius={"full"}
              variant="ghost"
              aria-label="이전"
            />
          </Center>
        )}
      </Modal>
    </Portal>
  );
}
