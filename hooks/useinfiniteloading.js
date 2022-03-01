import useSWRInfinite from "swr/infinite";

export default function useInfiniteLoading(getKey, fetcher, options) {
  let { data, size, ...rest } = useSWRInfinite(getKey, fetcher, options);

  let isLoadingMore = size > 0 && data && typeof data[size - 1] === "undefined";

  return { data, size, isLoadingMore, ...rest };
}
