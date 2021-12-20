import { useHistory } from "react-router-dom";
import { sidebarRouteType, sidebarConfig } from "utils/routerConfig";
import { circle } from "utils/icons";
import {
  useMediaQuery,
  Stack,
  Button,
  ButtonGroup,
  Center,
  Icon,
  Heading,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";

export default function SidebarMenu(props: { onClose: () => void }) {
  const [isLandscape] = useMediaQuery("(orientation: landscape)");
  const history = useHistory();

  // 사이드바 버튼
  function SidebarButton(sidebarRoute: sidebarRouteType) {
    return (
      <Button
        onClick={() => {
          if (sidebarRoute.route) {
            history.push(sidebarRoute.route.path);
            if (!isLandscape) props.onClose();
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
                      <Icon as={circle} marginRight={2} />
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
  );
}
