import {
  Box,
  Link,
  Icon,
  Stack,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
import { externalLink } from "utils/icons";
import licenses from "data/licenses.json";

type licenseType = {
  name: string;
  licenses: string;
  repository: string;
  licenseUrl: string;
  parents: string;
};

export default function LicensesList() {
  const licensesString = JSON.stringify(licenses);
  const licenseObject = JSON.parse(licensesString);
  const licenseList: licenseType[] = [];

  for (const key in licenseObject) {
    if (Object.prototype.hasOwnProperty.call(licenseObject, key)) {
      licenseList.push({ name: key, ...licenseObject[key] });
    }
  }

  return (
    <Accordion allowMultiple={true}>
      {licenseList.map((license, key) => (
        <AccordionItem key={key}>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                {license.name}
              </Box>
              {license.licenses}
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <Stack direction="row">
              <Link href={license.repository} isExternal>
                Repository <Icon as={externalLink} />
              </Link>
              <Link href={license.licenseUrl} isExternal>
                License <Icon as={externalLink} />
              </Link>
            </Stack>
          </AccordionPanel>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
