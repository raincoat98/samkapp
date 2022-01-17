import { remark } from "./common";
const work_order = {
  name: "작업 지시",
  properties: {
    work_order_id: "작업지시코드",
    work_order_number: "작업지시번호",
    customer_id: "거래처",
    part_id: "품목",
    quantity: "계획수량",
    transfer_type_id: "작업 형태",
    transfer_date: "주문일자",
    plan_date: "계획일자",
    priorities: "우선순위",
    status: "작업상태",
    remark,
  },
};
export default work_order;
