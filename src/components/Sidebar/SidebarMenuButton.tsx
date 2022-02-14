import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { sidebarRouteType } from "utils/routerConfig";
import { circle } from "utils/icons";
import {
  useMediaQuery,
  useColorModeValue,
  Button,
  Icon,
  Heading,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
import { sidebarMenuSelected } from "theme";

// 사이드바 버튼
export default function SidebarMenuButton(props: {
  sidebarRoute: sidebarRouteType;
  onClick: () => void;
}) {
  const [currentPath, setCurrentPath] = useState("");
  const [isLandscape] = useMediaQuery("(orientation: landscape)");
  const history = useHistory();
  const bgColorSelected = useColorModeValue(
    sidebarMenuSelected.light,
    sidebarMenuSelected.dark
  );

  useEffect(() => {
    history.listen(() => {
      setCurrentPath(history.location.pathname);
    });
  }, [history]);

  if (props.sidebarRoute.children) {
    return (
      <Accordion allowMultiple>
        <AccordionItem>
          <AccordionButton>
            <Heading as="h5" size="sm">
              <Icon as={circle} marginRight={2} />
              {props.sidebarRoute.name}
            </Heading>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel py={1}>
            {props.sidebarRoute.children.map((sidebarRoute, index) => (
              <SidebarMenuButton
                sidebarRoute={sidebarRoute}
                onClick={props.onClick}
                key={index}
              />
            ))}
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    );
  } else {
    return (
      <Button
        onClick={() => {
          if (props.sidebarRoute.route) {
            history.push(props.sidebarRoute.route.path);
            if (!isLandscape) props.onClick();
          }
        }}
        justifyContent="normal"
        width="100%"
        textAlign="left"
        // 배경색 지정
        bgColor={
          currentPath === props.sidebarRoute.route?.path
            ? bgColorSelected
            : "inherit"
        }
      >
        <Icon as={circle} marginRight={2} />
        {props.sidebarRoute.name}
      </Button>
    );
  }
}
