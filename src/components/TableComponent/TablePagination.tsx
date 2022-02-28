import { chakra, Center, Stack, IconButton, Icon } from "@chakra-ui/react";
import { arrowBack, arrowForward, caretLeft, caretRight } from "utils/icons";

export default function TablePagination(props: {
  pageIndex: number;
  pageCount: number;
  canPreviousPage: boolean;
  canNextPage: boolean;
  onPaging: (index: number) => void;
  onPreviousPage: () => void;
  onNextPage: () => void;
}) {
  return (
    <Center>
      <Stack direction="column" spacing={2} isInline={true}>
        <IconButton
          onClick={() => props.onPaging(0)}
          disabled={!props.canPreviousPage}
          icon={<Icon as={arrowBack} />}
          aria-label="맨 앞으로"
          title="맨 앞으로"
          size={"sm"}
        />
        <IconButton
          onClick={props.onPreviousPage}
          isDisabled={!props.canPreviousPage}
          icon={<Icon as={caretLeft} />}
          aria-label="이전"
          title="이전"
          size={"sm"}
        />
        <Center>
          {props.pageIndex + 1}
          <chakra.span marginX={1}>/</chakra.span>
          {props.pageCount === 0 ? 1 : props.pageCount}
        </Center>
        <IconButton
          onClick={props.onNextPage}
          isDisabled={!props.canNextPage}
          icon={<Icon as={caretRight} />}
          aria-label="다음"
          title="다음"
          size={"sm"}
        />
        <IconButton
          onClick={() => props.onPaging(props.pageCount - 1)}
          disabled={!props.canNextPage}
          icon={<Icon as={arrowForward} />}
          aria-label="맨 뒤로"
          title="맨 뒤로"
          size={"sm"}
        />
      </Stack>
    </Center>
  );
}
