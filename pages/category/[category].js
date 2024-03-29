import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import useInfiniteLoading from "../../hooks/useinfiniteloading";
import useObserver from "../../hooks/useobserver";
import { CircularProgress } from "@mui/material";
import useScreenSize from "../../hooks/useScreenSize";

export default function () {
  let width = useScreenSize();

  let {
    query: { category },
  } = useRouter();

  let fetcher = url => axios.get(url).then(res => res.data);

  let getKey = (pageIndex, previousPageData) => {
    if (previousPageData && !previousPageData.length) return null;
    return `/api/category/${category}?page=${pageIndex}&limit=${6}`;
  };

  let { data, error, size, setSize, isLoadingMore } = useInfiniteLoading(getKey, fetcher, { suspense: true });

  let ref = useObserver(() => {
    if (!isLoadingMore) setSize(size + 1);
  }, [category, size, isLoadingMore]);

  function NewsCard({ source_id, title, video_url, description, image_url, link, pubDate, content }) {
    return (
      <Card className="mb-20 mx-10">
        <CardMedia component="img" height="140" image={image_url} alt="green iguana" />
        <CardContent>
          <Typography className="font-bold" gutterBottom variant="h4" component="div">
            {source_id}
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            {pubDate}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Share</Button>
          <Button onClick={() => window.open(link)} size="small">
            Learn More
          </Button>
        </CardActions>
      </Card>
    );
  }

  return (
    <div>
      <Head>
        <title>{category}</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex flex-col ml-56 p-16 ">
        {error ? (
          <div>error</div>
        ) : data[0].length === 0 ? (
          <div>No data</div>
        ) : (
          <>
            <div className={width > 900 ? "grid grid-cols-2" : "flex flex-col"}>
              {data.map(arr => {
                return arr.map((el, i) => <NewsCard key={i} {...el} />);
              })}
            </div>
            <div ref={ref}></div>
            {isLoadingMore && (
              <div className="w-full flex items-center justify-center">
                <CircularProgress />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
