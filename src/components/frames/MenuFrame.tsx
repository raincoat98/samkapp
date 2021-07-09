import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Button,
  Icon,
} from "@chakra-ui/react";
import { AiOutlineMenu } from "react-icons/ai";

type MenuFrameProps = {
  name: string;
  items: string[];
};

function MenuFrame(props: MenuFrameProps) {
  const MenuItems = props.items.map((name, index) =>
    // 받은 name 이 "" 일 경우 MenuDivider (메뉴 분할) 리턴
    name !== "" ? <MenuItem key={index}>{name}</MenuItem> : <MenuDivider />
  );

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
