import { RootState } from "../../store";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import PageContainer from "../frames/PageContainer";
import TableComponent from "../frames/TableComponent";
import faker from "faker";

export default function ToolManage() {
  let { id } = useParams<{
    id: string;
  }>();
  let pageName = "";

  const workState = useSelector((state: RootState) => state.work);
  const columnsList = useSelector((state: RootState) => state.work.columnsList);

  let data;
  let columns;

  switch (id) {
    case "wooden":
      pageName = "목형 관리";
      data = workState.woodenList;
      columns = columnsList.wooden;
      if (!data.length) {
        data = Array(53)
          .fill(undefined)
          .map(() => ({
            name: faker.random.words(),
            size: Math.random().toFixed(2).split(".")[1],
            description: faker.lorem.words(),
            thickness: Math.random().toFixed(2) + "mm",
          }));
      }
      break;
    case "stash":
      pageName = "적치대 관리";
      data = workState.stashList;
      columns = columnsList.stash;
      break;
    case "typesetting_paper":
      pageName = "조판지 관리";
      data = workState.typesettingPaperList;
      columns = columnsList.typesettingPaper;
      break;
    case "typesetting_paper_hanger":
      pageName = "조판지걸이 관리";
      data = workState.typesettingPaperHangerList;
      columns = columnsList.typesettingPaperHanger;
      break;
    default:
      throw new Error("잘못된 접근입니다.");
  }

  return (
    <PageContainer title={pageName}>
      <TableComponent columns={columns} data={data} />
    </PageContainer>
  );
}
