import React from "react";
import { useDispatch } from "react-redux";
import {
  FormControl,
  FormLabel,
  Input,
  ButtonGroup,
  Button,
  Flex,
  Spacer,
} from "@chakra-ui/react";

type WorkOrderWriteProps = {
  onSubmit: Function;
};

export default function WorkOrderWrite(props: WorkOrderWriteProps) {
  const dispatch = useDispatch();

  // state 생성
  const [companyName, setCompanyName] = React.useState("");
  const [productName, setProductName] = React.useState("");
  const [productColor, setProductColor] = React.useState("");
  const [productType, setProductType] = React.useState("");
  const [quantity, setQuantity] = React.useState("");
  const [dueDate, setDueDate] = React.useState("");

  const formId = {
    companyName: "companyName",
    productName: "productName",
    productColor: "productColor",
    productType: "productType",
    quantity: "quantity",
    dueDate: "dueDate",
  };

  const formName = {
    companyName: "거래처",
    productName: "품명",
    productColor: "색상",
    productType: "지종",
    quantity: "수량",
    dueDate: "납기일",
  };

  // 값이 바뀌었을 때 state 저장 및 input의 value 변경
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const targetId = event.target.dataset.id;
    switch (targetId) {
      case formId.companyName:
        setCompanyName(event.target.value);
        break;
      case formId.productName:
        setProductName(event.target.value);
        break;
      case formId.productColor:
        setProductColor(event.target.value);
        break;
      case formId.productType:
        setProductType(event.target.value);
        break;
      case formId.quantity:
        setQuantity(event.target.value);
        break;
      case formId.dueDate:
        setDueDate(event.target.value);
        break;
    }
  };

  // 전송했을 때
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch({
      type: "work-order/addWorkOrder",
      payload: {
        companyName,
        productName,
        productColor,
        productType,
        quantity,
        dueDate,
      },
    });
    props.onSubmit();
  };

  //  Form 초기화할 때
  const onReset = (event: React.FormEvent<HTMLFormElement>) => {
    setCompanyName("");
    setProductName("");
    setProductColor("");
    setProductType("");
    setQuantity("");
    setDueDate("");
  };

  function createWorkOrderForm(
    id: keyof typeof formId,
    value: any,
    inputType: string,
    isRequired: boolean
  ) {
    return (
      <FormControl isRequired={isRequired}>
        <FormLabel>{formName[id]}</FormLabel>
        <Input
          type={inputType}
          placeholder={formName[id]}
          data-id={id}
          value={value}
          onChange={onChange}
        />
      </FormControl>
    );
  }

  return (
    <form onSubmit={onSubmit} onReset={onReset}>
      {createWorkOrderForm("companyName", companyName, "text", true)}
      {createWorkOrderForm("productName", productName, "text", true)}
      {createWorkOrderForm("productColor", productColor, "text", true)}
      {createWorkOrderForm("productType", productType, "text", true)}
      {createWorkOrderForm("quantity", quantity, "text", true)}
      {createWorkOrderForm("dueDate", dueDate, "date", false)}
      <Flex align="center" my={3}>
        <Spacer />
        <ButtonGroup spacing="3">
          <Button type="reset" colorScheme="red">
            초기화
          </Button>
          <Button type="submit" colorScheme="blue">
            저장
          </Button>
        </ButtonGroup>
      </Flex>
    </form>
  );
}