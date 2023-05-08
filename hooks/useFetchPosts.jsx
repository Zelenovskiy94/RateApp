import { useInfiniteQuery } from "@tanstack/react-query";

export default function useFetchPosts(sort = 'DESC', filters = [], search = '') {
  const getPosts = async ({ pageParam = 1 }) => {
    let categories = filters.categories ? filters.categories.toString() : '';
    if(Array.isArray(filters)) {

    }
    const res = await (
      await fetch(
        `https://ratemycasino.ca/wp-json/custom/v1/posts?per_page=10&page=${pageParam}&lang=en&order=${sort}&category=${categories}&s=${search}`
      )
    ).json();

    return {
      data: res,
      nextPage: pageParam + 1,
    };
  };

  const { data, isLoading, isError, hasNextPage, fetchNextPage, refetch,  reset } = useInfiniteQuery(
    ["posts", sort, filters, search],
    getPosts,
    {
      getNextPageParam: (lastPage) => {
        if (lastPage.data.length < 10) return undefined;
        return lastPage.nextPage;
      },
    }
  );

  return { data, isLoading, isError, hasNextPage, fetchNextPage, refetch, reset };
}