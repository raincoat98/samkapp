import { ReactNode, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "store";
import { setBookmarkData, removeBookmarkData } from "store/realm";
import PageContainer from "components/PageContainer";
import InputFormControl from "components/Input/InputFormControl";
import InputPartId from "components/Input/InputPartId";
import Dialog from "components/Dialog";
import { Box, useDisclosure, VStack } from "@chakra-ui/react";
import { part } from "schema/part";
import { group2 } from "schema/group2";
import PartCard from "components/Card/PartCard";

export default function ImportantProduct() {
  const dispatch = useDispatch();
  const database = useSelector((state: RootState) => state.realm.database);
  const bookmarkedData = useSelector(
    (state: RootState) => state.realm.bookmarkedData
  );
  const deleteDialogDisclosure = useDisclosure();

  const [dialogChildren, setDialogChildren] = useState<ReactNode>();
  const [partToDelete, setPartToDelete] = useState<part>();

  function removeBookmark(props: { part: part; group?: group2 }) {
    setPartToDelete(props.part);
    setDialogChildren(<PartCard part={props.part}></PartCard>);
    deleteDialogDisclosure.onOpen();
  }

  return (
    <PageContainer title={"주요품목"}>
      <Dialog
        isOpen={deleteDialogDisclosure.isOpen}
        onClose={deleteDialogDisclosure.onClose}
        onConfirm={() => {
          if (partToDelete)
            dispatch(removeBookmarkData({ partItem: partToDelete }));
          setPartToDelete(undefined);
          deleteDialogDisclosure.onClose();
        }}
        leastDestructiveRef={undefined}
        headerChildren="주요 품목 해제 확인"
      >
        {dialogChildren}
        해당 품목을 주요 품목에서 해제하시겠습니까?
      </Dialog>
      <Box padding={3}>
        <InputFormControl name={"추가하기"}>
          <InputPartId
            onChange={(partId) => {
              const part = database.part.find(
                (part) => partId === part.part_id
              );
              if (part) dispatch(setBookmarkData({ partItem: part }));
            }}
          />
        </InputFormControl>

        <VStack marginTop={3}>
          {bookmarkedData.part.map((part, index) => {
            const group = database.group2.find(
              (group2Item) => group2Item.group2_id === part.group2_id
            );

            return (
              <PartCard
                part={part}
                onClose={() => {
                  removeBookmark({ part, group });
                }}
                key={index}
              ></PartCard>
            );
          })}
        </VStack>
      </Box>
    </PageContainer>
  );
}
