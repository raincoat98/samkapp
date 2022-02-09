import { useHistory } from "react-router-dom";
import moment from "moment";
import { VStack, Button, Heading } from "@chakra-ui/react";
import PageContainer from "components/PageContainer";

export default function Admin() {
  const history = useHistory();

  return (
    <PageContainer title={"관리자 페이지"}>
      <VStack>
        <Heading as={"h3"} size={"lg"} textAlign="center">
          {moment(new Date()).format("YYYY년 MM월 DD일")}
        </Heading>
        <Button
          onClick={() => {
            history.push("/admin_page_production");
          }}
        >
          생산현황
        </Button>
        <Button
          onClick={() => {
            history.push("/admin_page_transfer_in");
          }}
        >
          입고현황
        </Button>
        <Button
          onClick={() => {
            history.push("/admin_page_transfer_out");
          }}
        >
          출고현황
        </Button>
        <Button
          onClick={() => {
            history.push("/admin_page_important_product");
          }}
        >
          주요품목
        </Button>
      </VStack>
    </PageContainer>
  );
}
