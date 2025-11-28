import { API_URL } from "@/configs/globals";
import APP_ROUTES from "@/constants/paths";
import BACKEND_ROUTES from "@/core/configs";
import { ElkedLog } from "@/core/elkedLogs";
import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://set.ir";

  const paths: MetadataRoute.Sitemap = [
    { url: "", changeFrequency: "weekly", priority: 1 },
    { url: "about", changeFrequency: "monthly", priority: 0.8 },
    { url: "basket", changeFrequency: "weekly", priority: 0.6 },
    { url: "contact", changeFrequency: "monthly", priority: 0.7 },
    { url: "dashboard", changeFrequency: "weekly", priority: 0.7 },
    { url: "faq", changeFrequency: "monthly", priority: 0.6 },
    { url: "filter", changeFrequency: "weekly", priority: 0.5 },
    { url: "opportunities", changeFrequency: "monthly", priority: 0.7 },
    { url: "privacy", changeFrequency: "yearly", priority: 0.5 },
    { url: "policy", changeFrequency: "yearly", priority: 0.5 },
  ];

  const staticSitemMap: MetadataRoute.Sitemap = paths.map(
    ({ url, changeFrequency, priority }) => ({
      url: `${baseUrl}/${url}`,
      lastModified: new Date(),
      changeFrequency,
      priority,
    })
  );

  const apiUrl = API_URL + BACKEND_ROUTES.Get_SITEMAP;
  let products = [];

  try {
    const res = await fetch(apiUrl, {
      headers: { accept: "*/*" },
      next: { revalidate: 60 * 60 * 24 }, //a day
    });

    if (!res.ok) {
      await ElkedLog(
        `Fetch sitemap failed, continue without sitemap, res not ok`,
        "INFO"
      );
      return staticSitemMap;
    }

    if (res.headers.get("content-type")?.includes("text/html")) {
      await ElkedLog(
        `Fetch sitemap failed, continue without sitemap, res not json`,
        "INFO"
      );
      return staticSitemMap;
    }

    const data = await res.json();
    products = data.data || [];

    await ElkedLog(`Fetched ${products.length} products for sitemap`, "INFO");
  } catch (error) {
    await ElkedLog(`Error fetching sitemap data: ${error}`, "ERROR");
    return staticSitemMap;
  }

  const returnSiteMap: MetadataRoute.Sitemap = [
    ...staticSitemMap,
    ...(products.map((p: { modifiedAt: string; id: string }) => ({
      url: `${baseUrl}/${APP_ROUTES.PRODUCT_DETIALS}/${p.id}`,
      lastModified: p.modifiedAt || new Date().toISOString(),
      changeFrequency: "weekly",
      priority: 0.5,
    })) ?? []),
  ];

  return returnSiteMap;
}
