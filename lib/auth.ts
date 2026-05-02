import { createHmac, timingSafeEqual } from "crypto";

export type AuthRole = "kitchen" | "admin";

const dayMs = 24 * 60 * 60 * 1000;

export const authConfig = {
  kitchen: {
    cookieName: "yumyard_kitchen_session",
    ttlMs: 7 * dayMs,
    loginPath: "/kitchen/login",
    homePath: "/kitchen/order",
  },
  admin: {
    cookieName: "yumyard_admin_session",
    ttlMs: 30 * dayMs,
    loginPath: "/admin/login",
    homePath: "/admin/menu",
  },
} as const;

type LoginResult =
  | { ok: true }
  | { ok: false; error: "missing-env" | "invalid" };

function readFormValue(formData: FormData, key: string) {
  const value = formData.get(key);

  return typeof value === "string" ? value.trim() : "";
}

function hasValues(values: Array<string | undefined>) {
  return values.every((value) => Boolean(value?.trim()));
}

export function validateKitchenLogin(formData: FormData): LoginResult {
  const expected = [
    process.env.KITCHEN_CHEF_NAME,
    process.env.KITCHEN_CHEF_MOBILE,
    process.env.KITCHEN_CHEF_PASSWORD,
  ];

  if (!hasValues(expected)) {
    return { ok: false, error: "missing-env" };
  }

  const isValid =
    readFormValue(formData, "name") === process.env.KITCHEN_CHEF_NAME &&
    readFormValue(formData, "mobile") === process.env.KITCHEN_CHEF_MOBILE &&
    readFormValue(formData, "password") === process.env.KITCHEN_CHEF_PASSWORD;

  return isValid ? { ok: true } : { ok: false, error: "invalid" };
}

export function validateAdminLogin(formData: FormData): LoginResult {
  const expected = [
    process.env.ADMIN_NAME,
    process.env.ADMIN_DATE_OF_BIRTH,
    process.env.ADMIN_MOBILE,
    process.env.ADMIN_PASSWORD,
  ];

  if (!hasValues(expected)) {
    return { ok: false, error: "missing-env" };
  }

  const isValid =
    readFormValue(formData, "name") === process.env.ADMIN_NAME &&
    readFormValue(formData, "dateOfBirth") ===
      process.env.ADMIN_DATE_OF_BIRTH &&
    readFormValue(formData, "mobile") === process.env.ADMIN_MOBILE &&
    readFormValue(formData, "password") === process.env.ADMIN_PASSWORD;

  return isValid ? { ok: true } : { ok: false, error: "invalid" };
}

function getSessionSecret(role: AuthRole) {
  const rolePassword =
    role === "kitchen"
      ? process.env.KITCHEN_CHEF_PASSWORD
      : process.env.ADMIN_PASSWORD;

  return process.env.AUTH_SESSION_SECRET || rolePassword || "yumyard-local";
}

function signSession(role: AuthRole, expiresAt: number) {
  return createHmac("sha256", getSessionSecret(role))
    .update(`${role}.${expiresAt}`)
    .digest("base64url");
}

function safeEqual(value: string, expected: string) {
  const valueBuffer = Buffer.from(value);
  const expectedBuffer = Buffer.from(expected);

  return (
    valueBuffer.length === expectedBuffer.length &&
    timingSafeEqual(valueBuffer, expectedBuffer)
  );
}

export function createSession(role: AuthRole) {
  const expiresAt = Date.now() + authConfig[role].ttlMs;
  const signature = signSession(role, expiresAt);

  return {
    value: `${role}.${expiresAt}.${signature}`,
    expiresAt: new Date(expiresAt),
  };
}

export function isSessionValid(role: AuthRole, value: string | undefined) {
  if (!value) {
    return false;
  }

  const [sessionRole, rawExpiresAt, signature] = value.split(".");
  const expiresAt = Number(rawExpiresAt);

  if (
    sessionRole !== role ||
    !Number.isFinite(expiresAt) ||
    Date.now() > expiresAt ||
    !signature
  ) {
    return false;
  }

  return safeEqual(signature, signSession(role, expiresAt));
}
