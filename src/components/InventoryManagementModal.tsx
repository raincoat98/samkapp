import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "store";
import { product, productSchema } from "realmObjectModes";
import ModalComponent from "components/frames/ModalComponent";
import {
  Stack,
  Button,
  Input,
  Textarea,
  ButtonGroup,
  FormControl,
  FormLabel,
  ModalProps,
} from "@chakra-ui/react";

export default function InventoryModalComponent(
  props: ModalProps & { productData?: product; mode: string }
) {
  const { productData, mode } = props;
  const dispatch = useDispatch();

  const realmApp = useSelector((state: RootState) => state.realm.app);

  console.log(productSchema);

  const name = React.useRef<HTMLInputElement>(null);
  const rank = React.useRef<HTMLInputElement>(null);
  const phone = React.useRef<HTMLInputElement>(null);
  const email = React.useRef<HTMLInputElement>(null);
  const companyName = React.useRef<HTMLInputElement>(null);
  const companyPhone = React.useRef<HTMLInputElement>(null);
  const companyFax = React.useRef<HTMLInputElement>(null);
  const companyAddress = React.useRef<HTMLInputElement>(null);
  const note = React.useRef<HTMLTextAreaElement>(null);

  async function onSubmit() {
    switch (mode) {
      case "add": {
        dispatch({
          type: "system/openProgress",
        });

        await realmApp?.currentUser?.functions
          .customer_action("insert", {
            doc: {
              name: name.current?.value,
              rank: rank.current?.value,
              phone: phone.current?.value,
              email: email.current?.value,
              companyName: companyName.current?.value,
              companyPhone: companyPhone.current?.value,
              companyFax: companyFax.current?.value,
              companyAddress: companyAddress.current?.value,
              note: note.current?.value,
            },
          })
          .then((result) => {
            console.log(result);
            dispatch({
              type: "system/closeProgress",
            });
            props.onClose();
          });
        break;
      }
      case "edit": {
        dispatch({
          type: "system/openProgress",
        });

        await realmApp?.currentUser?.functions
          .customer_action("update", {
            doc: {
              name: name.current?.value,
              rank: rank.current?.value,
              phone: phone.current?.value,
              email: email.current?.value,
              companyName: companyName.current?.value,
              companyPhone: companyPhone.current?.value,
              companyFax: companyFax.current?.value,
              companyAddress: companyAddress.current?.value,
              note: note.current?.value,
            },
            filter: {
              _id: productData?._id,
            },
          })
          .then((result) => {
            console.log(result);
            dispatch({
              type: "system/closeProgress",
            });
            props.onClose();
          });
        break;
      }
    }
  }

  return (
    <ModalComponent
      isOpen={props.isOpen}
      onClose={props.onClose}
      isCentered={true}
      size="2xl"
      scrollBehavior="inside"
      headerChildren={mode === "add" ? "추가" : "수정"}
      footerChildren={
        <ButtonGroup>
          <Button type="submit" onClick={onSubmit} colorScheme="blue">
            저장
          </Button>
          <Button onClick={props.onClose}>닫기</Button>
        </ButtonGroup>
      }
    >
      <Stack>
        <Stack direction="row">
          <FormControl id="name">
            <FormLabel>제품명</FormLabel>
            <Input type="text" ref={name} defaultValue={productData?.name} />
          </FormControl>
        </Stack>

        <FormControl id="note">
          <FormLabel>비고</FormLabel>
          <Textarea type="text" ref={note} defaultValue={productData?.note} />
        </FormControl>
      </Stack>
    </ModalComponent>
  );
}
