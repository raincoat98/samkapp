export type address = {
  address?: string;
  zip_code?: string;
};

export const addressSchema = {
  name: "address",
  embedded: true,
  properties: {
    address: "string?",
    zip_code: "string?",
  },
};
