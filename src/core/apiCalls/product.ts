import { API_URL } from "@/configs/globals";
import httpService from "../services/http-services";
import BACKEND_ROUTES from "../configs";
import { Comment, Product } from "@/types/product";
import { cache } from "react";
import toast from "react-hot-toast";
import { ElkedLog } from "../elkedLogs";
import { notFound } from "next/navigation";

export const cachedGetProductBeforePurchase = cache<
  (productId: string) => Promise<Product>
>((productId: string) => {
  const res = getProductBeforePurchase(productId);
  return res;
});

export async function getProductBeforePurchase(productId: string) {
  try {
    ElkedLog(
      "GET product before purchase: " +
        `${API_URL}Product/ViewProductBeforePurchase/${productId}`,
      "INFO"
    );
    const res = await fetch(
      `${API_URL}Product/ViewProductBeforePurchase/${productId}`,
      {
        headers: { Accept: "application/json" },
        next: { revalidate: 300 },
      }
    );
    if (!res.ok) {
      throw {
        logMessage:
          "Server responsed not OK " + res.status + " " + res.statusText,
        status: 503,
      };
    }
    const json = await res.json();

    const isDisable = !!json.isDisable;
    const status: "NotFound" | "Gone" = json.statusCode; // NotFound

    if (isDisable)
      throw {
        logMessage:
          "No data received for this productId (product is disabled): " +
          productId,
        status: 200,
      };

    if (status === "NotFound")
      throw {
        logMessage:
          "No data received for this productId (product not found): " +
          productId,
        status: 404,
      };

    if (status === "Gone")
      throw {
        logMessage:
          "No data received for this productId (product is deleted): " +
          productId,
        status: 410,
      };

    if (!json?.data)
      throw {
        logMessage:
          "No data received for this productId (server error): " + productId,
        status: 500,
      };

    return json.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    // 200 (disabled), 404, 410, 503
    ElkedLog("HTTP error on get product before purchase: " + err, "ERROR");
    if (err?.status === 200) notFound(); // 200 product is disabled
    if (err?.status === 404) notFound(); // 404 we dont have id in db
    if (err?.status === 410)
      notFound(); // we have deleted id in db (page gone permenanlty)
    else notFound(); // 503 or any other issues
  }
}

export async function getAparatLinkServerSide(aparatId: string) {
  if (!!aparatId)
    try {
      const res = await fetch(
        `${API_URL}Video/GetAparatVideoLink?VideoId=${aparatId}`,
        {
          headers: { Accept: "application/json" },
          next: { revalidate: 300 },
          method: "GET",
        }
      );
      if (!res.ok) {
        return "";
      }

      const json = await res.json();

      return (json?.data?.url as string) ?? "";
    } catch {
      return "";
    }
  else return "";
}

export async function getArvanLinkServerSide(arvanId: string) {
  try {
    const res = await fetch(
      `${API_URL}Video/GetArvanSecureVideoLink?VideoId=${arvanId}`,
      {
        headers: { Accept: "application/json" },
        next: { revalidate: 300 },
        method: "GET",
      }
    );
    if (!res.ok) {
      return null;
    }

    const json = await res.json();

    return json?.data?.url ?? null;
  } catch {
    return null;
  }
}

