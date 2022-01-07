import { useSelector, useDispatch } from "react-redux";
import { RootState } from "store";
import { logout } from "store/realm";
import { user } from "utils/icons";
import { Icon, Heading, Button, Wrap, WrapItem } from "@chakra-ui/react";

export default function Profile() {
  const userName = useSelector((state: RootState) => state.realm.user.name);
  const dispatch = useDispatch();

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
