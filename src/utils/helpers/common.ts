export function formatNumberWithSlash(
  num: number | string,
  sign: string
): string {
  const number = typeof num === "number" ? num.toString() : num;
  return number.replace(/\B(?=(\d{3})+(?!\d))/g, sign);
}

export function convertToISODuration(time: string): string {
  const [hours, minutes, seconds] = time.split(":").map(Number);
  let duration = "PT";
  if (hours) duration += `${hours}H`;
  if (minutes) duration += `${minutes}M`;
  if (seconds) duration += `${seconds}S`;
  return duration;
}

declare global {
  interface String {
    toCapitalCase(): string;
  }
}

String.prototype.toCapitalCase = function () {
  if (!this) return "";
  return this.charAt(0).toUpperCase() + this.slice(1).toLowerCase();
};
