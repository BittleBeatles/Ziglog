import returnFetch, {
  FetchArgs,
  ReturnFetchDefaultOptions,
} from 'return-fetch';

type JsonRequestInit = Omit<NonNullable<FetchArgs[1]>, 'body'> & {
  body?: object;
};

export type ResponseGenericBody<T> = Omit<
  Awaited<ReturnType<typeof fetch>>,
  keyof Body | 'clone'
> & {
  body: T;
};

export type JsonResponse<T> = T extends object
  ? ResponseGenericBody<T>
  : ResponseGenericBody<unknown>;

const parseJsonSafely = (text: string): object | string => {
  try {
    return JSON.parse(text);
  } catch (e) {
    if ((e as Error).name !== 'SyntaxError') {
      throw e;
    }

    return text.trim();
  }
};

// axios를 대체할 fetch 함수
export const returnFetchJson = (args?: ReturnFetchDefaultOptions) => {
  const fetch = returnFetch(args);

  return async <T>(
    url: FetchArgs[0],
    init?: JsonRequestInit
  ): Promise<JsonResponse<T>> => {
    const response = await fetch(url, {
      ...init,
      body: init?.body && JSON.stringify(init.body),
    });

    const body = parseJsonSafely(await response.text()) as T;

    return {
      headers: response.headers,
      ok: response.ok,
      redirected: response.redirected,
      status: response.status,
      statusText: response.statusText,
      type: response.type,
      url: response.url,
      body,
    } as JsonResponse<T>;
  };
};

const API_URL = 'https://jsonplaceholder.typicode.com/';
// fetch 기본 설정 이에요 ex) baseUrl, interceptor 추가가능
export const publicFetch = returnFetchJson({
  baseUrl: API_URL,
});

export const privateFetch = returnFetchJson({
  baseUrl: API_URL,
  interceptors: {},
});
