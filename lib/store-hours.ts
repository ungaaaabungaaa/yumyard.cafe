export type StoreClockTime = {
  hour: number;
  minute: number;
};

export const STORE_TIME_ZONE = "Asia/Kolkata";
export const STORE_OPEN_TIME = {
  hour: 11,
  minute: 30,
} satisfies StoreClockTime;
export const STORE_CLOSE_TIME = {
  hour: 23,
  minute: 30,
} satisfies StoreClockTime;

function toMinutes(time: StoreClockTime) {
  return time.hour * 60 + time.minute;
}

function getZonedMinutes(date: Date, timeZone: string) {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone,
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);
  const hour = Number(parts.find((part) => part.type === "hour")?.value ?? 0);
  const minute = Number(parts.find((part) => part.type === "minute")?.value ?? 0);

  return hour * 60 + minute;
}

export function isStoreOpen(date = new Date()) {
  const currentTime = getZonedMinutes(date, STORE_TIME_ZONE);
  const openTime = toMinutes(STORE_OPEN_TIME);
  const closeTime = toMinutes(STORE_CLOSE_TIME);

  if (openTime === closeTime) {
    return true;
  }

  if (openTime < closeTime) {
    return currentTime >= openTime && currentTime < closeTime;
  }

  return currentTime >= openTime || currentTime < closeTime;
}
