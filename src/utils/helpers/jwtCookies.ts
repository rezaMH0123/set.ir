export function getJwtExpiration(token: string): Date | null {
  try {
    const payloadBase64 = token.split(".")[1];
    const decodedPayload = JSON.parse(atob(payloadBase64));
    if (!decodedPayload.exp) return null;

    const expUnix = decodedPayload.exp; // ثانیه
    return new Date(expUnix * 1000); // تبدیل به میلی‌ثانیه
  } catch (error) {
    console.error("Invalid JWT:", error);
    return null;
  }
}

export function preparegetExpierTimeToken(
  expiresAtISOString: string
): number | undefined {
  const expiresAt = new Date(expiresAtISOString);
  const now = new Date();

  const diffInMs = expiresAt.getTime() - now.getTime();

  if (isNaN(diffInMs) || diffInMs <= 0) return undefined;

  return Math.floor(diffInMs / 1000);
}
