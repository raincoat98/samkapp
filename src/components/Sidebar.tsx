import { useHistory } from "react-router-dom";
import { RootState } from "../store";
import { useSelector } from "react-redux";
import { setting } from "utils/icons";
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
  const routes = useSelector((state: RootState) => state.router.routes);
  const logo = useSelector((state: RootState) => state.system.logo);
  const history = useHistory();

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
        {routes.map((route, index) => {
          if (route.sidebar) {
            return (
              <Button
                onClick={() => {
                  history.push(route.path);
                  if (!isLandscape) onClose();
                }}
                w="100%"
                _notLast={{ mb: 5 }}
                key={index}
              >
                {route.name}
              </Button>
            );
          } else {
            return "";
          }
        })}
      </Flex>

      <IconButton
        icon={<Icon as={setting} />}
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
