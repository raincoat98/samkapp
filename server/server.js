// express 모듈 호출
const express = require("express");
const app = express();
const api = require("./routes/index");
const admin = require("./routes/admin");
const billOfMaterials = require("./routes/billOfMaterials");
const customer = require("./routes/customer");
const group2 = require("./routes/group2");
const inventory = require("./routes/inventory");
const listPrice = require("./routes/listPrice");
const part = require("./routes/part");
const partType = require("./routes/partType");
const productOrder = require("./routes/productOrder");
const transferIn = require("./routes/transferIn");
const transferOut = require("./routes/transferOut");
const transferType = require("./routes/transferType");
const unit = require("./routes/unit");
const user = require("./routes/user");
const warehouse = require("./routes/warehouse");
const workOrder = require("./routes/workOrder");

// Cross-Origin Resource Sharing(CORS) 오류 해결을 위해 사용
const cors = require("cors");
app.use(cors());

// api 처리는 './routes/index'에서 일괄처리
app.use("/api", api);
app.use("/admin", admin);
app.use("/bill-of-materials", billOfMaterials); // BOM
app.use("/customer", customer); // 거래처
app.use("/group2", group2); // 품목 분류
app.use("/inventory", inventory); // 재고
app.use("/list-price", listPrice); // 품목 가격
app.use("/part", part); // 품목
app.use("/part-type", partType); // 품목 형태
app.use("/product-order", productOrder); // 품목 형태
app.use("/transfer-in", transferIn); // 입고
app.use("/transfer-out", transferOut); // 출고
app.use("/transfer-type", transferType); // 출고
app.use("/unit", unit); // 품목 가격
app.use("/user", user); // 계정 정보 및 로그인
app.use("/warehouse", warehouse); // 창고
app.use("/work-order", workOrder); // 작업지시

// server port 3002 할당
// 클라이언트와 다른 번호로 충돌나지 않도록
const PORT = 3002;
app.listen(PORT, () => {
  console.log(`Server run : http://localhost:${PORT}/`);
});
