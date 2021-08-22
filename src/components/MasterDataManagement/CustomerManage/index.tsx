import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "store";
import { customer, customerSchema } from "realmObjectModes";
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
  const customerList = React.useRef<customer[]>([]);
  const customerColumns: any[] = [];

  // for (const key in customerSchema.properties) {
  //   console.log(key);

  //   customerColumns.push({
  //     Header: key,
  //     accessor: key,
  //   });
  // }

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

        await customerCollection.find().then((value) => {
          console.log("customer", value);
          customerList.current = value;
        });

        console.log(customerList.current);

        dispatch({
          type: "system/closeProgress",
        });
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function addCustomer() {
    drawerDisclosure.onClose();
  }

  function uploadCustomer() {
    //   customerCollection
    //     .insertMany(customerJson)
    //     .then((result) => {
    //       console.log(
    //         `Successfully inserted ${result.insertedIds.length} items!`
    //       );
    //       return result;
    //     })
    //     .catch((err) => console.error(`Failed to insert documents: ${err}`));
    // }
  }

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
