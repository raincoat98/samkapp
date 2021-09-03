import { Link, useHistory } from "react-router-dom";
import { RootState } from "../store";
import { useSelector } from "react-redux";
import {
  useColorMode,
  Image,
  Flex,
  Button,
  ButtonGroup,
  Divider,
  Center,
} from "@chakra-ui/react";

export default function Sidebar(props: {
  isOpen: boolean;
  isLandscape: boolean;
}) {
  const { isOpen, isLandscape } = props;

  const { colorMode } = useColorMode();
  const logo = useSelector((state: RootState) => state.system.logo);
  const defaultPath = useSelector(
    (state: RootState) => state.router.defaultPath
  );
  const history = useHistory();

  return (
    <Flex
      display={isOpen ? "flex" : "none"}
      direction={"column"}
      w={isLandscape ? 250 : "100%"}
      borderRightWidth="1px"
    >
      <Link to={defaultPath}>
        <Center w={"100%"} h={100}>
          <Image
            src={logo}
            alt=""
            filter={colorMode === "dark" ? "contrast(0%) brightness(2)" : ""}
            p="5"
            userSelect="none"
          />
        </Center>
      </Link>

      <Divider />

      <Flex
        as={ButtonGroup}
        flex="1"
        direction="column"
        px={5}
        py={8}
        size="lg"
        spacing="0"
        variant="outline"
        justify="center"
      >
        <Button
          onClick={() => {
            history.push("/location_manage");
          }}
          w="100%"
        >
          위치 관리
        </Button>

        <br />

        <Button
          onClick={() => {
            history.push("/customer_manage");
          }}
          w="100%"
        >
          고객 관리
        </Button>

        <br />

        <Button
          onClick={() => {
            history.push("/inventory_manage");
          }}
          w="100%"
        >
          재고 관리
        </Button>

        <br />

        <Button
          onClick={() => {
            history.push("/item_manage");
          }}
          w="100%"
        >
          품목 관리
        </Button>
      </Flex>
    </Flex>
  );
}
