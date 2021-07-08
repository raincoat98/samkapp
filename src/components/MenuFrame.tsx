import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Icon,
  Divider,
} from "@chakra-ui/react";
import { AiOutlineMenu } from "react-icons/ai";

type MenuFrameProps = {
  name: string;
  items: string[];
};

function MenuFrame(props: MenuFrameProps) {
  const MenuItems = props.items.map((name, index) => (
    <MenuItem key={index}>{name}</MenuItem>
  ));

  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<Icon as={AiOutlineMenu} />}>
        {props.name}
      </MenuButton>
      <MenuList>{MenuItems}</MenuList>
    </Menu>
  );
}

export default MenuFrame;
