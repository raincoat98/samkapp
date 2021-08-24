import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "store";
import { product, productSchema } from "realmObjectModes";
import { Row } from "react-table";
import { schemaToColums } from "utils/realmUtils";
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
        await realmApp?.currentUser?.functions
          .action("get_names", { collectionName: "product" })
          .then((names: string[]) => {
            setProductNames(names);
          });

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

  async function onInsert(form: HTMLFormElement) {
    let doc: any = {};
    for (let index = 0; index < form.length; index++) {
      const input = form[index] as HTMLInputElement;
      const id = input.id;
      doc[id] = input.value;
    }

    dispatch({
      type: "system/openProgress",
    });

    const result = await realmApp?.currentUser?.functions.action("insert", {
      collectionName: "product",
      doc,
    });

    console.log(result);
    modalDisclosure.onClose();
    dispatch({
      type: "system/closeProgress",
    });
  }

  async function onUpdate(form: HTMLFormElement) {
    let doc: any = {};
    for (let index = 0; index < form.length; index++) {
      const input = form[index] as HTMLInputElement;
      const id = input.id;
      doc[id] = input.value;
    }

    dispatch({
      type: "system/openProgress",
    });

    const result = await realmApp?.currentUser?.functions.action("update", {
      collectionName: "product",
      doc,
      filter: { _id: doc._id },
    });

    console.log(result);
    modalDisclosure.onClose();
    dispatch({
      type: "system/closeProgress",
    });
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
        onInsert={onInsert}
        onUpdate={onUpdate}
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
