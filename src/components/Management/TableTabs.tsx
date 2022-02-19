import { Tabs, TabList, Tab } from "@chakra-ui/react";

type pageIndex = number | undefined;

export type tab = {
  data: { name: string; isDisabled?: boolean }[];
  onTabChange: (props: { index: pageIndex }) => void;
  allowNull?: boolean;
};

export type ManagementTableTabsProps = {
  tab: tab;
};

export default function ManagementTableTabs(props: ManagementTableTabsProps) {
  const { tab } = props;

  return (
    <Tabs
      isLazy
      onChange={(tabIndex) => {
        let index: pageIndex = tabIndex;

        // "전체" 탭이 허용 되어있을 경우
        if (tab.allowNull) {
          // "전체" 탭일 경우 undefined 리턴
          if (tabIndex === 0) index = undefined;
          // 아닐 경우 tabIndex에서 -1
          else index = tabIndex - 1;
        } else {
          index = tabIndex;
        }

        tab.onTabChange({
          index,
        });
      }}
      size={"sm"}
      variant={"solid-rounded"}
    >
      <TabList>
        {tab.allowNull && <Tab>전체</Tab>}
        {tab.data.map((tabData, index) => (
          <Tab
            isDisabled={tabData.isDisabled}
            key={index}
            _disabled={{ opacity: 0.5, cursor: "not-allowed" }}
          >
            {tabData.name}
          </Tab>
        ))}
      </TabList>
    </Tabs>
  );
}
