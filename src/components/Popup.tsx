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
} from "@chakra-ui/react";
export default function Popup(props: {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  footerChildren?: ReactNode;
}) {
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
      </Modal>
    </Portal>
  );
}
