import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "store";
import { customer, customerSchema } from "realmObjectModes";
import { Row } from "react-table";
import { insert, update, schemaToColums } from "utils/realmUtils";
import PageContainer from "components/frames/PageContainer";
import TableComponent from "components/frames/TableComponent";
import FormModal from "components/frames/FormModal";
import { useDisclosure, ButtonGroup, Button } from "@chakra-ui/react";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";

export default function CustomerManage() {
  const dispatch = useDispatch();
  const modalDisclosure = useDisclosure();

  const realmApp = useSelector((state: RootState) => state.realm.app);
  const mongodb = realmApp?.currentUser?.mongoClient("mongodb-atlas");
  const customerCollection = mongodb
    ?.db("database")
    ?.collection<customer>("customer");
  const customerColumns = schemaToColums(customerSchema);
  const customerList = React.useRef<customer[]>([]);
  const [selectedCustomer, setSelectedCustomer] = React.useState<customer>();
  const [modalMode, setModalMode] = React.useState("insert");

  const CustomerTable = TableComponent({
    columns: customerColumns,
    data: customerList.current,
    onRowClick: editCustomer,
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

  function editCustomer(props: { event: any; row: Row<{}> }) {
    setModalMode("update");
    setSelectedCustomer(props.row.original as customer);
    modalDisclosure.onOpen();
  }

  function addCustomer() {
    setModalMode("insert");
    setSelectedCustomer(undefined);
    modalDisclosure.onOpen();
  }

  async function onChange(props: {
    type: string;
    document: Record<string, any>;
    initialValue: Record<string, any>;
  }) {
    if (realmApp?.currentUser) {
      const { type, document, initialValue } = props;

      dispatch({
        type: "system/openProgress",
      });

      switch (type) {
        case "insert": {
          await insert({
            user: realmApp.currentUser,
            collectionName: "customer",
            document,
          });
          break;
        }
        case "update": {
          await update({
            user: realmApp.currentUser,
            collectionName: "customer",
            filter: { _id: initialValue._id },
            update: { $set: document },
          });
          break;
        }
      }

      modalDisclosure.onClose();
      dispatch({
        type: "system/closeProgress",
      });
    }
  }

  return (
    <PageContainer
      title={"고객관리"}
      headerChildren={
        <ButtonGroup spacing="3">
          <Menu>
            <MenuButton as={Button}>업로드</MenuButton>
            <MenuList position="sticky" zIndex="dropdown">
              <MenuItem>엑셀 파일에서 업로드</MenuItem>
            </MenuList>
          </Menu>
          <Button onClick={addCustomer} colorScheme="blue">
            추가
          </Button>
        </ButtonGroup>
      }
    >
      {CustomerTable.component}

      {/* 추가 폼 */}
      <FormModal
        schmea={customerSchema}
        mode={modalMode}
        initialValue={selectedCustomer}
        isOpen={modalDisclosure.isOpen}
        onClose={modalDisclosure.onClose}
        onChange={onChange}
        children={null}
      />
    </PageContainer>
  );
}
