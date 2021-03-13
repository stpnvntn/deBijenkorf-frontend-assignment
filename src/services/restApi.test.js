import { RestApi } from "./restApi";

describe("restApi", () => {
  afterEach(() => {
    fetch.mockClear();
  });

  describe("search", () => {
    it("fetch suggestion", async () => {
      const suggestions = [{ searchterm: "heren truien", nrResults: 42 }];
      const query = "query";
      const fetchMock = jest.fn(() =>
        Promise.resolve({
          json: () =>
            Promise.resolve({
              suggestions,
            }),
        })
      );
      global.fetch = fetchMock;
      const restApi = new RestApi();

      const actual = await restApi.search(query);

      expect(fetchMock).toBeCalledWith("/search?q=query");
      expect(actual).toStrictEqual(suggestions);
    });
  });
});
