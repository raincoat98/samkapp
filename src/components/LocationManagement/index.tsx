import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "store";
import {
  getCollection,
  find,
  insert,
  update,
  deleteMany,
} from "utils/realmUtils";
import { locSchema } from "realmObjectModes";
import PageContainer from "components/base/PageContainer";
import ManagementComponent from "components/base/ManagementComponent";
import FormModal from "components/base/FormModal";
import { Row } from "react-table";
import { useDisclosure } from "@chakra-ui/react";
import {
  BaseButtonGroups,
  DeleteButton,
  AddButton,
} from "components/base/Buttons";
import { ObjectId } from "bson";

export default function LocationManagement() {
  // 폼 모달 상태 관리
  const modalDisclosure = useDisclosure();
  const collectionName = "loc";
  const dispatch = useDispatch();
  const database = useSelector((state: RootState) => state.database);
  const realmApp = useSelector((state: RootState) => state.realm.app);
  const collection = getCollection({ app: realmApp, collectionName });

  // 체크한 테이블 열이 존재하는지 확인
  const [checkedRows, setCheckedRows] = React.useState<any[]>([]);
  const [isExistCheckedRow, setIsExistCheckedRow] = React.useState(false);
  // 현재 수정중인 데이터
  const [selected, setSelected] = React.useState<any>();
  // 폼모달 모드
  const [modalMode, setModalMode] = React.useState("");

  const tableData: any[] = database[collectionName] ?? [];

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 데이터베이스에 데이터 insert 준비
  function prepareInsert() {
    setModalMode("insert");
    setSelected(undefined);
    modalDisclosure.onOpen();
  }

  // 데이터베이스에 데이터 update 준비
  function onTableRowClick(props: { event: any; row: Row<{}> }) {
    setModalMode("update");
    setSelected(props.row.original as any);
    modalDisclosure.onOpen();
  }

  async function onFormModalChange(props: {
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
            collectionName,
            document,
          });
          break;
        }
        case "update": {
          await update({
            useProgress: true,
            dispatch: dispatch,
            user: realmApp.currentUser,
            collectionName,
            filter: { _id: initialValue._id },
            update: { $set: document },
          });
          break;
        }
      }

      modalDisclosure.onClose();
    }
  }

  // 데이터베이스에 체크한 열 제거 요청
  async function deleteSelected() {
    if (realmApp?.currentUser) {
      const filter = {
        _id: { $in: checkedRows },
      };

      await deleteMany({
        useProgress: true,
        dispatch: dispatch,
        user: realmApp.currentUser,
        collectionName,
        filter,
      });
    }
  }

  const onTableChange = React.useCallback(
    (props: { table: any; state: any; action: { type: string } }) => {
      const { table, state } = props;

      if (table) {
        const selectedRowIds = state.selectedRowIds;

        // 체크되어있는 열이 있는지 판단
        setIsExistCheckedRow(Object.keys(selectedRowIds).length !== 0);

        const selectedItemIdList: ObjectId[] = [];
        const rowsById = table.rowsById;

        for (const key in selectedRowIds) {
          const doc = rowsById[key].original as any;
          selectedItemIdList.push(doc._id);
        }

        setCheckedRows(selectedItemIdList);
      }
    },
    []
  );

  return (
    <>
      <FormModal
        schmea={locSchema}
        mode={modalMode}
        initialValue={selected}
        isOpen={modalDisclosure.isOpen}
        onChange={onFormModalChange}
        onClose={modalDisclosure.onClose}
        children={null}
      />

      <PageContainer
        title={"위치 관리"}
        headerChildren={
          <BaseButtonGroups>
            <DeleteButton
              isDisabled={!isExistCheckedRow}
              onClick={deleteSelected}
              title="선택한 항목을 삭제합니다."
            />
            <AddButton onClick={prepareInsert} />
          </BaseButtonGroups>
        }
      >
        <ManagementComponent
          tableData={tableData}
          schema={locSchema}
          onRowClick={onTableRowClick}
          onChange={onTableChange}
        />
      </PageContainer>
    </>
  );
}
