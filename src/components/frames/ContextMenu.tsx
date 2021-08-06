import {
  Portal,
  Menu,
  MenuList,
  MenuProps,
  useStyleConfig,
} from "@chakra-ui/react";

type ContextMenuProps = {
  isOpen: boolean;
  x: number;
  y: number;
};

export default function ContextMenu(props: MenuProps & ContextMenuProps) {
  const { children, isOpen, x, y, ...rest } = props;
  const styles = useStyleConfig("ContextMenu");

  return (
    <Portal>
      <Menu isOpen={isOpen} autoSelect={true}>
        <MenuList
          __css={styles}
          {...rest}
          position="absolute"
          left={x + "px"}
          top={y + "px"}
        >
          {children}
        </MenuList>
      </Menu>
    </Portal>
  );
}
