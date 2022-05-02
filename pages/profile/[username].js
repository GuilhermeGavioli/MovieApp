import Image from "next/image";
import Head from "next/head";

import clientPromise from "../../lib/mongodb";

import {
  Button,
  Slider,
  Box,
  Typography,
  Rating,
  CircularProgress,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import DeleteIcon from "@mui/icons-material/Delete";

import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";


export default function Username({ votedMovies, basepath, error, foundUser }) { //remove foundUser
  const [showRatingBox, setShowRatingBox] = useState([]);
  const [sliderValue, setSliderValue] = useState(65);
  const [starValue, setStarValue] = useState(3);
  const { data: session } = useSession();
  const router = useRouter();

  if (router.isFallback) {
    return (
      <Box
        sx={{
          margin: "auto",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress sx={{ mt: 15, color: "orange" }} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        sx={{
          margin: "auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 15,
        }}
      >
        <Head>
          <title>404</title>
          <link rel="icon" href="/companyLogo.ico" />
        </Head>

        <Box sx={{ margin: "auto" }}>
          <Typography sx={{ textAlign: "center" }}>
            User {router.query.username} does not exit...
          </Typography>
        </Box>
        <Box sx={{ margin: "auto" }}>
          <Button
            variant="contained"
            sx={{ mt: 3 }}
            onClick={() => router.push("/movies/1")}
          >
            Go to movies
          </Button>
        </Box>
      </Box>
    );
  }

  // If user has no ratings...
  if (votedMovies.length == 0) {
    return (
      <Box
        sx={{
          margin: "auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 15,
        }}
      >
        <Head>
          <title>Profile</title>
          <link rel="icon" href="/companyLogo.ico" />
        </Head>

        <Box sx={{ margin: "auto" }}>
          <Typography sx={{ textAlign: "center" }}>
            {router.query.username} has no ratings to be shown yet...
          </Typography>
        </Box>
        <Box sx={{ margin: "auto" }}>
          <Button
            variant="contained"
            sx={{ mt: 3 }}
            onClick={() => router.push("/movies/1")}
          >
            Go to movies
          </Button>
        </Box>
      </Box>
    );
  }

  //change process.env.basepath to window.location.host *IMPORTANT*
  async function handleUpdate(movieID) {
    const urlRequest = `${basepath}/api/ratings/handleratings`; //change this name to handlerating
    const res = await fetch(urlRequest, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userEmail: session?.user?.email,
        newRating: sliderValue,
        newStarRating: parseFloat(starValue),
        movieID,
      }),
    });
    const data = await res.json();
    if (data.error === false) {
        window.alert("Rating was updated succesfully");
        router.reload();
    } else {
      window.alert("request failed. Try again");
    }
  }

  async function handleDelete(movieID, ratingID) {
    const urlRequest = `${basepath}/api/ratings/handleratings`; //change this name to handlerating
    const res = await fetch(urlRequest, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userEmail: session?.user?.email,
        movieID,
        id: ratingID,
      }),
    });
    const data = await res.json();
    if (data.error === false) {
        window.alert("Succefully deleted");
        router.reload();
    } else {
      window.alert("request failed. Try again");
    }
  }

  return (
    <div style={{ width: "100%", height: "fit-content", margin: "auto" }}>
      <Head>
        <title>Profile</title>
        <link rel="icon" href="/companyLogo.ico" />
        <meta name="description" content=""></meta>
        <meta name="keywords" content="Movie, Film, Rating, Profile"></meta>
      </Head>

      <Box sx={{ paddingTop: 10, width: "40%", margin: "auto", mb: 8 }}>
        {showRatingBox ? (
          <>
            <Typography>
              {showRatingBox[0]
                ? showRatingBox[0] + "(" + showRatingBox[1] + ")"
                : ""}
            </Typography>
            {showRatingBox[2] ? (
              <div>
                <Image
                  width={90}
                  height={125}
                  src={showRatingBox[2]}
                  alt="movieimg"
                />
                <Slider
                  size="medium"
                  valueLabelDisplay="on"
                  defaultValue={65}
                  sx={{ color: "orange" }}
                  onChange={(e) => setSliderValue(e.target.value)}
                />
                <Rating
                  size="medium"
                  precision={0.5}
                  name="valueHating"
                  sx={{ mt: 3 }}
                  defaultValue={3}
                  onChange={(e) => setStarValue(e.target.value)}
                />
                <Button
                  sx={{ float: "right", fontWeight: 700, mt: 2 }}
                  variant="contained"
                  onClick={() => handleUpdate(showRatingBox[3])}
                >
                  Update
                </Button>
              </div>
            ) : (
              <></>
            )}
          </>
        ) : (
          <></>
        )}
      </Box>
      {votedMovies?.map((movie) => {
        return (
          <Box
            key={movie?.id}
            sx={{
              bgcolor: "white",
              width: "98%",
              mt: 1,
              mb: 1,
              padding: 1,
              margin: "auto",
              color: "rgb(60,60,60)",
              justifyContent: "center",
              alignItems: "center",
              "&:hover": { cursor: "pointer", bgcolor: "whitesmoke" },
            }}
            onClick={() => {
              if (
                session?.user?.email ===
                router.query.username + "@gmail.com"
              ) {
                setShowRatingBox([
                  movie?.movie,
                  movie?.year,
                  movie?.img_src,
                  movie?.id,
                ]);
                window.scrollTo(0, 0);
              }
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Box sx={{ width: "30%", maxWidth: "30%" }}>
                <Typography
                  sx={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {movie?.movie} ({movie?.year})
                </Typography>
              </Box>
              <Box sx={{ width: "20%" }}>
                <Typography>Rating: {movie?.voters?.rating}</Typography>
              </Box>
              <Box sx={{ width: "20%" }}>
                <Typography
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                  }}
                >
                  <span style={{ color: "orange", fontSize: 5 }}>
                    <StarIcon />
                  </span>
                  <span>{movie?.voters?.star_rating}</span>
                </Typography>
                    </Box>
                    { session?.user?.email === router.query.username + "@gmail.com" ?
                        <Box>
                            
                            <DeleteIcon
                                sx={{ color: "rgb(120,120,120)" }}
                                onClick={() => handleDelete(movie?.id, movie?.voters?.id)}
                            />
                        </Box>
                        :<></>
                    }
            </Box>
          </Box>
        );
      })}
      <Button
        variant="contained"
        sx={{ float: "right", mt: 3, fontWeight: 700 }}
        onClick={() => router.push("/movies/1")}
      >
        Go back to Movies
      </Button>
    </div>
  );
}

