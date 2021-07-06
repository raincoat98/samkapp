import { Box, Image, Badge } from "@chakra-ui/react";

function FactoryCard() {
  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" bg={"white"}>
      <Image
        src={
          "https://images.unsplash.com/photo-1584275142335-7f7cc7ba6c23?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGZhY3Rvcnl8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80"
        }
      />
      <Box p="6">
        <Box d="flex" alignItems="baseline">
          <Badge borderRadius="full" px="2" colorScheme="teal">
            작동중
          </Badge>
          <Box
            color="gray.500"
            letterSpacing="wide"
            textTransform="uppercase"
            ml="2"
          ></Box>
        </Box>
        <Box mt="1" fontWeight="bold" lineHeight="tight" isTruncated>
          테스트 작업 1
        </Box>
        <Box>1,000 생산 / 1시간</Box>
      </Box>
    </Box>
  );
}

export default FactoryCard;
