import { useSelector, useDispatch } from "react-redux";
import { RootState } from "store";
import { setBookmarkData } from "store/realm";
import PageContainer from "components/PageContainer";
import InputFormControl from "components/Input/InputFormControl";
import InputPartId from "components/Input/InputPartId";
import { Box, Heading, HStack } from "@chakra-ui/react";

export default function ImportantProduct() {
  const dispatch = useDispatch();
  const database = useSelector((state: RootState) => state.realm.database);
  const bookmarkedData = useSelector(
    (state: RootState) => state.realm.bookmarkedData
  );

  return (
    <PageContainer title={"주요품목"}>
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
        {bookmarkedData.part.map((part, index) => {
          const inv = database.inventory.find(
            (invItem) => invItem.part_id === part.part_id
          );
          const group = database.group2.find(
            (group2Item) => group2Item.group2_id === part.group2_id
          );

          return (
            <Box key={index} borderWidth={2} padding={2} marginTop={3}>
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
              <Box>재고: {inv ? inv?.quantity : "정보 없음"}</Box>
            </Box>
          );
        })}
      </Box>
    </PageContainer>
  );
}
