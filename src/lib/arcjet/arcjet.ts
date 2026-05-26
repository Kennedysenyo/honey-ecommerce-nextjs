import arcjet, {
  BotOptions,
  EmailOptions,
  shield,
  SlidingWindowRateLimitOptions,
} from "@arcjet/next";

const arcjetKey = process.env.ARCJET_KEY;

if (!arcjetKey) {
  throw new Error("ARCJET_KEY is required to setup Arcjet");
}

export const aj = arcjet({
  key: arcjetKey,
  characteristics: ["email", "ip.src"],
  rules: [shield({ mode: "LIVE" })],
});

export const botSettings = {
  mode: "LIVE",
  allow: [],
} satisfies BotOptions;

export const restrictiveRateLimitSettings = {
  mode: "LIVE",
  max: 10,
  interval: "10m",
} satisfies SlidingWindowRateLimitOptions<[]>;

export const laxRateLimitSettings = {
  mode: "LIVE",
  max: 60,
  interval: "1m",
} satisfies SlidingWindowRateLimitOptions<[]>;

export const emailSettings = {
  mode: "LIVE",
  deny: ["DISPOSABLE", "INVALID", "NO_MX_RECORDS"],
} satisfies EmailOptions;
