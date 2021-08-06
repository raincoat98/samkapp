import React, { FormEvent } from "react";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerProps,
  Stack,
} from "@chakra-ui/react";

export default function DrawerComponent(
  props: DrawerProps & {
    headerChildren: React.ReactNode;
    footerChildren: React.ReactNode;
    isOpen: boolean;
    onClose: () => void;
    isForm?: boolean | false;
    onSubmit?: Function;
  }
) {
  const {
    children,
    headerChildren,
    footerChildren,
    isOpen,
    onClose,
    isForm,
    onSubmit,
    ...rest
  } = props;

  return (
    <Drawer
      {...rest}
      isOpen={isOpen}
      placement="right"
      size="sm"
      onClose={onClose}
    >
      <DrawerOverlay />
      {isForm && (
        <form
          onSubmit={(event: FormEvent) => {
            if (onSubmit) onSubmit(event);
          }}
        >
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader borderBottomWidth="1px">
              {headerChildren}
            </DrawerHeader>
            <DrawerBody>
              <Stack spacing={5}>{children}</Stack>
            </DrawerBody>
            <DrawerFooter borderTopWidth="1px">{footerChildren}</DrawerFooter>
          </DrawerContent>
        </form>
      )}
      {!isForm && (
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">{headerChildren}</DrawerHeader>
          <DrawerBody>
            <Stack spacing={5}>{children}</Stack>
          </DrawerBody>
          <DrawerFooter borderTopWidth="1px">{footerChildren}</DrawerFooter>
        </DrawerContent>
      )}
    </Drawer>
  );
}
