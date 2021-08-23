import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "store";
import { customer } from "realmObjectModes";
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

export default function CustomerModalComponent(
  props: ModalProps & { customerData?: customer; mode: string }
) {
  const { customerData, mode } = props;
  const dispatch = useDispatch();

  const realmApp = useSelector((state: RootState) => state.realm.app);

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
          .insert_customer({
            name: name.current?.value,
            rank: rank.current?.value,
            phone: phone.current?.value,
            email: email.current?.value,
            companyName: companyName.current?.value,
            companyPhone: companyPhone.current?.value,
            companyFax: companyFax.current?.value,
            companyAddress: companyAddress.current?.value,
            note: note.current?.value,
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
            <FormLabel>성명</FormLabel>
            <Input type="text" ref={name} defaultValue={customerData?.name} />
          </FormControl>
          <FormControl id="rank">
            <FormLabel>직급</FormLabel>
            <Input type="text" ref={rank} defaultValue={customerData?.rank} />
          </FormControl>
        </Stack>

        <Stack direction="row">
          <FormControl id="phone">
            <FormLabel>전화번호</FormLabel>
            <Input type="text" ref={phone} defaultValue={customerData?.phone} />
          </FormControl>
          <FormControl id="email">
            <FormLabel>이메일</FormLabel>
            <Input type="text" ref={email} defaultValue={customerData?.email} />
          </FormControl>
        </Stack>

        <FormControl id="companyName">
          <FormLabel>회사명</FormLabel>
          <Input
            type="text"
            ref={companyName}
            defaultValue={customerData?.companyName}
          />
        </FormControl>
        <FormControl id="companyPhone">
          <FormLabel>회사 전화번호</FormLabel>
          <Input
            type="text"
            ref={companyPhone}
            defaultValue={customerData?.companyPhone}
          />
        </FormControl>
        <FormControl id="companyFax">
          <FormLabel>회사 팩스 번호</FormLabel>
          <Input
            type="text"
            ref={companyFax}
            defaultValue={customerData?.companyFax}
          />
        </FormControl>
        <FormControl id="companyAddress">
          <FormLabel>회사 주소</FormLabel>
          <Input
            type="text"
            ref={companyAddress}
            defaultValue={customerData?.companyAddress}
          />
        </FormControl>
        <FormControl id="note">
          <FormLabel>비고</FormLabel>
          <Textarea type="text" ref={note} defaultValue={customerData?.note} />
        </FormControl>
      </Stack>
    </ModalComponent>
  );
}
