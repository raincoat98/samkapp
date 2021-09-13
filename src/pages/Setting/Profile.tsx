import { useSelector, useDispatch } from "react-redux";
import { RootState } from "store";
import { logout } from "store/realm";
import { Icon, Heading, Button, Wrap, WrapItem } from "@chakra-ui/react";
import { user } from "utils/icons";

export default function Profile() {
  const dispatch = useDispatch();
  const userName = useSelector((state: RootState) => state.realm.userName);

  return (
    <Wrap align="center" spacing={3}>
      <WrapItem>
        <Icon
          as={user}
          boxSize="64px"
          borderRadius="full"
          overflow="hidden"
          backgroundColor="white"
          color="black"
          padding="3"
        />
      </WrapItem>

      <WrapItem>
        <Heading as="h4" size="md">
          {userName}
        </Heading>
      </WrapItem>

      <WrapItem>
        <Button onClick={() => dispatch(logout())}>로그아웃</Button>
      </WrapItem>
    </Wrap>
  );
}
