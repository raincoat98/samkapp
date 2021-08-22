import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
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

export default function Sidebar() {
  const { t } = useTranslation();
  const { colorMode } = useColorMode();
  const logo = useSelector((state: RootState) => state.system.logo);

  const defaultPath = useSelector(
    (state: RootState) => state.router.defaultPath
  );

  return (
    <Flex direction={"column"} w={250} borderRightWidth="1px">
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
        <Link to={"/inventory_manage"}>
          <Button w="100%">{t("재고 관리")}</Button>
        </Link>
      </Flex>
    </Flex>
  );
}
