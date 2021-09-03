import Management from "../index";
import { partSchema } from "realmObjectModes";

export default function CustomerManagement() {
  return (
    <Management title="품목 관리" schema={partSchema} collectionName="part" />
  );
}
