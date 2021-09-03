import Management from "../index";
import { partSchema } from "realmObjectModes";

export default function CustomerManagement() {
  return <Management schema={partSchema} collectionName="part" />;
}
