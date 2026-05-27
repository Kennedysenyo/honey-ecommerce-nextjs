import arcjet, {
  BotOptions,
  detectBot,
  EmailOptions,
  shield,
  SlidingWindowRateLimitOptions,
  tokenBucket,
  validateEmail,
} from "@arcjet/next";

export const arcjetKey = process.env.ARCJET_KEY;

if (!arcjetKey) {
  throw new Error("ARCJET_KEY is required to setup Arcjet");
}

export const botSettings = {
  mode: "LIVE",
  allow: [],
} satisfies BotOptions;

export const restrictiveRateLimitSettings = {
  mode: "LIVE",
  max: 0,
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
  allowDomainLiteral: true,
  requireTopLevelDomain: true,
} satisfies EmailOptions;

export const aj = arcjet({
  key: arcjetKey,
  rules: [
    shield({ mode: "LIVE" }),
    detectBot({
      mode: "LIVE",
      allow: [],
    }),

    tokenBucket({
      mode: "LIVE",
      characteristics: ["ip.src"],
      capacity: 10,
      refillRate: 10,
      interval: "60s",
    }),
  ],
});
