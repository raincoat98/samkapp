import { useHistory } from "react-router-dom";
import { RootState } from "../store";
import { useSelector } from "react-redux";
import { sidebarRouteType, sidebarConfig } from "utils/routerConfig";
import { circle, setting } from "utils/icons";
import {
  useColorMode,
  Image,
  Flex,
  Stack,
  Button,
  ButtonGroup,
  Divider,
  Center,
  CloseButton,
  IconButton,
  Icon,
  Heading,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";

export default function Sidebar(props: {
  isOpen: boolean;
  onClose: () => void;
  isLandscape: boolean;
}) {
  const { colorMode } = useColorMode();
  const logo = useSelector((state: RootState) => state.system.logo);
  const history = useHistory();

  // 사이드바 버튼
  function SidebarButton(sidebarRoute: sidebarRouteType) {
    return (
      <Button
        onClick={() => {
          if (sidebarRoute.route) {
            history.push(sidebarRoute.route.path);
            if (!props.isLandscape) props.onClose();
          }
        }}
        borderRadius="0"
        transitionDuration="0"
        textAlign="left"
        justifyContent="normal"
        width="100%"
      >
        <Icon as={circle} marginRight={2} />
        {sidebarRoute.name}
      </Button>
    );
  }

  return (
    <Flex
      display={props.isOpen ? "flex" : "none"}
      direction={"column"}
      w={props.isLandscape ? 250 : "100%"}
      p={5}
      // 우측 외곽선
      borderRightWidth="1px"
    >
      <Flex>
        <Center>
          {props.isLandscape ? (
            ""
          ) : (
            <CloseButton onClick={() => props.onClose()} />
          )}
        </Center>

        <Center w={"100%"} maxH={100}>
          <Image
            src={logo}
            maxH="100%"
            pb={5}
            filter={colorMode === "dark" ? "contrast(0%) brightness(2)" : ""}
            userSelect="none"
          />
        </Center>
      </Flex>

      <Divider />

      <Center flex="1" overflow="auto">
        <Stack as={ButtonGroup} variant="ghost" spacing="0" width="100%">
          {sidebarConfig.map((sidebarRoute, index) => {
            if (!sidebarRoute.children) {
              return <SidebarButton {...sidebarRoute} key={index} />;
            } else {
              return (
                <Accordion allowMultiple key={index}>
                  <AccordionItem>
                    <AccordionButton>
                      <Heading as="h5" size="sm">
                        {sidebarRoute.name}
                      </Heading>
                      <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel py={1}>
                      {sidebarRoute.children.map((sidebarRoute, index) => (
                        <SidebarButton {...sidebarRoute} key={index} />
                      ))}
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>
              );
            }
          })}
        </Stack>
      </Center>

      <Divider />

      <IconButton
        icon={<Icon as={setting} />}
        onClick={() => {
          history.push("/setting");
          if (!props.isLandscape) props.onClose();
        }}
        width="fit-content"
        aria-label="설정"
        marginTop={3}
      />
    </Flex>
  );
}
