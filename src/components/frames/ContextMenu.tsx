import {
  Portal,
  Menu,
  MenuList,
  MenuProps,
  useStyleConfig,
} from "@chakra-ui/react";

type ContextMenuProps = {
  x: number;
  y: number;
};

export default function ContextMenu(props: MenuProps & ContextMenuProps) {
  const { children, ...rest } = props;
  const styles = useStyleConfig("ContextMenu");

  return (
    <Portal>
      <Menu isOpen={props.isOpen} autoSelect={true}>
        <MenuList
          __css={styles}
          {...rest}
          position="absolute"
          left={props.x + "px"}
          top={props.y + "px"}
          boxShadow="md"
        >
          {children}
        </MenuList>
      </Menu>
    </Portal>
  );
}
