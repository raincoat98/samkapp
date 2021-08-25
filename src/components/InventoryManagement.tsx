import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "store";
import { product, productSchema } from "realmObjectModes";
import { Row } from "react-table";
import {
  insert,
  update,
  distinct,
  schemaToColums,
  deleteMany,
} from "utils/realmUtils";
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
import { ObjectId } from "bson";

export default function InventoryManagement() {
  const dispatch = useDispatch();
  const modalDisclosure = useDisclosure();

  const realmApp = useSelector((state: RootState) => state.realm.app);
  const mongodb = realmApp?.currentUser?.mongoClient("mongodb-atlas");
  const productCollection = mongodb
    ?.db("database")
    ?.collection<product>("product");
  const productColumns = schemaToColums(productSchema);
  const [productList, setProductList] = React.useState<product[]>([]);
  const productBasicFilterList = [
    { name: "전체" },
    {
      name: "재고 없음",
      filter: {
        id: "stock",
        value: 0,
      },
    },
  ];
  const [productNames, setProductNames] = React.useState<string[]>([]);
  const [selectedProduct, setSelectedProduct] = React.useState<product>();
  const [modalMode, setModalMode] = React.useState("");

  // 재고없음 필터에서 재고가 정확히 0일 때만 표시되도록
  for (let index = 0; index < productColumns.length; index++) {
    if (productColumns[index].accessor === "stock") {
      // @ts-ignore
      productColumns[index].filter = "equals";
    }
  }

  // 테이블
  const mainTable = TableComponent({
    columns: productColumns,
    data: productList,
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
            field: "product_name",
          });
          setProductNames(value.result);
        }

        await productCollection
          .find()
          .then((value) => {
            setProductList(value);
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
  React.useCallback((productListValue: product[]) => {
    setProductList(productListValue);
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

      switch (type) {
        case "insert": {
          await insert({
            useProgress: true,
            dispatch: dispatch,
            user: realmApp.currentUser,
            collectionName: "product",
            document,
          });
          break;
        }
        case "update": {
          await update({
            useProgress: true,
            dispatch: dispatch,
            user: realmApp.currentUser,
            collectionName: "product",
            filter: { _id: initialValue._id },
            update: { $set: document },
          });
          break;
        }
      }

      modalDisclosure.onClose();
    }
  }

  async function deleteSelected() {
    if (realmApp?.currentUser) {
      const selectedProductIdList: ObjectId[] = [];
      const rowsById = mainTable.tableInstance.rowsById;
      // @ts-ignore
      const selectedRowIds = mainTable.tableInstance.state.selectedRowIds;

      for (const key in selectedRowIds) {
        const doc = rowsById[key].original as product;
        selectedProductIdList.push(doc._id);
      }

      const filter = {
        _id: { $in: selectedProductIdList },
      };

      await deleteMany({
        useProgress: true,
        dispatch: dispatch,
        user: realmApp.currentUser,
        collectionName: "product",
        filter,
      });

      modalDisclosure.onClose();
    }
  }

  async function onTabChange(tab: number) {
    const name = productNames[tab - productBasicFilterList.length];
    if (name) {
      // @ts-ignore
      mainTable.tableInstance.setAllFilters([
        { id: "product_name", value: name },
      ]);
    } else {
      const filter = productBasicFilterList[tab].filter;
      if (filter) {
        // @ts-ignore
        mainTable.tableInstance.setAllFilters([
          productBasicFilterList[tab].filter,
        ]);
      } else {
        // @ts-ignore
        mainTable.tableInstance.setAllFilters([]);
      }
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
          {productBasicFilterList.map((filter, index) => (
            <Tab key={index}>{filter.name}</Tab>
          ))}
          {productNames.map((name, index) => (
            <Tab key={index}>{name}</Tab>
          ))}
        </TabList>
      </Tabs>
      {mainTable.component}
    </PageContainer>
  );
}
