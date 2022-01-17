import { sort, sortUp, sortDown } from "utils/icons";
import { Icon, chakra } from "@chakra-ui/react";

export default function TableSortIcon(props: {
  isSorted: boolean;
  isSortedDesc: boolean;
}) {
  return (
    <chakra.span paddingLeft="1" display="inline-flex">
      <Icon
        as={props.isSorted ? (props.isSortedDesc ? sortDown : sortUp) : sort}
      />
    </chakra.span>
  );
}
