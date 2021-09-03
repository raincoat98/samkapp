import Management from "../index";
import { customerSchema } from "realmObjectModes";

export default function CustomerManagement() {
  return <Management schema={customerSchema} collectionName="customer" />;
}
