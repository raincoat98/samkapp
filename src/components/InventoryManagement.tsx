import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "store";
import { product, productSchema } from "realmObjectModes";
import { Row } from "react-table";
import { insert, update, distinct, schemaToColums } from "utils/realmUtils";
import PageContainer from "components/frames/PageContainer";
import TableComponent from "components/frames/TableComponent";
import FormModal from "components/frames/FormModal";
import {
  useDisclosure,
  ButtonGroup,
  Button,
  Tabs,
  TabList,
  Tab,
} from "@chakra-ui/react";

export default function InventoryManagement() {
  const dispatch = useDispatch();
  const modalDisclosure = useDisclosure();

  const realmApp = useSelector((state: RootState) => state.realm.app);
  const mongodb = realmApp?.currentUser?.mongoClient("mongodb-atlas");
  const productCollection = mongodb
    ?.db("database")
    ?.collection<product>("product");
  const productColumns = schemaToColums(productSchema);
  const productList = React.useRef<product[]>([]);
  const [productNames, setProductNames] = React.useState<string[]>([]);
  const [selectedProduct, setSelectedProduct] = React.useState<product>();
  const [modalMode, setModalMode] = React.useState("");

  // 테이블
  const mainTable = TableComponent({
    columns: productColumns,
    data: productList.current,
    onRowClick: editProduct,
  });

  React.useEffect(() => {
    init();

    async function init() {
      dispatch({
        type: "system/openProgress",
      });

      if (productCollection) {
        if (realmApp?.currentUser) {
          const value = await distinct({
            user: realmApp.currentUser,
            collectionName: "product",
            field: "name",
          });
          setProductNames(value.result);
        }

        await productCollection
          .find()
          .then((value) => {
            productList.current = value;
            console.log("updated");
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

  function addProduct() {
    setModalMode("insert");
    setSelectedProduct(undefined);
    modalDisclosure.onOpen();
  }

  function editProduct(props: { event: any; row: Row<{}> }) {
    setModalMode("update");
    setSelectedProduct(props.row.original as product);
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
            collectionName: "product",
            document,
          });
          break;
        }
        case "update": {
          await update({
            user: realmApp.currentUser,
            collectionName: "product",
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

  async function deleteSelected() {
    dispatch({
      type: "system/openProgress",
    });

    const selectedProductIds: any[] = [];
    const rowsById = mainTable.tableInstance.rowsById;
    // @ts-ignore
    const selectedRowIds = mainTable.tableInstance.state.selectedRowIds;

    for (const key in selectedRowIds) {
      // @ts-ignore
      selectedProductIds.push(rowsById[key].original._id);
    }

    await realmApp?.currentUser?.functions
      .delete_product_by_id(selectedProductIds)
      .then((result) => {
        if (result.succeed) {
          console.log(result);
        }
      });

    dispatch({
      type: "system/closeProgress",
    });
  }

  async function onTabChange(tab: number) {
    const name = productNames[--tab];
    if (name) {
      // @ts-ignore
      mainTable.tableInstance.setAllFilters([{ id: "name", value: name }]);
    } else {
      // @ts-ignore
      mainTable.tableInstance.setAllFilters([]);
    }
  }

  return (
    <PageContainer
      title={"재고 관리"}
      headerChildren={
        <ButtonGroup spacing="3">
          <Button variant="outline" colorScheme="red" onClick={deleteSelected}>
            삭제
          </Button>
          <Button onClick={addProduct} colorScheme="blue">
            추가
          </Button>
        </ButtonGroup>
      }
    >
      <FormModal
        schmea={productSchema}
        mode={modalMode}
        initialValue={selectedProduct}
        isOpen={modalDisclosure.isOpen}
        onChange={onChange}
        onClose={modalDisclosure.onClose}
        children={null}
      />
      <Tabs onChange={onTabChange} isFitted>
        <TabList>
          <Tab>{"전체"}</Tab>
          {productNames.map((name, index) => (
            <Tab key={index}>{name}</Tab>
          ))}
        </TabList>
      </Tabs>
      {mainTable.component}
    </PageContainer>
  );
}
