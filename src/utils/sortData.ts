const sortData: Record<string, Record<string, number>> = {
  customer: {
    address: 1,
    zip_code: 2,
  },
  part: {
    _id: 0,
    part_group_2_id: 3,
    part_name: 1,
    part_type_id: 2,
    remark: 6,
    unit: 4,
    warehouse_id: 5,
  },
  part_price: {
    purchase_price: 1,
    os_price: 2,
    selling_price: 3,
    apply_start: 4,
    apply_end: 5,
  },
};

export default sortData;
