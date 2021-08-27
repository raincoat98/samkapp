import { useSelector } from "react-redux";
import { RootState } from "store";
import { Icon, chakra } from "@chakra-ui/react";

export default function TableSortIcon(props: {
  isSorted: boolean;
  isSortedDesc: boolean;
}) {
  // 정렬 아이콘
  const sortIcon = useSelector((state: RootState) => state.icon.sort);
  const upIcon = useSelector((state: RootState) => state.icon.sortUp);
  const downIcon = useSelector((state: RootState) => state.icon.sortDown);

  return (
    <chakra.span pl="2">
      {/* @ts-ignore */}
      {props.isSorted ? (
        // @ts-ignore
        props.isSortedDesc ? (
          <Icon as={downIcon} />
        ) : (
          <Icon as={upIcon} />
        )
      ) : (
        <Icon as={sortIcon} />
      )}
    </chakra.span>
  );
}
