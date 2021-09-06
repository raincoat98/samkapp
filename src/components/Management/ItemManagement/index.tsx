import Management from "../index";
import {
  partSchema,
  part_group_2Schema,
  part_group_1Schema,
} from "realmObjectModes";

export default function CustomerManagement() {
  return (
    <Management
      title="품목 관리"
      schema={partSchema}
      collectionName="part"
      filterList={[part_group_2Schema, part_group_1Schema]}
    />
  );
}
