import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "store";
import { product, productSchema } from "realmObjectModes";
import PageContainer from "components/frames/PageContainer";
import TableComponent from "components/frames/TableComponent";
import { ButtonGroup, Button, Tabs, TabList, Tab } from "@chakra-ui/react";

export default function InventoryManagement() {
  const dispatch = useDispatch();

  const realmApp = useSelector((state: RootState) => state.realm.app);
  const [productNames, setProductNames] = React.useState<string[]>([]);
  const products = React.useRef<product[]>([]);
  const productCollection = useSelector((state: RootState) =>
    state.realm.database?.collection<product>("product")
  );

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
    data: products.current,
  });

  React.useEffect(() => {
    init();

    async function init() {
      dispatch({
        type: "system/openProgress",
      });

      if (productCollection) {
        await realmApp?.currentUser?.functions
          .get_product_names()
          .then((names: string[]) => {
            setProductNames(names);
          });

        await productCollection
          .find()
          .then((value) => {
            products.current = value;
            console.log("updated");
          })
          .finally(() => {
            console.log("watch start");
            watchStart(productCollection);

            dispatch({
              type: "system/closeProgress",
            });
          });
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function watchStart(
    collection: Realm.Services.MongoDB.MongoDBCollection<product>
  ) {
    for await (const changeEvent of collection.watch()) {
      console.log("changeEvent:", changeEvent);
      switch (changeEvent.operationType) {
        case "delete": {
          products.current = products.current.filter(
            (product) => !product._id.equals(changeEvent.documentKey._id)
          );
        }
      }
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
  );
}
