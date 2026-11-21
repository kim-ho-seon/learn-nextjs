import Link from "next/link";

export const metadata = {
  title: "HOME",
};

export const API_URL = "https://nomad-movies-2.nomadcoders.workers.dev/movies"

async function getMovies(){
  // await new Promise((resolve)=>setTimeout(resolve, 1000))
  const response = await fetch(API_URL);
  const json = await response.json();
  return json;
}

export default async function HomePage() {
  const movies = await getMovies();
  return (
    // <div>{JSON.stringify(movies)}</div>
    <div>
      {movies.map((movie)=>(
        <li key={movie.id}>
          <Link href={`/movies/${movie.id}`}>{movie.title}</Link>
        </li>
      ))}
    </div>
  );
}

/*
[Server Side Fetch: Server Component + async/await 방식]

■ 동작 방식
- "use client"가 없으므로 server component → 서버에서 fetch한 뒤 데이터가 채워진 HTML을 브라우저로 보냄
- 컴포넌트 자체를 async 함수로 만들고 await getMovies()로 데이터를 받음
- useState, useEffect, isLoading 같은 상태 관리가 필요 없음

■ 장점 (client fetch 방식과 비교)
1. server component이므로 metadata를 export할 수 있음
2. server component의 코드는 서버에서만 실행되고, 클라이언트(브라우저)는 이 코드를 확인할 수 없음
   → 원하는 어떤 데이터든 fetch할 수 있고, API key를 넣은 API 사용과 DB 직접 통신이 가능함
3. 처음 받은 HTML에 데이터가 들어 있음 → SEO에 유리
4. Next.js가 fetch된 URL의 결과를 자동으로 캐싱해 줌 → React Query 같은 라이브러리가 필요 없음
   - 처음 한 번은 로딩이 있지만, 이후에는 Next.js가 fetch한 결과를 기억하고 있어서
     같은 URL을 두 번 fetch하지 않음 → 빠르게 느껴짐

■ "두 번 fetch하지 않는다"의 의미
- 처음 fetch(URL)을 하면 Next.js가 응답 결과를 서버에 저장함 (Data Cache)
- 다음 요청에서 같은 URL을 fetch하면 실제 API로 다시 요청하지 않고 저장된 결과를 바로 꺼내 씀
- 한 번 렌더링하는 동안 같은 URL을 여러 곳(metadata, page 등)에서 fetch해도 실제 요청은 한 번만 일어남
- 브라우저도 방문했던 페이지 결과를 잠시 기억하므로, Link로 다른 페이지에 갔다가 Home으로 돌아오면 바로 보임
- 단, 캐싱되는 건 fetch 결과뿐 → setTimeout 지연은 매번 다시 실행됨 (개발 모드에서 새로고침하면 다시 10초 기다림)
- fetch 자동 캐싱은 Next 14 기본 동작이고, Next 15부터는 기본값이 캐싱 안 함으로 바뀜
*/
