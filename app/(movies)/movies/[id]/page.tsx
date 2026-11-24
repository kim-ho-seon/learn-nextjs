import { Suspense } from "react";
import MovieInfo from "../../../../components/movie-info";
import MovieVideos from "../../../../components/movie-videos";

export default async function MovieDetail({
  params:{id},
}:{
  params:{id:string},
}){
  // const [movie, videos] = await Promise.all([getMovie(id),getVideos(id)])
  // promise 사용 시 병렬로 데이터를 fetch하지만, 두개가 완료되어야 render => suspense 병렬시작 각각 render
  return (
  <div>
    <Suspense fallback={<h1>Loading movie info</h1>}>
      <MovieInfo id={id}/>
    </Suspense>
    <Suspense fallback={<h1>Loading movie videos</h1>}>
      <MovieVideos id={id}/>
    </Suspense>
  </div>
  );
}