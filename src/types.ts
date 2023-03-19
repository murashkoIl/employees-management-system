import {
  ApolloCache,
  DefaultContext,
  MutationUpdaterFunction,
} from "@apollo/client";

export type CacheUpdaterFunction<T, K> = MutationUpdaterFunction<
  T,
  K,
  DefaultContext,
  ApolloCache<unknown>
>;
