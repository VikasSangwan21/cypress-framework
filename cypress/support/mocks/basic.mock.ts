export class BasicMock {
  addQueryParams(url: string, queryParamsObject: any): string {
    const entries = Object.entries(queryParamsObject);
    const params = entries.reduce((acc: string[], [key, value]) => {
      return [...acc, `${key}=${value}`];
    },                            []);
    return `${url}?${params.join('&')}`;
  };
}


