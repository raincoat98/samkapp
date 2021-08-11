import { useTranslation } from "react-i18next";
import PageContainer from "../frames/PageContainer";
import {
  Heading,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";

export default function Announcement() {
  const { t } = useTranslation();

  const announcementItems = () => {
    const result = [];
    for (let i = 0; i < 30; i++) {
      result.push(<AnnouncementItem key={i} />);
    }
    return result;
  };

  return (
    <PageContainer title={t("Announcement")}>
      <Accordion defaultIndex={[0]} allowMultiple>
        {announcementItems()}
      </Accordion>
    </PageContainer>
  );
}

function AnnouncementItem() {
  return (
    <AccordionItem>
      <AccordionButton py={3}>
        <Heading size="md" flex="1" textAlign="left">
          제목
        </Heading>
        등록일 YYYY-MM-DD
        <AccordionIcon />
      </AccordionButton>
      <AccordionPanel pb={4}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </AccordionPanel>
    </AccordionItem>
  );
}