export async function getStaticPaths() {
    const client = await clientPromise;
    const db = await client.db(process.env.MONGODB_DB);
    const allUsers = await db.collection(process.env.USERS_COLLECTION).find().limit(50000).toArray();
    const names = allUsers.map(user => { 
        return { params: {username: user.email.split("@gmail.com")[0]}}
    })

    return {
        paths: names,
        fallback: true
    };
}

export async function getStaticProps(context) {
    const client = await clientPromise;
    const db = await client.db(process.env.MONGODB_DB);

    const userEmail = context.params.username + "@gmail.com"
    const foundUser = JSON.parse(JSON.stringify(await db.collection(process.env.USERS_COLLECTION).findOne({ email: userEmail })));

    if (!foundUser) { 
        return { props: { error: true } }
    }


    const movies = JSON.parse(JSON.stringify(await db.collection(process.env.COLLECTION).find().toArray()));
    const moviesWhichTheUserHasVoted = []
    movies.map(movie => {
        movie.voters.map(vote => {
            if (vote.userEmail === userEmail) {
                moviesWhichTheUserHasVoted.push({ ...movie, voters: { id: vote.id, rating: vote.rating, star_rating: vote.star_rating }}) 
            }
        })
    })


  return {
    props: {
      foundUser: { ...foundUser, email: null },
      votedMovies: moviesWhichTheUserHasVoted,
      basepath: process.env.BASE_PATH,
    },
    revalidate: 10,
  };
}
