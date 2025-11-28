export function commaSeperatedDigit(input: string | number): string {
  const str = input.toString();
  return str.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
