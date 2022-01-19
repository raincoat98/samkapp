import { Flex, Select, Tabs, TabList, Tab } from "@chakra-ui/react";

export type ManagementTableTabsProps = {
  tabGroups: {
    data: string[];
    onTabChange: (props: { index?: number }) => void;
    allowNull?: boolean;
    defaultValue?: number;
  }[];
};

export default function ManagementTableTabs(props: ManagementTableTabsProps) {
  return props.tabGroups.length > 1 || props.tabGroups[0].data.length > 5 ? (
    <Flex>
      {props.tabGroups.map((tabGroup, index) => {
        return (
          <Select
            defaultValue={tabGroup.defaultValue}
            onChange={(event) => {
              const value = event.target.value;
              tabGroup.onTabChange({
                index: value === "" ? undefined : Number(value),
              });
            }}
            placeholder={tabGroup.allowNull ? "전체" : undefined}
            borderRadius={0}
            flex={1}
            key={index}
          >
            {tabGroup.data.map((tab, index) => (
              <option key={index} value={index}>
                {tab}
              </option>
            ))}
          </Select>
        );
      })}
    </Flex>
  ) : (
    <Tabs
      onChange={(tabIndex) => {
        props.tabGroups[0].onTabChange({
          index: tabIndex,
        });
      }}
    >
      <TabList>
        {props.tabGroups[0].data.map((tab, index) => (
          <Tab key={index}>{tab}</Tab>
        ))}
      </TabList>
    </Tabs>
  );
}
