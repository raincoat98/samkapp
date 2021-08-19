import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "store";
import PageContainer from "components/frames/PageContainer";
import { ButtonGroup, Button } from "@chakra-ui/react";
import { DataGrid } from "@material-ui/data-grid";

export default function InventoryManagement() {
  const realmApp = useSelector((state: RootState) => state.realm.app);
  const [productTypes, setProductTypes] = React.useState<any[]>([]);
  const [products, setProducts] = React.useState<any[]>([]);
  const [selectedProducts, setSelectedProducts] = React.useState<any[]>([]);

  const mongodb = realmApp?.currentUser?.mongoClient("mongodb-atlas");
  const productTypeCollection = mongodb
    ?.db("database")
    .collection("product_type");
  const productCollection = mongodb?.db("database").collection("product");

  React.useEffect(() => {
    find();
    // watchStart();

    async function find() {
      console.log("find start");
      if (productTypeCollection)
        await setProductTypes(await productTypeCollection.find());
      if (productCollection) await setProducts(await productCollection.find());
    }

    // async function watchStart() {
    //   console.log("watch start");
    //   for await (const change of productCollectionWatcher) {
    //     console.log(change);
    //     switch (change.operationType) {
    //       case "insert": {
    //         const { documentKey, fullDocument } = change;
    //         console.log(`new document with _id: ${documentKey}`, fullDocument);
    //         break;
    //       }
    //       case "update": {
    //         const { documentKey, fullDocument } = change;
    //         console.log(`updated document: ${documentKey}`, fullDocument);
    //         break;
    //       }
    //       case "replace": {
    //         const { documentKey, fullDocument } = change;
    //         console.log(`replaced document: ${documentKey}`, fullDocument);
    //         break;
    //       }
    //       case "delete": {
    //         const { documentKey } = change;
    //         console.log(`deleted document: ${documentKey}`);
    //         break;
    //       }
    //     }
    //   }
    // }
  }, []);

  async function deleteSelected() {
    for (let i = 0; i < selectedProducts.length; i++) {
      realmApp?.currentUser?.functions
        .delete_product({ _id: selectedProducts[i] })
        .then((result) => console.log(result))
        .catch((err) => console.error(`Delete failed with error: ${err}`));
    }
  }

  function onSelectionModelChange(selected: any) {
    setSelectedProducts(selected);
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
      <DataGrid
        autoHeight={true}
        pagination
        checkboxSelection
        disableSelectionOnClick
        disableColumnSelector
        onSelectionModelChange={onSelectionModelChange}
        getRowId={(r) => r._id}
        rows={products}
        columns={[
          {
            headerName: "제품명",
            field: "name",
            flex: 1,
            headerAlign: "center",
            align: "center",
          },
          {
            headerName: "규격",
            field: "standard",
            flex: 1,
            headerAlign: "center",
            align: "center",
          },
          {
            headerName: "두께",
            field: "thickness",
            flex: 1,
            headerAlign: "center",
            align: "center",
          },
          {
            headerName: "폭",
            field: "width",
            flex: 1,
            headerAlign: "center",
          },
          {
            headerName: "현재고",
            field: "stock",
            flex: 1,
            headerAlign: "center",
            align: "center",
            type: "number",
          },
          {
            headerName: "비고",
            field: "note",
            flex: 1,
            headerAlign: "center",
            align: "center",
          },
        ]}
      />
    </PageContainer>
  );
}
