let endpoint = '';
const publicUrl = process.env.NEXT_PUBLIC_VERCEL_URL;

if (publicUrl !== undefined && !publicUrl.includes('localhost')) {
  endpoint = `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;
} else {
  endpoint = 'http://localhost:3001';
}

export type CacheItem<T> = {
  data?: T;
  isValidating: boolean;
  timestamp: number;
  promise?: Promise<T> | null;
  fn?: () => T;
};
export type UseDataOption = {
  revalidate?: number;
};
const cache: { [key: string]: CacheItem<unknown> } = {};

export function useData<DataType>(
  key: string,
  fetcher: (url: string) => Promise<DataType>,
  opts: UseDataOption = {}
): DataType {
  const now = Date.now();
  function mutate() {
    const cacheItem = cache[key] as unknown as CacheItem<DataType>;
    cacheItem.isValidating = true;
    return fetcher(endpoint + key).then(
      r => {
        cacheItem.isValidating = false;
        cacheItem.timestamp = Date.now();
        cacheItem.data = r;
        return r;
      },
      err => {
        cacheItem.isValidating = false;
        console.error(err);
      }
    );
  }

  const createFetcher = () => () => {
    const { data, isValidating, promise } = cache[
      key
    ] as unknown as CacheItem<DataType>;
    if (data !== undefined && !isValidating) {
      return data;
    }
    if (!promise) {
      cache[key].promise = mutate();
    }
    throw cache[key].promise;
  };

  if (!cache[key]) {
    cache[key] = {
      data: undefined,
      promise: null,
      timestamp: 0,
      isValidating: false,
    };
    cache[key].fn = createFetcher();
  } else {
    if (opts.revalidate) {
      const timeDiff = now - cache[key].timestamp;

      // revalidate
      if (timeDiff > opts.revalidate * 1000) {
        cache[key].data = undefined;
        cache[key].promise = undefined;
      }
    }
  }

  return cache[key].fn?.() as unknown as DataType;
}
