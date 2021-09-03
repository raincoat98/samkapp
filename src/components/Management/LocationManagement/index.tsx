import Management from "../index";
import { locSchema } from "realmObjectModes";

export default function LocationManagement() {
  return (
    <Management title="위치 관리" schema={locSchema} collectionName="loc" />
  );
}
