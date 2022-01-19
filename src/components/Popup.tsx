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
  useColorModeValue,
} from "@chakra-ui/react";
import { modalHeaderBgColor } from "utils/colors";

export default function Popup(props: {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  footerChildren?: ReactNode;
}) {
  // 가로 세로 모드 구분
  const [isLandscape] = useMediaQuery("(orientation: landscape)");

  // 배경색
  const headerBgColor = useColorModeValue(
    modalHeaderBgColor.light,
    modalHeaderBgColor.dark
  );

  return (
    <Portal>
      <Modal
        isOpen={props.isOpen}
        onClose={props.onClose}
        size={isLandscape ? "2xl" : "full"}
        isCentered={isLandscape}
        scrollBehavior={isLandscape ? "inside" : "outside"}
      >
        <ModalOverlay />

        <ModalContent width="100%" height="100%" overflow="hidden">
          {/* 헤더 */}
          <ModalHeader bgColor={headerBgColor}>{props.title}</ModalHeader>

          {/* 닫기 버튼 */}
          <ModalCloseButton size="lg" />

          {/* 콘텐츠 영역 */}
          <ModalBody>{props.children}</ModalBody>

          {/* 푸터 */}
          {props.footerChildren && (
            <ModalFooter bgColor={headerBgColor}>
              {props.footerChildren}
            </ModalFooter>
          )}
        </ModalContent>
      </Modal>
    </Portal>
  );
}
