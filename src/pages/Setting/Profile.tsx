import { useSelector, useDispatch } from "react-redux";
import { RootState } from "store";
import { logout } from "store/realm";
import { user } from "utils/icons";
import {
  Icon,
  Heading,
  Text,
  Button,
  Wrap,
  WrapItem,
  VStack,
  Flex,
} from "@chakra-ui/react";

export default function Profile() {
  const userInfo = useSelector((state: RootState) => state.realm.user);
  const dispatch = useDispatch();

  return (
    <Wrap align="center" spacing={3}>
      <WrapItem>
        <Icon
          as={user}
          boxSize="64px"
          borderRadius="full"
          overflow="hidden"
          padding="3"
          bgColor="white"
          color="black"
        />
      </WrapItem>

      <WrapItem>
        <Flex flexDir={"column"}>
          <Heading as={"h4"} size={"md"}>
            {userInfo.name}
          </Heading>
          <Text>@{userInfo.user_id}</Text>
        </Flex>
      </WrapItem>

      <WrapItem>
        <Button onClick={() => dispatch(logout())}>로그아웃</Button>
      </WrapItem>
    </Wrap>
  );
}
