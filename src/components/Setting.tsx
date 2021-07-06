import {
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
    <Box>
      <VStack align={"center"} p={10} spacing={10}>
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
    </Box>
  );
}

export default Setting;
