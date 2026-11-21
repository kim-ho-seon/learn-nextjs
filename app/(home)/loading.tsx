export default function Loading(){

  return(
    <h2>Loading...</h2>
  )
}

/*
■ loading.tsx란? (파일 이름 규칙 = Next.js가 자동으로 인식)
- 파일 이름을 반드시 loading.tsx로 만들어야 하고, page.tsx와 같은 폴더에 두면 됨
- page.tsx에서 import하거나 직접 연결할 필요가 없음 → Next.js가 알아서 찾아서 적용함
- page가 아직 준비 중(await 중)이면 → Next.js가 자동으로 Loading 컴포넌트를 보여줌
- page가 준비되면 → Next.js가 자동으로 Loading 컴포넌트를 page 컴포넌트(HomePage)로 바꿔줌
- 개발자는 isLoading state나 조건문(isLoading ? ... : ...)을 직접 만들 필요가 없음
  (_client-fetch/page.tsx에서는 isLoading을 직접 관리했던 것과 비교)

■ loading.tsx 동작 순서 (같은 폴더의 page.tsx에 자동 적용)
1. 브라우저가 "/"를 요청함
2. 서버는 page.tsx가 끝나기를 기다리지 않고, layout(Navigation) + loading.tsx 화면을 먼저 보냄
   → 화면에 "Loading..."이 보임 (metadata의 탭 제목 "HOME | Next Movies"도 이때 적용됨)
3. 그동안 서버에서 HomePage 실행: setTimeout 10초 대기 → fetch(URL) → 데이터 준비
4. 준비가 끝나면 서버가 완성된 page 내용을 같은 응답으로 이어서 보냄 (streaming)
5. 브라우저가 "Loading..." 자리를 page 내용으로 교체함 → Home 화면이 보임
- Next.js가 내부적으로 page.tsx를 <Suspense fallback={<Loading />}>으로 감싸 주는 것과 같음
- layout(Navigation)은 바뀌지 않고, page 영역만 Loading → Home으로 바뀜

■ 주의
- loading.tsx가 없으면 서버에서 데이터를 다 받을 때까지 브라우저는 화면을 바꾸지 않고 기다림
  (지금은 setTimeout 10초로 일부러 지연시켜 확인 중)
*/