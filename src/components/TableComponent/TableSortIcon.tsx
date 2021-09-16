import { sort, sortUp, sortDown } from "utils/icons";
import { Icon, chakra } from "@chakra-ui/react";

export default function TableSortIcon(props: {
  isSorted: boolean;
  isSortedDesc: boolean;
}) {
  return (
    <chakra.span pl="2">
      {/* @ts-ignore */}
      {props.isSorted ? (
        // @ts-ignore
        props.isSortedDesc ? (
          <Icon as={sortDown} />
        ) : (
          <Icon as={sortUp} />
        )
      ) : (
        <Icon as={sort} />
      )}
    </chakra.span>
  );
}
