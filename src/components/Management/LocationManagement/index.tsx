import Management from "../index";
import { locSchema } from "realmObjectModes";

export default function LocationManagement() {
  return <Management schema={locSchema} collectionName="loc" />;
}
