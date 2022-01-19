import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Portal,
} from "@chakra-ui/react";

export default function PrintPopup(props: {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) {
  return (
    <Portal>
      <Modal isOpen={props.isOpen} onClose={props.onClose} size="full">
        <ModalContent
          width="100%"
          height="100%"
          overflow="hidden"
          // 크롬 기반 브라우저 PDF 뷰어 기본 배경색
          bgColor="#323639"
          color="white"
          borderRadius={0}
        >
          {/* 헤더 */}
          <ModalHeader>출력하기</ModalHeader>

          {/* 닫기 버튼 */}
          <ModalCloseButton size="lg" />

          {/* 콘텐츠 영역 */}
          <ModalBody padding={0}>{props.children}</ModalBody>
        </ModalContent>
      </Modal>
    </Portal>
  );
}
