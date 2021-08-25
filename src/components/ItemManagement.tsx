import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "store";
import { item, itemSchema } from "realmObjectModes";
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
  const itemCollection = mongodb?.db("database")?.collection<item>("item");
  const itemColumns = schemaToColums(itemSchema);
  const [itemList, setItemList] = React.useState<item[]>([]);
  const itemBasicFilterList = [
    { name: "전체" },
    {
      name: "재고 없음",
      filter: {
        id: "stock",
        value: 0,
      },
    },
  ];
  const [itemNames, setItemNames] = React.useState<string[]>([]);
  const [selectedProduct, setSelectedProduct] = React.useState<item>();
  const [modalMode, setModalMode] = React.useState("");

  // 재고없음 필터에서 재고가 정확히 0일 때만 표시되도록
  for (let index = 0; index < itemColumns.length; index++) {
    if (itemColumns[index].accessor === "stock") {
      // @ts-ignore
      itemColumns[index].filter = "equals";
    }
  }

  // 테이블
  const mainTable = TableComponent({
    columns: itemColumns,
    data: itemList,
    onRowClick: editProduct,
  });

  React.useEffect(() => {
    init();

    async function init() {
      dispatch({
        type: "system/openProgress",
      });

      if (itemCollection) {
        if (realmApp?.currentUser) {
          const value = await distinct({
            user: realmApp.currentUser,
            collectionName: "item",
            field: "product_name",
          });
          setItemNames(value.result);
        }

        await itemCollection
          .find()
          .then((value) => {
            setItemList(value);
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
  React.useCallback((itemListValue: item[]) => {
    setItemList(itemListValue);
  }, []);

  function addProduct() {
    setModalMode("insert");
    setSelectedProduct(undefined);
    modalDisclosure.onOpen();
  }

  function editProduct(props: { event: any; row: Row<{}> }) {
    setModalMode("update");
    setSelectedProduct(props.row.original as item);
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
            collectionName: "item",
            document,
          });
          break;
        }
        case "update": {
          await update({
            useProgress: true,
            dispatch: dispatch,
            user: realmApp.currentUser,
            collectionName: "item",
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
      const selectedItemIdList: ObjectId[] = [];
      const rowsById = mainTable.tableInstance.rowsById;
      // @ts-ignore
      const selectedRowIds = mainTable.tableInstance.state.selectedRowIds;

      for (const key in selectedRowIds) {
        const doc = rowsById[key].original as item;
        selectedItemIdList.push(doc._id);
      }

      const filter = {
        _id: { $in: selectedItemIdList },
      };

      await deleteMany({
        useProgress: true,
        dispatch: dispatch,
        user: realmApp.currentUser,
        collectionName: "item",
        filter,
      });

      modalDisclosure.onClose();
    }
  }

  async function onTabChange(tab: number) {
    const name = itemNames[tab - itemBasicFilterList.length];
    if (name) {
      // @ts-ignore
      mainTable.tableInstance.setAllFilters([
        { id: "product_name", value: name },
      ]);
    } else {
      const filter = itemBasicFilterList[tab].filter;
      if (filter) {
        // @ts-ignore
        mainTable.tableInstance.setAllFilters([
          itemBasicFilterList[tab].filter,
        ]);
      } else {
        // @ts-ignore
        mainTable.tableInstance.setAllFilters([]);
      }
    }
  }

  return (
    <PageContainer
      title={"품목 관리"}
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
        schmea={itemSchema}
        mode={modalMode}
        initialValue={selectedProduct}
        isOpen={modalDisclosure.isOpen}
        onChange={onChange}
        onClose={modalDisclosure.onClose}
        children={null}
      />
      <Tabs onChange={onTabChange} isFitted>
        <TabList>
          {itemBasicFilterList.map((filter, index) => (
            <Tab key={index}>{filter.name}</Tab>
          ))}
          {itemNames.map((name, index) => (
            <Tab key={index}>{name}</Tab>
          ))}
        </TabList>
      </Tabs>
      {mainTable.component}
    </PageContainer>
  );
}
