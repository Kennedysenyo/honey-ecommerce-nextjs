import arcjet, { shield } from "@arcjet/next";

const arcjetKey = process.env.ARCJET_KEY;

if (!arcjetKey) {
  throw new Error("ARCJET_KEY is required to set up arcjet");
}
export const aj = arcjet({
  key: arcjetKey,
  characteristics: ["userIdOrIp"],
  rules: [shield({ mode: "LIVE" })],
});
