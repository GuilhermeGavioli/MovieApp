import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

import {
  Button,
  Box,
  Typography,
  Slider,
  Rating,
  Stack,
  LinearProgress,
  Alert,
  AlertTitle,
} from "@mui/material";

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { signIn, useSession } from "next-auth/react";

export default function Home({ movie, basePath}) {
  const { data: session } = useSession();
  const router = useRouter();
  const [ableVoting, setAbleVoting] = useState(false);
  const [sliderValue, setSliderValue] = useState(75);
  const [starRating, setStarRating] = useState(3.5);
  const [responseStatus, setResponseStatus] = useState();

  let rating = 0;
  let starRatingCount = 0;

  const metacriticBlockProperties = {
    fontSize: 19,
    position: "absolute",
    bottom: 0,
    height: "fit-content",
    width: "fit-content",
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    flexDirection: "column",
    textAlign: "center",
    color: "whitesmoke",
    padding: "10px 14px 10px 14px",
  };

  async function handleRatingRequest() {
    const user = session?.user?.email;
    const dataToBeSent = {
      user,
      rating: sliderValue,
      star_rating: starRating,
      movieID: movie.id,
    };
    const res = await fetch(`${basePath}/api/rating/addRating`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dataToBeSent),
    });
    const data = await res.json();
    if (data.status == "ok") {
      setResponseStatus(true);
    } else {
      setResponseStatus(false);
    }
  }

  if (router.isFallback) {
    return (
      <Stack
        sx={{
          position: "absolute",
          left: 0,
          width: "100%",
          color: "rgb(253,70, 4)",
        }}
      >
        <LinearProgress color="error" />
      </Stack>
    );
  }

  return (
    <div>
      <Head>
        <title>{movie?.movie}</title>
        <meta name="description" content="Here you can find a Specific Movie" />
        <meta name="keywords" content={`Movie, Film, ${movie?.movie}`}></meta>
        <link rel="icon" href="/companyLogo.ico" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
      </Head>

      <Box
        sx={{
          width: "60%",
          height: "fit-content",
          margin: "auto",
          padding: "15px 50px 30px 50px",
        }}
      >
        <Typography variant="h3" fontWeight={500} mb={2} mt={2}>
          {movie?.movie}
        </Typography>
        <div
          style={{
            display: "flex",
            justifyContent: "start",
            height: "fit-content",
            position: "relative",
          }}
        >
          <Image src={movie?.img_src} width={260} height={400} alt="movie poster" />

          {movie?.voters?.map((vote) => {
            rating = rating + vote?.rating;
          })}

          {!rating ? (
            <Box
              sx={{
                bgcolor: "rgb(65,120,135)",
                ...metacriticBlockProperties,
                padding: 0.5,
              }}
            >
              <Typography sx={{ fontWeight: 500, fontSize: 15 }}>
                no votes yet
              </Typography>
            </Box>
          ) : (
            <Box
              sx={metacriticBlockProperties}
              style={
                rating / movie?.voters?.length > 70
                  ? { backgroundColor: "rgb(56,142,60)" }
                  : { backgroundColor: "rgb(244,67,54)" }
              }
            >
              <Typography sx={{ fontWeight: 500 }}>
                {parseInt(rating / movie?.voters?.length)}{" "}
              </Typography>
            </Box>
          )}

          <div style={{ marginLeft: 15, height: "120px" }}>
            <Typography mt={1} mb={1.5}>
              Year: {movie?.year}
            </Typography>
            <Typography>Director: {movie?.director}</Typography>
            <Typography mt={1} mb={1.5}>
              Genre: {movie?.genre}
            </Typography>
            <Typography mt={1} mb={1.5}>
              Rating Average: {parseInt(rating / movie?.voters?.length)}
            </Typography>

            {movie?.voters?.map((vote) => {
              starRatingCount = starRatingCount + vote?.star_rating;
            })}
            <Typography mt={1} mb={1.5}>
              Stars Average: {parseInt(starRatingCount / movie?.voters?.length)}
            </Typography>
          </div>
        </div>
        <Typography mt={2} mb={2}>
          {movie?.description}
        </Typography>

        <Button variant="contained">
          <Link href="/">
            <a>Go back to movies</a>
          </Link>
        </Button>

        <Button
          variant="text"
          sx={{ float: "right" }}
          onClick={() =>
            session ? setAbleVoting(!ableVoting) : signIn("google")
          }
        >
          vote
        </Button>

        <Box sx={{ mt: 6, mb: 8, height: 30 }}>
          {ableVoting ? (
            <>
              <Slider
                sx={{ mb: 2 }}
                valueLabelDisplay="on"
                defaultValue={50}
                onChange={(e) => setSliderValue(e.target.value)}
              />

              <Rating
                size="large"
                precision={0.5}
                name="valueHating"
                onChange={(e) => setStarRating(e.target.value)}
              />

              <Button
                variant="contained"
                color="success"
                sx={{ float: "right" }}
                onClick={() => handleRatingRequest()}
              >
                send
              </Button>
            </>
          ) : (
            <></>
          )}

          {responseStatus ? (
            <Alert severity="success" sx={{ mt: 7, mb: 7 }}>
              <AlertTitle>Success</AlertTitle>
              Your rating has been <strong>successfully</strong> sent
            </Alert>
          ) : (
            <></>
          )}

          {responseStatus === false ? (
            <Alert severity="error" sx={{ mt: 7, mb: 7 }}>
              <AlertTitle>Error</AlertTitle>
              Your rating has <strong>failed</strong>. Please, try again.
            </Alert>
          ) : (
            <></>
          )}
        </Box>
      </Box>
    </div>
  );
}


export async function getStaticProps(context) {
  
  const id = context.params.id;
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/movie/${id}`);
  const data = await res.json();
  return {
    props: { movie: data, basePath: process.env.BASE_PATH},
    revalidate: 20,
  };
}

export async function getStaticPaths() {
  
  return {
    paths: [
      // {
      //   params: { id: "1" },
      // },
      // {
      //   params: { id: "2" },
      // }
    ],
    fallback: true,
  };
}