export async function getProductAfterPurchase(
  productId: string,
  token: string
) {
  try {
    const res = await fetch(
      `${API_URL}Product/ViewProductAfterPurchase/${productId}`,
      {
        headers: {
          Accept: "text/plain",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!res.ok) {
      return null;
    }
    const data = await res.json();
    return data;
  } catch {}
}

export const getComments = async (
  productId: string,
  pageNumber: string = "0",
  pageSize: string = "50"
): Promise<{
  comments: Comment[];
  averageRating: number;
  totalComments: number;
}> => {
  const res = await httpService.get(`${BACKEND_ROUTES.GET_COMMENTS}`, {
    params: {
      ProductId: productId,
      PageNumber: pageNumber,
      PageSize: pageSize,
    },
  });
  return (
    res?.data?.data ?? {
      comments: [],
      averageRating: 0,
      totalComments: 0,
    }
  );
};

export const postComment = async (
  rate: number,
  text: string,
  productId: string
): Promise<boolean> => {
  const res = await httpService.post(
    `${BACKEND_ROUTES.POST_COMMENT}`,
    {
      rate,
      productId,
      text,
    },
    {
      headers: { authRequired: true },
    }
  );
  return res.status === 200;
};

export const getArvanLink = async (videoId: string) => {
  try {
    const res = await httpService.get(
      `${BACKEND_ROUTES.Get_ARVAN_VIDEOLINK}?VideoId=${videoId}`,
      {
        headers: { authRequired: true },
      }
    );
    if (res.status === 200) {
      return res.data.data;
    }
  } catch (err) {
    console.log(err);
  }
};

export const getSaminLink = async (videoId: string) => {
  try {
    const res = await httpService.get(
      `${BACKEND_ROUTES.Get_SAMIN_VIDEOLINK}?VideoId=${videoId}`,
      {
        headers: { authRequired: true },
      }
    );
    if (res.status === 200) {
      return res.data.data;
    }
  } catch (err) {
    console.log(err);
  }
};

export const getAparatLink = async (videoId: string) => {
  try {
    const res = await httpService.get(
      `${BACKEND_ROUTES.Get_APARAT_VIDEOLINK}?VideoId=${videoId}`,
      {
        headers: { authRequired: true },
      }
    );
    if (res.status === 200) {
      return res?.data?.data;
    }
  } catch (err) {
    console.log(err);
  }
};

export const downloadFile = async (fileId: string, productId: string) => {
  try {
    const res = await httpService.get(`File/GetDownloadData/`, {
      params: {
        fileId: fileId,
        productId: productId,
      },
      headers: { authRequired: true },
    });
    if (res.status === 200 && res.data?.data) {
      const rawData = res.data.data;
      const path = decodeURIComponent(rawData.path);
      const expires = rawData.expiration;
      const hmac = rawData.hmac;

      const filenameFromPath = path.split("/").pop() || fileId;
      const fileExtension = filenameFromPath.includes(".")
        ? filenameFromPath.substring(filenameFromPath.lastIndexOf("."))
        : "";

      const url = `File/DownloadFile?path=${path}&expires=${expires}&hmac=${hmac}`;

      try {
        toast.success("دانلود فایل شروع شد. لطفا کمی صبر کنید", {
          duration: 2000,
        });
        const res2 = await httpService.get(url, {
          responseType: "blob",
          headers: { authRequired: true },
        });
        if (res2 && res2.data) {
          const blob = new Blob([res2.data]);
          const downloadUrl = window.URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = downloadUrl;

          link.download = fileId + fileExtension;

          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          window.URL.revokeObjectURL(downloadUrl);
        }
      } catch (err) {
        console.log("Error in second request:", err);
        return "error";
      }
    }
  } catch (err) {
    console.log(err);
    return "error";
  }
};

export const downloadFilesZip = async (
  fileIds: string[],
  productId: string
) => {
  try {
    const queryString =
      fileIds.map((id) => `fileIds=${id}`).join("&") +
      "&productId=" +
      productId;

    const res = await httpService.get(
      `File/GetBatchDownloadData?${queryString}`,
      {
        headers: { authRequired: true },
      }
    );
    if (res.status === 200 && res.data?.data) {
      const rawData = res.data.data;
      const path = decodeURIComponent(rawData.path);
      const expires = rawData.expiration;
      const hmac = rawData.hmac;

      const url = `File/DownloadZipFile?path=${path}&expires=${expires}&hmac=${hmac}`;

      try {
        const res2 = await httpService.get(url, {
          responseType: "blob",
          headers: { authRequired: true },
        });
        if (res2 && res2.data) {
          const blob = new Blob([res2.data]);
          const downloadUrl = window.URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = downloadUrl;

          link.download = "batch_download.zip";

          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          window.URL.revokeObjectURL(downloadUrl);
        }
      } catch (err) {
        console.log("Error in zip download request:", err);
        return "error";
      }
    }
  } catch (err) {
    console.log("Error in batch metadata request:", err);
    return "error";
  }
};
