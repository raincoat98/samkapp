import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "store";
import PageContainer from "components/frames/PageContainer";
import TableComponent from "components/frames/TableComponent";
import SpinnerComponent from "components/frames/SpinnerComponent";
import {
  useDisclosure,
  ButtonGroup,
  Button,
  Tabs,
  TabList,
  Tab,
} from "@chakra-ui/react";

export default function InventoryManagement() {
  const spinnerDisclosure = useDisclosure();

  const realmApp = useSelector((state: RootState) => state.realm.app);
  const [productNames, setProductNames] = React.useState<string[]>([]);
  const [products, setProducts] = React.useState<any[]>([]);

  const mongodb = realmApp?.currentUser?.mongoClient("mongodb-atlas");
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
      spinnerDisclosure.onOpen();

      if (productCollection) {
        await realmApp?.currentUser?.functions
          .get_product_names()
          .then((names: string[]) => {
            setProductNames(names);
          });
        await setProducts(await productCollection.find());
      }
      console.log("updated");

      spinnerDisclosure.onClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function deleteSelected() {
    spinnerDisclosure.onOpen();

    const selectedProductIds: string[] = [];
    const rowsById = mainTable.tableInstance.rowsById;
    // @ts-ignore
    const selectedRowIds = mainTable.tableInstance.state.selectedRowIds;

    for (const key in selectedRowIds) {
      // @ts-ignore
      selectedProductIds.push(rowsById[key].original._id);
    }

    for (let i = 0; i < selectedProductIds.length; i++) {
      await realmApp?.currentUser?.functions
        .delete_product({ _id: selectedProductIds[i] })
        .then((result) => {
          console.log(result);
        });
    }
    spinnerDisclosure.onClose();
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
    <>
      <SpinnerComponent isOpen={spinnerDisclosure.isOpen} />
      <PageContainer
        title={"재고 관리"}
        headerChildren={
          <ButtonGroup spacing="3">
            <Button
              variant="outline"
              colorScheme="red"
              onClick={deleteSelected}
            >
              삭제
            </Button>
          </ButtonGroup>
        }
      >
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
    </>
  );
}
