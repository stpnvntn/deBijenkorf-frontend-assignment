import { buildUrl } from "../utils/buildUrl";
import { apiBaseUrl } from "./envVars";

export class RestApi {
  constructor(baseUrl = apiBaseUrl) {
    this.baseUrl = baseUrl;
  }

  async search(query) {
    const url = buildUrl({
      baseUrl: this.baseUrl,
      path: "/search",
      queryParams: { q: query },
    });
    const response = await fetch(url);
    const result = await response.json();
    return result.suggestions;
  }
}
