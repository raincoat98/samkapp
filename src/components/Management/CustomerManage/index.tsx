import Management from "../index";
import { customerSchema } from "realmObjectModes";

export default function CustomerManagement() {
  return (
    <Management
      title="고객 관리"
      schema={customerSchema}
      collectionName="customer"
    />
  );
}
