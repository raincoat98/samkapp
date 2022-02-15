import {
  Select,
  Tabs,
  TabList,
  Tab,
  HStack,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";

type pageIndex = number | undefined;

export type tabGroups = {
  name?: string;
  data: string[];
  onTabChange: (props: { index: pageIndex }) => void;
  allowNull?: boolean;
  defaultValue?: number;
};

export type ManagementTableTabsProps = {
  tabGroups: tabGroups[];
};

export default function ManagementTableTabs(props: ManagementTableTabsProps) {
  return props.tabGroups.length > 1 ? (
    <HStack padding={1} spacing={1}>
      {props.tabGroups.map((tabGroup, index) => {
        return (
          <FormControl display="flex" flex={1} alignItems="center" key={index}>
            {tabGroup.name && (
              <FormLabel whiteSpace={"pre"} margin={1}>
                {tabGroup.name}
                {": "}
              </FormLabel>
            )}
            <Select
              defaultValue={tabGroup.defaultValue}
              onChange={(event) => {
                const value = event.target.value;
                tabGroup.onTabChange({
                  index: value === "" ? undefined : Number(value),
                });
              }}
              placeholder={tabGroup.allowNull ? "전체" : undefined}
              fontWeight={"bold"}
            >
              {tabGroup.data.map((tab, index) => (
                <option key={index} value={index}>
                  {tab}
                </option>
              ))}
            </Select>
          </FormControl>
        );
      })}
    </HStack>
  ) : (
    <Tabs
      isLazy
      onChange={(tabIndex) => {
        let index: pageIndex = tabIndex;

        // "전체" 탭이 허용 되어있을 경우
        if (props.tabGroups[0].allowNull) {
          // "전체" 탭일 경우 undefined 리턴
          if (tabIndex === 0) index = undefined;
          // 아닐 경우 tabIndex에서 -1
          else index = tabIndex - 1;
        } else {
          index = tabIndex;
        }

        props.tabGroups[0].onTabChange({
          index,
        });
      }}
      size={"sm"}
      variant={"solid-rounded"}
    >
      <TabList>
        {props.tabGroups[0].allowNull && <Tab>전체</Tab>}
        {props.tabGroups[0].data.map((tab, index) => (
          <Tab key={index}>{tab}</Tab>
        ))}
      </TabList>
    </Tabs>
  );
}
