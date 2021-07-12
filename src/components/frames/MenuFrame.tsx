import { Link } from "react-router-dom";
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

// 메뉴 버튼 Props
type MenuFrameButtonProps = {
  name?: string;
  isDivider?: boolean | false;
  onClick?: () => {};
  link?: string;
};

// 메뉴 버튼
function MenuFrameButton(props: MenuFrameButtonProps) {
  if (props.isDivider) return <MenuDivider />;

  if (props.link) {
    return (
      <Link to={props.link}>
        <MenuItem>{props.name}</MenuItem>
      </Link>
    );
  } else return <MenuItem>{props.name}</MenuItem>;
}

// 메뉴 Props
type MenuFrameProps = {
  name: string;
  items: MenuFrameButtonProps[];
};

// 메뉴
function MenuFrame(props: MenuFrameProps) {
  const MenuItems = props.items.map((MenuFrameButtonProps, index) => (
    <MenuFrameButton
      name={MenuFrameButtonProps.name}
      onClick={MenuFrameButtonProps.onClick}
      isDivider={MenuFrameButtonProps.isDivider}
      link={MenuFrameButtonProps.link}
      key={index}
    />
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
