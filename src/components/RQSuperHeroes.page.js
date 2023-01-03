import React from "react";
import { useQuery } from "react-query";
import axios from "axios";

//react query 를 사용해서 데이터를 fetching 하는 가장 기본적인 방법
const fetchSuperHeroes = () => {
  return axios.get("http://localhost:4000/superheroes");
};

export const RQSuperHeroesPage = () => {
  const onSuccess = (data) => {
    console.log("perform side effect afeter data fetching", data);
  };

  const onError = (error) => {
    console.log("perform side effect afeter encountering error", error);
  };

  const { isLoading, data, isError, error, isFetching, refetch } = useQuery(
    "super-heroes",
    fetchSuperHeroes,
    {
      onSuccess,
      onError,
      select: (data) => {
        const superHeroNames = data.data.map((hero) => hero.name);
        return superHeroNames;
      },
    }
  );

  // {
  //   refetchOnMount: true, //주석의 개념들은 한국어 설명을 찾아봐야 함!!
  //   refetchOnWindowFocus: true, //true, false, always

  //   cacheTime: 5000,
  //   staleTime: 30000,

  //   refetchInterval: 1000,

  //   enabled: false
  // }

  console.log({ isLoading, isFetching });

  if (isLoading || isFetching) {
    return <h2>Loading . . .</h2>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return (
    <>
      <h2>RQ SUper Heroes page</h2>
      <button onClick={refetch}>Fetch heroes</button>
      {/* {data?.data.map((hero) => {
        return <div key={hero.name}>{hero.name}</div>;
      })} */}
      {data.map((heroName) => {
        return <div key={heroName}>{heroName}</div>;
      })}
    </>
  );
};
