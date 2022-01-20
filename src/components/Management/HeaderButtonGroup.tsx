import {
  ButtonGroup,
  Icon,
  IconButton,
  useColorModeValue,
} from "@chakra-ui/react";
import { refresh, add, trash } from "utils/icons";
import { borderColor } from "utils/colors";

export default function ManagementHeaderButtonGroup(props: {
  isDeleteDisabled: boolean;
  onDeleteClick: () => void;

  isAddDisabled: boolean;
  onAddClick: () => void;

  isRefreshDisabled: boolean;
  onRefreshClick: () => void;
}) {
  const borderColorValue = useColorModeValue(
    borderColor.light,
    borderColor.dark
  );

  return (
    <ButtonGroup>
      <IconButton
        isDisabled={props.isDeleteDisabled}
        onClick={props.onDeleteClick}
        icon={<Icon as={trash} />}
        colorScheme="red"
        aria-label="삭제"
        title="삭제"
        borderWidth={1}
        borderColor={borderColorValue}
      />

      <IconButton
        onClick={props.onAddClick}
        icon={<Icon as={add} />}
        colorScheme="blue"
        aria-label="신규"
        title="신규"
        borderWidth={1}
        borderColor={borderColorValue}
      />

      <IconButton
        icon={<Icon as={refresh} />}
        onClick={props.onRefreshClick}
        aria-label="새로고침"
        title="새로고침"
        borderWidth={1}
        borderColor={borderColorValue}
      />
    </ButtonGroup>
  );
}
