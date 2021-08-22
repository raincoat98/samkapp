import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "store";
import { customer } from "realmObjectModes";
import PageContainer from "components/frames/PageContainer";
import TableComponent from "components/frames/TableComponent";
import CustomerManageDrawer from "./CustomerManageDrawer";
import { useDisclosure, ButtonGroup, Button } from "@chakra-ui/react";

export default function CustomerManage() {
  const dispatch = useDispatch();
  const drawerDisclosure = useDisclosure();

  const realmApp = useSelector((state: RootState) => state.realm.app);
  const mongodb = realmApp?.currentUser?.mongoClient("mongodb-atlas");
  const customerCollection = mongodb
    ?.db("database")
    ?.collection<customer>("customer");
  const customerColumns = [
    {
      Header: "성함",
      accessor: "name",
    },
    {
      Header: "직급",
      accessor: "rank",
    },
    {
      Header: "이메일",
      accessor: "email",
    },
    {
      Header: "회사명",
      accessor: "companyName",
    },
    {
      Header: "회사 전화 번호",
      accessor: "companyPhone",
    },
    {
      Header: "회사 팩스 번호",
      accessor: "companyFax",
    },
    {
      Header: "비고",
      accessor: "note",
    },
  ];
  const customerList = React.useRef<customer[]>([]);

  const CustomerTable = TableComponent({
    columns: customerColumns,
    data: customerList.current,
  });

  React.useEffect(() => {
    init();

    async function init() {
      if (customerCollection) {
        dispatch({
          type: "system/openProgress",
        });

        await customerCollection
          .find()
          .then((value) => {
            customerList.current = value;
          })
          .finally(() => {
            dispatch({
              type: "system/closeProgress",
            });
          });
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function addCustomer() {
    drawerDisclosure.onClose();
  }

  function uploadCustomer() {}

  return (
    <PageContainer
      title={"고객관리"}
      headerChildren={
        <ButtonGroup spacing="3">
          <Button onClick={uploadCustomer} colorScheme="blue">
            업로드
          </Button>
          <Button onClick={drawerDisclosure.onOpen} colorScheme="blue">
            추가
          </Button>
        </ButtonGroup>
      }
    >
      {CustomerTable.component}

      {/* 추가 폼 */}
      <CustomerManageDrawer
        isOpen={drawerDisclosure.isOpen}
        onClose={drawerDisclosure.onClose}
        onSubmit={addCustomer}
      />
    </PageContainer>
  );
}
