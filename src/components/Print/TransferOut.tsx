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
import { transfer_out } from "schema/transfer_out";

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
    fontSize: "10pt",
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
    flex: 1,
    padding: 10,
    border: 1,
  },
  cellWithoutFlex: {
    width: 150,
    padding: 10,
    border: 1,
  },
  cellTitle: {
    flex: 1,
  },
  cellContent: { flex: 3 },

  // 조합용
  row: { flexDirection: "row" },
  column: { flexDirection: "column" },
});

export default function PrintTransferOut(props: { data: transfer_out }) {
  const data = props.data;

  const database = useSelector((state: RootState) => state.realm.database);

  const customer = database.customer.filter(
    (customer) => customer.customer_id === data.customer_id
  )[0];

  const part = database.part.filter((part) => part.part_id === data.part_id)[0];

  const partGroup = database.group2.filter(
    (group2) => group2.group2_id === part.group2_id
  )[0];

  function TableText(props: { children?: string }) {
    return <Text style={[styles.cell]}>{props.children}</Text>;
  }

  return (
    <PDFViewer width="100%" height="100%">
      <Document title="출고지시서" author="샘터 재고관리 시스템">
        <Page size="A5" style={styles.page} orientation="landscape">
          <View style={styles.section}>
            <View style={[styles.tableRow, { backgroundColor: "#ddd" }]}>
              <Text style={[styles.cell, styles.tableHeader, { flex: 1 }]}>
                출고지시서
              </Text>
            </View>

            <View style={[styles.tableRow]}>
              <Text style={[styles.cell]}>
                주문일 :{" "}
                {moment(data.transfer_date).format("YYYY년 MM월 DD일 (dddd)")}
              </Text>
              <Text style={[styles.cell]}>
                출고일 :{" "}
                {moment(data.plan_date).format("YYYY년 MM월 DD일 (dddd)")}
              </Text>
            </View>

            <View style={[styles.tableRow]}>
              <Text style={[styles.cellWithoutFlex]}>거래처</Text>
              <Text style={[styles.cell]}>{customer.customer_name}</Text>
            </View>

            <View style={[styles.tableRow]}>
              <Text style={[styles.cellWithoutFlex]}>품명</Text>

              {/* 규격 */}
              {partGroup.spec1 && <TableText>{partGroup.spec1}</TableText>}
              {partGroup.spec2 && <TableText>{partGroup.spec2}</TableText>}
              {partGroup.spec3 && <TableText>{partGroup.spec3}</TableText>}
              {partGroup.spec4 && <TableText>{partGroup.spec4}</TableText>}
              {partGroup.spec5 && <TableText>{partGroup.spec5}</TableText>}

              <Text style={[styles.cell, { flex: 0.5 }]}>수량</Text>

              <Text style={[styles.cell, { flex: 0.5 }]}>비고</Text>
            </View>

            <View style={[styles.tableRow]}>
              <Text style={[styles.cellWithoutFlex]}>{part.part_name}</Text>

              {/* 규격 */}
              {partGroup.spec1 && <TableText>{part.spec1}</TableText>}
              {partGroup.spec2 && <TableText>{part.spec2}</TableText>}
              {partGroup.spec3 && <TableText>{part.spec3}</TableText>}
              {partGroup.spec4 && <TableText>{part.spec4}</TableText>}
              {partGroup.spec5 && <TableText>{part.spec5}</TableText>}

              <Text style={[styles.cell, { flex: 0.5 }]}>{data.quantity}</Text>
              <Text style={[styles.cell, { flex: 0.5 }]}>{part.remark}</Text>
            </View>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
}
