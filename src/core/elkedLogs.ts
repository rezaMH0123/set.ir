const ELK_ENDPOINT = process.env.ELK_ENDPOINT ?? "";
const ELK_USERNAME = process.env.ELK_USERNAME ?? "";
const ELK_PASSWORD = process.env.ELK_PASSWORD ?? "";

type LogLevelType = "FATAL" | "ERROR" | "WARN" | "INFO" | "DEBUG" | "TRACE";
export const ElkedLog = async (
  message: string,
  level: LogLevelType = "INFO"
) => {
  console.log("elk: ", message, level);
  if (!(!!ELK_PASSWORD && !!ELK_USERNAME && !!ELK_ENDPOINT)) return null;
  try {
    console.log("elk is ok: sending message...");
    await fetch(ELK_ENDPOINT ?? "", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Basic " +
          Buffer.from(`${ELK_USERNAME ?? ""}:${ELK_PASSWORD ?? ""}`).toString(
            "base64"
          ),
      },
      body: JSON.stringify({
        message,
        level,
      }),
    });
  } catch (error) {
    console.error("Failed to send log: \n", error);
  }
};
