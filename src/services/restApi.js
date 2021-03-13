export class RestApi {
  constructor(hostUrl) {
    this.hostUrl = hostUrl;
  }

  async search(query) {
    const response = await fetch(`/search?q=${query}`);
    const result = await response.json();
    return result.suggestions;
  }
}
