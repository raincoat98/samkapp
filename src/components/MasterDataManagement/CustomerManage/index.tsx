import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "store";
import { customer, customerSchema } from "realmObjectModes";
import { Row } from "react-table";
import { insert, update, schemaToColums } from "utils/realmUtils";
import PageContainer from "components/frames/PageContainer";
import TableComponent from "components/frames/TableComponent";
import FormModal from "components/frames/FormModal";
import {
  useDisclosure,
  Box,
  ButtonGroup,
  Button,
  Flex,
} from "@chakra-ui/react";
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
  const [customerList, setCustomerList] = React.useState<customer[]>([]);
  const [selectedCustomer, setSelectedCustomer] = React.useState<customer>();
  const [modalMode, setModalMode] = React.useState("insert");

  const mainTable = TableComponent({
    columns: customerColumns,
    data: customerList,
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
            setCustomerList(value);
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

  // 테이블 데이터 세팅
  React.useCallback((customerListValue: customer[]) => {
    setCustomerList(customerListValue);
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

      switch (type) {
        case "insert": {
          await insert({
            useProgress: true,
            dispatch: dispatch,
            user: realmApp.currentUser,
            collectionName: "customer",
            document,
          });
          break;
        }
        case "update": {
          await update({
            useProgress: true,
            dispatch: dispatch,
            user: realmApp.currentUser,
            collectionName: "customer",
            filter: { _id: initialValue._id },
            update: { $set: document },
          });
          break;
        }
      }

      modalDisclosure.onClose();
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
      <Flex direction="column" width="100%" height="100%">
        <Box p={3}>{mainTable.component.search}</Box>
        <Box width="100%" overflow="auto">
          {mainTable.component.table}
        </Box>
        <Box p={3}>{mainTable.component.pagination}</Box>
      </Flex>

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
