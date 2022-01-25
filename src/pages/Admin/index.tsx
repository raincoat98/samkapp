import { contentBackground, menuBackground } from "theme";
import {
  Box,
  useColorModeValue,
  Stat,
  StatArrow,
  StatGroup,
  StatHelpText,
  StatLabel,
  StatNumber,
} from "@chakra-ui/react";
import PageContainer from "components/PageContainer";

export default function Login() {
  const menuBackgroundValue = useColorModeValue(
    menuBackground.light,
    menuBackground.dark
  );

  const contentBackgroundValue = useColorModeValue(
    contentBackground.light,
    contentBackground.dark
  );

  return (
    <PageContainer title={"관리자 페이지"}>
      <Box p={3}>
        <StatGroup p={3}>
          <Stat>
            <StatLabel>생산</StatLabel>
            <StatNumber>345,670</StatNumber>
            <StatHelpText>
              <StatArrow type="increase" />
              23.36%
            </StatHelpText>
          </Stat>

          <Stat>
            <StatLabel>생산</StatLabel>
            <StatNumber>345,670</StatNumber>
            <StatHelpText>
              <StatArrow type="increase" />
              23.36%
            </StatHelpText>
          </Stat>
        </StatGroup>

        <StatGroup p={3}>
          <Stat>
            <StatLabel>생산</StatLabel>
            <StatNumber>345,670</StatNumber>
            <StatHelpText>
              <StatArrow type="increase" />
              23.36%
            </StatHelpText>
          </Stat>

          <Stat>
            <StatLabel>생산</StatLabel>
            <StatNumber>345,670</StatNumber>
            <StatHelpText>
              <StatArrow type="increase" />
              23.36%
            </StatHelpText>
          </Stat>
        </StatGroup>
      </Box>
    </PageContainer>
  );
}
