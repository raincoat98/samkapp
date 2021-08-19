import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "store";
import PageContainer from "components/frames/PageContainer";
import TableComponent from "components/frames/TableComponent";
import { ButtonGroup, Button, Tabs, TabList, Tab } from "@chakra-ui/react";

export default function InventoryManagement() {
  const realmApp = useSelector((state: RootState) => state.realm.app);
  const [productTypes, setProductTypes] = React.useState<any[]>([]);
  const [products, setProducts] = React.useState<any[]>([]);

  const mongodb = realmApp?.currentUser?.mongoClient("mongodb-atlas");
  const productTypeCollection = mongodb
    ?.db("database")
    .collection("product_type");
  const productCollection = mongodb?.db("database").collection("product");

  // 테이블
  const mainTable = TableComponent({
    columns: [
      {
        Header: "제품명",
        accessor: "name",
      },
      {
        Header: "규격",
        accessor: "standard",
      },
      {
        Header: "두께",
        accessor: "thickness",
      },
      {
        Header: "폭",
        accessor: "width",
      },
      {
        Header: "현재고",
        accessor: "stock",
      },
      {
        Header: "비고",
        accessor: "note",
      },
    ],
    data: products,
  });

  React.useEffect(() => {
    init();

    async function init() {
      if (productTypeCollection)
        await setProductTypes(await productTypeCollection.find());
      if (productCollection) await setProducts(await productCollection.find());
      console.log("updated");
    }
  }, []);

  async function deleteAll() {
    // realmApp?.currentUser?.functions.delete_product({ name: "조판지" });
  }

  async function onTabChange(tab: number) {
    const type = productTypes[--tab];
    if (type) {
      // @ts-ignore
      mainTable.tableInstance.setAllFilters([{ id: "name", value: type.name }]);
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
          <Button variant="outline" colorScheme="red" onClick={deleteAll}>
            삭제
          </Button>
        </ButtonGroup>
      }
    >
      <Tabs onChange={onTabChange} isFitted>
        <TabList>
          <Tab>{"전체"}</Tab>
          {productTypes.map((type, index) => (
            <Tab key={index}>{type.name}</Tab>
          ))}
        </TabList>
      </Tabs>
      {mainTable.component}
    </PageContainer>
  );
}
