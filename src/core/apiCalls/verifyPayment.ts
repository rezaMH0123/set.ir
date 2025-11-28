import { API_URL } from "@/configs/globals";
import BACKEND_ROUTES from "../configs";
import { cookies } from "next/headers";
import { ElkedLog } from "../elkedLogs";

export async function getVerifyPayment(
  Authority: string,
  Status: string
): Promise<{
  trackingCode: string;
  date: string;
  amount: string;
  status: boolean;
} | null> {
  //const params = new URLSearchParams({ Authority, Status }).toString();
  const url = `${API_URL}${BACKEND_ROUTES.GET_VERIFY_PAYMENT}`;
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify({
      status: Status,
      authority: Authority,
    }),
  });

  ElkedLog(`POST, ${url}, params: ${Status}, ${Authority}`, "INFO");
  try {
    const data = await res.json();
    ElkedLog(`RESPONSE to ${Authority}: ${JSON.stringify(data)}`, "INFO");
    return {
      status: data.success,
      amount: data?.data?.verifyChargeDto?.amount,
      date: data?.data?.verifyChargeDto?.createdAt,
      trackingCode:
        data?.data?.verifyChargeDto?.refId ?? data?.data?.customRefId,
    };
  } catch (error) {
    ElkedLog(
      `"Error: parsing backend data to json ${JSON.stringify(error)}`,
      "ERROR"
    );
    return {
      status: false,
      amount: "",
      date: "",
      trackingCode: "",
    };
  }
}
