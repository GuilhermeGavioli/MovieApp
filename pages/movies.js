import clientPromise from "../lib/mongodb";
import Head from "next/head";

import BasicCard from "../components/BasicCard";

import {Grid, Box} from "@mui/material";


export default function Movies({ movies }) {
  return (
    <div>
      <Head>
        <title>Movies</title>
        <link rel="icon" href="/companyLogo.ico" />  
        <meta name="description" content="Movies Web Application where users can vote and increase or decrease the films rating by loging in and clicking on 'vote' button"></meta>
        <meta name="keywords" content="Movie, Film, Rating"></meta>


      </Head>

      <Box
        sx={{
          width: "100%",
          margin: "auto",
          height: "fit-content",
          display: "flex",
          padding: 0,
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
          {movies.map((movie) => {
            return <BasicCard key={movie.id} movie={movie} />;
          })}
        </Grid>
      </Box>
    </div>
  );
}

export async function getStaticProps(context) {
  const client = await clientPromise;
  const db = await client.db("newProject");

  const movies = await db
    .collection("new")
    .find()
    .sort({ metacritic: -1 })
    .limit(10)
    .toArray();
  const data = JSON.parse(JSON.stringify(movies));

  return {
    props: {
      movies: data,
    },
    revalidate: 25,
  };
}
