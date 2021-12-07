// express 모듈 호출
const express = require("express");
const app = express();
const api = require("./routes/index");
const admin = require("./routes/admin");
const transferIn = require("./routes/transferIn");
const transferOut = require("./routes/transferOut");
const workOrder = require("./routes/workOrder");
const group2 = require("./routes/group2");

// Cross-Origin Resource Sharing(CORS) 오류 해결을 위해 사용
const cors = require("cors");
app.use(cors());

// api 처리는 './routes/index'에서 일괄처리
app.use("/api", api);
app.use("/admin", admin);
app.use("/transfer-in", transferIn); // 입고
app.use("/transfer-out", transferOut); // 출고
app.use("/work-order", workOrder); // 작업지시
app.use("/group2", group2); // 품목 분류

// server port 3002 할당
// 클라이언트와 다른 번호로 충돌나지 않도록
const PORT = 3002;
app.listen(PORT, () => {
  console.log(`Server run : http://localhost:${PORT}/`);
});
