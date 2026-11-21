"use client"

import { useEffect, useState } from "react";

export default function Page() {
  const [isLoading, setIsLoading] = useState(true)
  const [movies, setMovies] = useState([])
  const getMovies = async()=>{
    const response = await fetch("https://nomad-movies-2.nomadcoders.workers.dev/movies")
    const json = await response.json()
    setMovies(json)
    setIsLoading(false)
  }
  useEffect(()=>{
    getMovies()
  },[])
  return (
    <div>
    {isLoading? "Loading..." : JSON.stringify(movies)}
    </div>
  );
}


/*
[Client Side Fetch: useEffect + useState 방식]:client에서 React가 작동하기 때문에 React앱이 항상 API를 사용

■ 동작 방식
- "use client"이므로 브라우저(client)에서 React가 동작하고, 브라우저가 API를 직접 호출함
- 순서: 첫 렌더링(비어 있음, "Loading...") → useEffect 실행 → fetch → setState → 다시 렌더링

■ 한계
1. client 컴포넌트에서는 metadata를 export할 수 없음
2. API key 같은 비밀 값을 넣을 수 없음 (브라우저에 그대로 노출됨)
   → 그래서 DB와 직접 통신할 수 없고, 안전한 환경에 있는 API를 거쳐야 함
   React App <====> API <====> DB (backend developer)
3. 처음 받은 HTML에는 데이터가 없음 → SEO에 불리하고 화면이 늦게 뜸
4. Loading 상태를 직접 구현해야 함 (isLoading state)
5. 처음 컴포넌트는 비어 있으므로 데이터를 담을 useState가 항상 필요함
6. 에러 처리(try/catch, response.ok 확인)도 직접 해야 함 (현재 코드에는 없음)

■ Next.js 방식 (Server Component)
- "use client"를 빼고 async 컴포넌트 안에서 await fetch() 사용
- 서버에서 fetch하므로 API key와 DB 접근이 안전하고, useState/useEffect가 필요 없음
- Next.js가 fetch 결과를 캐싱해 줌
*/
