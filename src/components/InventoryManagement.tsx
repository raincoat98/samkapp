import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "store";
import PageContainer from "components/frames/PageContainer";
import TableComponent from "components/frames/TableComponent";
import {
  ButtonGroup,
  Button,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";

export default function InventoryManagement() {
  const [isAllLoaded, setIsAllLoaded] = React.useState(false);

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
    try {
      if (!isAllLoaded) init();
    } catch (error) {}
    async function init() {
      if (productTypeCollection)
        await setProductTypes(await productTypeCollection.find());
      if (productCollection) {
        await setProducts(await productCollection.find());
      }
      setIsAllLoaded(true);
      console.log("updated");
    }
  }, [isAllLoaded, productCollection, productTypeCollection]);

  async function deleteAll() {
    // realmApp?.currentUser?.functions.delete_product({ name: "조판지" });
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
      <Tabs isFitted>
        <TabList>
          <Tab>{"전체"}</Tab>
          {productTypes.map((type, index) => (
            <Tab key={index}>{type.name}</Tab>
          ))}
        </TabList>
        <TabPanels>
          <TabPanel p={0}>{mainTable.component}</TabPanel>
        </TabPanels>
      </Tabs>
    </PageContainer>
  );
}
