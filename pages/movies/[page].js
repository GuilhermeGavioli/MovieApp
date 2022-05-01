import clientPromise from "../../lib/mongodb";
import Head from "next/head";
import Link from "next/link";

import BasicCard from "../../components/BasicCard";

import { Grid, Box, ButtonGroup, Button } from "@mui/material";
import { useRouter } from "next/router";

export default function Movies({ movies }) {
  const page = useRouter().query.page;

  return (
    <div style={{ paddingBottom: 50 }}>
      <Head>
        <title>Movies</title>
        <link rel="icon" href="/companyLogo.ico" />
        <meta
          name="description"
          content="Movies Web Application where users can vote and increase or decrease the films rating by loging in and clicking on 'vote' button"
        ></meta>
        <meta name="keywords" content="Movie, Film, Rating"></meta>
      </Head>
      
      <Box
        sx={{
          width: "100%",
          margin: "auto",
          height: "fit-content",
          display: "flex",
          padding: 0,
          paddingBottom: 2,
        }}
      >
        <Grid
          container
          sx={{
            mt: 10,
            width: "fit-content",
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr",
            padding: 5,
            margin: "auto",
            rowGap: 2,
            columnGap: 2,
          }}
        >
          {movies?.map((movie) => {
            return <BasicCard key={movie?.id} movie={movie} />;
          })}
        </Grid>
      </Box>
      <div style={{ width: "15%", margin: "auto", display: "flex" }}>
        <ButtonGroup
          sx={{
            display: "flex",
            justifyContent: "space-between",
            borderRadius: "0",
          }}
          variant="outlined"
        >
          <Link href="/movies/1">
            <a>
              <Button
                variant={page == "1" ? "contained" : "outlined"}
                sx={{ mr: 1 }}
              >
                1
              </Button>
            </a>
          </Link>
          <Link href="/movies/2">
            <a>
              <Button
                variant={page == "2" ? "contained" : "outlined"}
                sx={{ mr: 1 }}
              >
                2
              </Button>
            </a>
          </Link>
          <Link href="/movies/3">
            <a>
              <Button
                variant={page == "3" ? "contained" : "outlined"}
                sx={{ mr: 1 }}
              >
                3
              </Button>
            </a>
          </Link>
        </ButtonGroup>
      </div>
    </div>
  );
}

export async function getStaticPaths() {
  return {
    paths: [
      { params: { page: "1" } },
      { params: { page: "2" } },
      { params: { page: "3" } },
    ],
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const page = context.params.page;
  const client = await clientPromise;
  const db = await client.db(process.env.MONGODB_DB);

  const movies = await db
    .collection(process.env.COLLECTION)
    .find()
    .sort({ metacritic: -1 })
    .limit(100)
    .toArray();
  const data = JSON.parse(JSON.stringify(movies));
  let data2;
  switch (page) {
    case "1":
      data2 = data.slice(0, 15);
      break;
    case "2":
      data2 = data.slice(15, 30);
      break;
    case "3":
      data2 = data.slice(30, 45);
      break;
  }

  return {
    props: {
      movies: data2,
    },
    revalidate: 25,
  };
}
