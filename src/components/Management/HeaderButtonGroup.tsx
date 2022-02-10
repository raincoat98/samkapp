import { ButtonGroup, Icon, IconButton, Tooltip } from "@chakra-ui/react";
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
      <Tooltip label="삭제">
        <IconButton
          isDisabled={props.isDeleteDisabled}
          onClick={props.onDeleteClick}
          icon={<Icon as={trash} />}
          colorScheme="red"
          aria-label="삭제"
        />
      </Tooltip>

      <Tooltip label="신규 작성">
        <IconButton
          onClick={props.onAddClick}
          icon={<Icon as={add} />}
          colorScheme="blue"
          aria-label="신규"
        />
      </Tooltip>

      <Tooltip label="데이터 새로고침">
        <IconButton
          icon={<Icon as={refresh} />}
          onClick={props.onRefreshClick}
          aria-label="새로고침"
        />
      </Tooltip>
    </ButtonGroup>
  );
}
