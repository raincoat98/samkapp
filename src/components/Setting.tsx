import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/modules";
import { toggleDarkThemeAction } from "../store/modules/system";
import {
  useColorMode,
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

function Setting() {
  const dispatch = useDispatch();
  const { colorMode, toggleColorMode } = useColorMode()
  const isDakMode = useSelector((state: RootState) => state.system.isDarkTheme);

  function changeDarkTheme() {
    dispatch(toggleDarkThemeAction(colorMode));
    toggleColorMode()
  }

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

  function SettingBox() {
    return (
      <Box borderWidth="1px" borderRadius="lg" p={5} overflow="hidden">
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
        <FormControl display="flex" alignItems="center" >
          <FormLabel htmlFor="email-alerts" >
            다크 모드
          </FormLabel>
          <Switch isChecked={isDakMode} onChange={changeDarkTheme}/>
        </FormControl>
      </Box>
    );
  }
}

export default Setting;
