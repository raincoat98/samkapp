import React, { FormEvent } from "react";
import {
  Portal,
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
import { HeaderAndFooterProps } from "../props";

export default function DrawerComponent(
  props: DrawerProps &
    HeaderAndFooterProps & {
      isForm?: boolean | false;
      onSubmit?: Function;
    }
) {
  const {
    children,
    headerChildren,
    footerChildren,
    isForm,
    onSubmit,
    ...rest
  } = props;

  return (
    <Portal>
      <Drawer
        {...rest}
        isOpen={props.isOpen}
        placement="right"
        size="sm"
        onClose={props.onClose}
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
            <DrawerHeader borderBottomWidth="1px">
              {headerChildren}
            </DrawerHeader>
            <DrawerBody>
              <Stack spacing={5}>{children}</Stack>
            </DrawerBody>
            <DrawerFooter borderTopWidth="1px">{footerChildren}</DrawerFooter>
          </DrawerContent>
        )}
      </Drawer>
    </Portal>
  );
}
