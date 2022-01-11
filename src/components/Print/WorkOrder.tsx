import {
  Document,
  Font,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer,
} from "@react-pdf/renderer";
import moment from "moment";
import { RootState } from "store";
import { useSelector } from "react-redux";
import { work_order } from "schema/work_order";

Font.register({
  family: "Nanum Gothic",
  fonts: [
    {
      src: "https://fonts.gstatic.com/ea/nanumgothic/v5/NanumGothic-Regular.ttf",
      fontWeight: 400,
    },
    {
      src: "https://fonts.gstatic.com/ea/nanumgothic/v5/NanumGothic-Bold.ttf",
      fontWeight: 700,
    },
    {
      src: "https://fonts.gstatic.com/ea/nanumgothic/v5/NanumGothic-ExtraBold.ttf",
      fontWeight: 800,
    },
  ],
});

const styles = StyleSheet.create({
  // 페이지
  page: {
    padding: 10,
    fontFamily: "Nanum Gothic",
    fontSize: "16pt",
    fontWeight: "bold",
    color: "black",
    backgroundColor: "white",
  },
  // 페이지 면
  section: {
    display: "flex",
    width: "100%",
    height: "100%",
    flexDirection: "column",
    borderWidth: 2,
  },
  tableRow: {
    display: "flex",
    width: "100%",
    flexDirection: "row",
    textAlign: "center",
    justifyContent: "center",
  },
  tableHeader: {
    fontSize: "22pt",
    fontWeight: "extrabold",
    letterSpacing: 8,
  },
  cell: {
    padding: 10,
    border: 1,
  },
  cellTitle: {
    flex: 1,
    letterSpacing: 3,
  },
  cellContent: { flex: 3 },
});

export default function PrintWorkOrder(props: { data: work_order }) {
  const database = useSelector((state: RootState) => state.realm.database);

  const part = database.part.filter(
    (part) => part.part_id === props.data.part_id
  )[0];

  const partGroup = database.group2.filter(
    (group2) => group2.group2_id === part.group2_id
  )[0];

  const partUnit = database.unit.filter(
    (unit) => unit.unit_id === part.unit_id
  )[0];

  const partSpecNameList: string[] = [];
  if (partGroup.spec1) partSpecNameList.push(partGroup.spec1);
  if (partGroup.spec2) partSpecNameList.push(partGroup.spec2);
  if (partGroup.spec3) partSpecNameList.push(partGroup.spec3);
  if (partGroup.spec4) partSpecNameList.push(partGroup.spec4);
  if (partGroup.spec5) partSpecNameList.push(partGroup.spec5);

  const partSpecList = [
    part.spec1,
    part.spec2,
    part.spec3,
    part.spec4,
    part.spec5,
  ];

  return (
    <PDFViewer width="100%" height="100%">
      <Document title="작업지시서" author="샘터 재고관리 시스템">
        <Page size="A5" style={styles.page}>
          <View style={styles.section}>
            <View style={[styles.tableRow, { backgroundColor: "#ddd" }]}>
              <Text style={[styles.cell, styles.tableHeader, { flex: 1 }]}>
                작업지시서
              </Text>
            </View>

            <View style={[styles.tableRow]}>
              <Text style={[styles.cell, styles.cellContent, styles.cellTitle]}>
                주문일자
              </Text>
              <Text style={[styles.cell, styles.cellContent]}>
                {moment(props.data.transfer_date).format(
                  "YYYY년 MM월 DD일 (dddd)"
                )}
              </Text>
            </View>

            <View style={[styles.tableRow]}>
              <Text style={[styles.cell, styles.cellContent, styles.cellTitle]}>
                계획일자
              </Text>
              <Text style={[styles.cell, styles.cellContent]}>
                {props.data.plan_date
                  ? moment(props.data.plan_date).format(
                      "YYYY년 MM월 DD일 (dddd)"
                    )
                  : ""}
              </Text>
            </View>

            <View style={[styles.tableRow]}>
              <Text style={[styles.cell, styles.cellContent, styles.cellTitle]}>
                고객사
              </Text>
              <Text style={[styles.cell, styles.cellContent]}>
                {props.data.customer_id
                  ? database.customer.filter(
                      (customer) =>
                        customer.customer_id === props.data.customer_id
                    )[0]
                  : ""}
              </Text>
            </View>

            {/* 품목 정보 */}
            <View style={[{ backgroundColor: "yellow" }]}>
              <View style={[styles.tableRow]}>
                <Text
                  style={[styles.cell, styles.cellContent, styles.cellTitle]}
                >
                  품명
                </Text>
                <Text style={[styles.cell, styles.cellContent]}>
                  {part.part_name}
                </Text>
              </View>

              <View style={[{ textAlign: "center" }]}>
                <Text style={[styles.cell]}>규격</Text>

                <View
                  style={[
                    {
                      display: "flex",
                      flexDirection: "row",
                      fontSize: "14pt",
                    },
                  ]}
                >
                  {partSpecNameList.map((partSpecName, index) => (
                    <View
                      style={[
                        {
                          flex: 1,
                          display: "flex",
                          flexDirection: "column",
                        },
                      ]}
                      key={index}
                    >
                      <Text style={[styles.cell]}>{partSpecName}</Text>
                      <Text style={[styles.cell]}>{partSpecList[index]}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>

            <View style={[styles.tableRow]}>
              <Text style={[styles.cell, styles.cellContent, styles.cellTitle]}>
                수량
              </Text>
              <Text style={[styles.cell, styles.cellContent]}>
                {props.data.quantity} {partUnit.unit_name}
              </Text>
            </View>

            <View style={[styles.tableRow, { flex: 1 }]}>
              <Text style={[styles.cell, styles.cellContent, styles.cellTitle]}>
                비고
              </Text>
              <Text style={[styles.cell, styles.cellContent]}>
                {props.data.remark}
              </Text>
            </View>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
}
