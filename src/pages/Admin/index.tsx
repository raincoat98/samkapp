import { useHistory } from "react-router-dom";
import moment from "moment";
import { Button, Heading, Flex } from "@chakra-ui/react";
import PageContainer from "components/PageContainer";

export default function Admin() {
  const history = useHistory();

  return (
    <PageContainer title={"관리자"}>
      <Flex height="100%" padding={3} flexDir={"column"}>
        <Heading as={"h3"} size={"lg"} marginY={3} textAlign="center">
          {moment(new Date()).format("YYYY년 MM월 DD일")}
        </Heading>
        <Button
          onClick={() => {
            history.push("/admin_page_production");
          }}
          flex="1"
          size="lg"
        >
          생산현황
        </Button>
        <Button
          onClick={() => {
            history.push("/admin_page_transfer_in");
          }}
          flex="1"
          size="lg"
        >
          입고현황
        </Button>
        <Button
          onClick={() => {
            history.push("/admin_page_transfer_out");
          }}
          flex="1"
          size="lg"
        >
          출고현황
        </Button>
        <Button
          onClick={() => {
            history.push("/admin_page_important_product");
          }}
          flex="1"
          size="lg"
        >
          주요품목
        </Button>
      </Flex>
    </PageContainer>
  );
}
