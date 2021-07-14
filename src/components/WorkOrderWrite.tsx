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

  const formId = {
    companyName: "company-name",
    productName: "product-name",
    productColor: "product-color",
    productType: "product-type",
    quantity: "quantity",
  };

  // state 생성
  const [companyName, setCompanyName] = React.useState("");
  const [productName, setProductName] = React.useState("");
  const [productColor, setProductColor] = React.useState("");
  const [productType, setProductType] = React.useState("");
  const [quantity, setQuantity] = React.useState("");

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
      },
    });
    props.onSubmit();
  };

  //  Form 초기화할 때
  const onReset = (event: React.FormEvent<HTMLFormElement>) => {
    console.log(event);
  };

  return (
    <form onSubmit={onSubmit} onReset={onReset}>
      <FormControl isRequired>
        <FormLabel>거래처</FormLabel>
        <Input
          placeholder="거래처"
          data-id={formId.companyName}
          value={companyName}
          onChange={onChange}
        />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>품명</FormLabel>
        <Input
          placeholder="품명"
          data-id={formId.productName}
          value={productName}
          onChange={onChange}
        />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>색상</FormLabel>
        <Input
          placeholder="색상"
          data-id={formId.productColor}
          value={productColor}
          onChange={onChange}
        />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>지종</FormLabel>
        <Input
          placeholder="지종"
          data-id={formId.productType}
          value={productType}
          onChange={onChange}
        />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>수량</FormLabel>
        <Input
          placeholder="수량"
          data-id={formId.quantity}
          value={quantity}
          onChange={onChange}
        />
      </FormControl>
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
