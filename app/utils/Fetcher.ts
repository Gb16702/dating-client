type FetcherType<T> = {
  url: string;
  headers: Record<string, string>;
  method?: string;
  body?: T;
};

export async function fetcher<T>({ url, method, body, headers }: FetcherType<T>) {
  return await fetch(url, {
    method,
    headers,
  });
}
