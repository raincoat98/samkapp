import { useHistory } from "react-router-dom";
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
  CloseButton,
  IconButton,
  Icon,
} from "@chakra-ui/react";

export default function Sidebar(props: {
  isOpen: boolean;
  onClose: Function;
  isLandscape: boolean;
}) {
  const { isOpen, onClose, isLandscape } = props;

  const { colorMode } = useColorMode();
  const logo = useSelector((state: RootState) => state.system.logo);
  const history = useHistory();

  // 아이콘 가져오기
  const settingIcon = useSelector((state: RootState) => state.icon.setting);

  return (
    <Flex
      display={isOpen ? "flex" : "none"}
      direction={"column"}
      w={isLandscape ? 250 : "100%"}
      p={5}
      borderRightWidth="1px"
    >
      <Flex>
        <Center>
          {isLandscape ? (
            ""
          ) : (
            <CloseButton
              onClick={() => {
                onClose();
              }}
            />
          )}
        </Center>

        <Center w={"100%"} maxH={100}>
          <Image
            src={logo}
            maxH="100%"
            pb={5}
            filter={colorMode === "dark" ? "contrast(0%) brightness(2)" : ""}
            userSelect="none"
            alt=""
          />
        </Center>
      </Flex>

      <Divider />

      <Flex
        as={ButtonGroup}
        flex="1"
        direction="column"
        py={8}
        size="lg"
        spacing="0"
        variant="outline"
        justify="center"
      >
        <Button
          onClick={() => {
            history.push("/location_manage");
            if (!isLandscape) onClose();
          }}
          w="100%"
        >
          위치 관리
        </Button>

        <br />

        <Button
          onClick={() => {
            history.push("/customer_manage");
            if (!isLandscape) onClose();
          }}
          w="100%"
        >
          고객 관리
        </Button>

        <br />

        <Button
          onClick={() => {
            history.push("/inventory_manage");
            if (!isLandscape) onClose();
          }}
          w="100%"
        >
          재고 관리
        </Button>

        <br />

        <Button
          onClick={() => {
            history.push("/item_manage");
            if (!isLandscape) onClose();
          }}
          w="100%"
        >
          품목 관리
        </Button>
      </Flex>

      <IconButton
        icon={<Icon as={settingIcon} />}
        onClick={() => {
          history.push("/setting");
          if (!isLandscape) onClose();
        }}
        width="fit-content"
        aria-label="설정"
      />
    </Flex>
  );
}
