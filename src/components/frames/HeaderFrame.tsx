import { Heading } from "@chakra-ui/react";

type HeaderFrameProps = {
  title: string;
};

function HeaderFrame(props: HeaderFrameProps) {
  return (
    <Heading p={3} borderBottomWidth="1px">
      {props.title}
    </Heading>
  );
}

export default HeaderFrame;
