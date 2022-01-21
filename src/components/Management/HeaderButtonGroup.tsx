import { ButtonGroup, Icon, IconButton } from "@chakra-ui/react";
import { refresh, add, trash } from "utils/icons";

export default function ManagementHeaderButtonGroup(props: {
  isDeleteDisabled: boolean;
  onDeleteClick: () => void;

  isAddDisabled: boolean;
  onAddClick: () => void;

  isRefreshDisabled: boolean;
  onRefreshClick: () => void;
}) {
  return (
    <ButtonGroup>
      <IconButton
        isDisabled={props.isDeleteDisabled}
        onClick={props.onDeleteClick}
        icon={<Icon as={trash} />}
        colorScheme="red"
        aria-label="삭제"
        title="삭제"
      />

      <IconButton
        onClick={props.onAddClick}
        icon={<Icon as={add} />}
        colorScheme="blue"
        aria-label="신규"
        title="신규"
      />

      <IconButton
        icon={<Icon as={refresh} />}
        onClick={props.onRefreshClick}
        aria-label="새로고침"
        title="새로고침"
      />
    </ButtonGroup>
  );
}
