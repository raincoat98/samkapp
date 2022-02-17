import { useSelector } from "react-redux";
import { RootState } from "store";
import { Box, CloseButton, Heading, HStack } from "@chakra-ui/react";
import { part } from "schema/part";

export default function PartCard(props: { part: part; onClose?: () => void }) {
  const { part, onClose } = props;

  const database = useSelector((state: RootState) => state.realm.database);

  const group = database.group2.find(
    (item) => item.group2_id === part?.group2_id
  );
  const inv = database.inventory.find((item) => item.part_id === part.part_id);
  const unit = database.unit.find((item) => item.unit_id === part.unit_id);

  return (
    <Box position="relative" width="100%" borderWidth={2} padding={2}>
      {onClose && (
        <CloseButton position="absolute" right={5} onClick={() => onClose()} />
      )}

      <Heading size={"md"}>{part.part_name}</Heading>
      {group && (
        <HStack>
          {group.spec1 && (
            <Box>
              {group?.spec1}: {part.spec1}
            </Box>
          )}

          {group.spec2 && (
            <Box>
              {group?.spec2}: {part.spec2}
            </Box>
          )}
          {group.spec3 && (
            <Box>
              {group?.spec3}: {part.spec3}
            </Box>
          )}
          {group.spec4 && (
            <Box>
              {group?.spec4}: {part.spec4}
            </Box>
          )}
          {group.spec5 && (
            <Box>
              {group?.spec5}: {part.spec5}
            </Box>
          )}
        </HStack>
      )}
      <Box>
        재고: {inv ? `${inv?.quantity} ${unit?.unit_name_kor}` : "정보 없음"}
      </Box>
    </Box>
  );
}
