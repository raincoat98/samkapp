import { partSchema } from "realmObjectModes";
import ManagementComponent from "components/base/ManagementComponent";

export default function ItemManagement() {
  return (
    <ManagementComponent
      title="품목 관리"
      collectionName="part"
      schema={partSchema}
    />
  );
}
