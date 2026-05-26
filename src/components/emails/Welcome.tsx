import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";
import tailwindConfig from "./config/tailwind";

interface Props {
  name: string;
  baseURL: string;
}

export default function Welcome({ name, baseURL }: Props) {
  return (
    <Html>
      <Head />
      <Tailwind config={tailwindConfig}>
        <Body className="bg-white font-koala">
          <Preview>
            The sales intelligence platform that helps you uncover qualified
            leads.
          </Preview>
          <Container className="mx-auto py-5 pb-12">
            <Img
              src={`${baseURL}/static/logo.png`}
              width="70"
              height="70"
              alt="Honey Man"
              className="mx-auto"
            />
            <Text className="text-[16px] leading-[26px]">Hi {name},</Text>
            <Text className="text-[16px] leading-[26px]">
              Welcome to Honey Man, the best place to get your pure quality
              honey your consumption and medicinal needs.
            </Text>
            <Section className="text-center">
              <Button
                className="bg-[#c46b00] rounded-[3px] text-white text-[16px] no-underline text-center block p-3"
                href={`${baseURL}`}
              >
                Get started
              </Button>
            </Section>
            <Text className="text-[16px] leading-[26px]">
              Best,
              <br />
              The Honey Man team
            </Text>
            <Hr className="border-[#cccccc] my-5" />
            <Text className="text-[#8898aa] text-[12px]">
              343 Djaba Road Somanya #1148, Eastern Region, GH 94080
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
