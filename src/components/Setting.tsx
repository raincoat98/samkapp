import {
  Button,
  FormControl,
  FormLabel,
  Switch,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Box,
  HStack,
  VStack,
  Checkbox,
  Input,
  Radio,
  RadioGroup,
} from "@chakra-ui/react";

function SettingBox() {
  return (
    <Box borderWidth="1px" borderRadius="lg" p={5} overflow="hidden" bg="white">
      <Checkbox defaultIsChecked>체크박스</Checkbox>
      <Input placeholder="입력" />
      <RadioGroup>
        <HStack direction="row">
          <Radio value="1">First</Radio>
          <Radio value="2">Second</Radio>
          <Radio value="3">Third</Radio>
        </HStack>
      </RadioGroup>
      <Slider aria-label="slider-ex-1" defaultValue={30}>
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb />
      </Slider>
      <FormControl display="flex" alignItems="center">
        <FormLabel htmlFor="email-alerts" mb="0">
          알림 켜기
        </FormLabel>
        <Switch id="email-alerts" />
      </FormControl>
    </Box>
  );
}

function Setting() {
  return (
    <Box p={10}>
      <VStack align={"center"} spacing={10}>
        <SettingBox />
        <SettingBox />
        <SettingBox />
        <SettingBox />
        <SettingBox />
        <SettingBox />
        <SettingBox />
        <SettingBox />
        <SettingBox />
      </VStack>
      <Button colorScheme="red">설정 초기화</Button>
      <Button colorScheme="blue">설정 저장</Button>
    </Box>
  );
}

export default Setting;
