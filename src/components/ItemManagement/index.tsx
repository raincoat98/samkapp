import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "store";
import { getCollection, find } from "utils/realmUtils";

import { partSchema } from "realmObjectModes";
import ManagementComponent from "components/base/ManagementComponent";

export default function ItemManagement() {
  const collectionName = "part";
  const dispatch = useDispatch();
  const database = useSelector((state: RootState) => state.database);
  const realmApp = useSelector((state: RootState) => state.realm.app);
  const collection = getCollection({ app: realmApp, collectionName });

  React.useEffect(() => {
    init();

    async function init() {
      if (collection) {
        const result = await find({ collection });
        dispatch({
          type: "database/setData",
          payload: {
            key: collectionName,
            data: result,
          },
        });
      }
    }
  }, []);

  return (
    <ManagementComponent
      tableData={database[collectionName] ?? []}
      schema={partSchema}
    />
  );
}
