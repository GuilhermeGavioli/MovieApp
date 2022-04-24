import Link from "next/link";

// import * as React from 'react';
import {
  Button,
  Typography,
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
} from "@mui/material";

export default function BasicCard({ movie }) {
  let ratingMedia = 0;
  const elipsisStyle = {
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "nowrap",
  };

  return (
    <Link href={`/movie/${movie.id}`}>
      <a>
        <Card
          sx={{
            minWidth: 200,
            width: 200,
            backgroundColor: "rgb(35,35,35)",
            color: "rgb(200,200,200)",
            position: "relative",
            "&:hover": { transform: "scale(1.1)" },
            transition: "0.15s",
          }}
          variant="contained"
        >
          <CardContent>
            <Typography
              variant="h2"
              component="div"
              sx={{ mb: 1, fontSize: 18, ...elipsisStyle }}
            >
              {movie?.movie} ({movie.year})
            </Typography>

            <Typography sx={{ fontSize: 12, ...elipsisStyle }}>
              genre: {movie?.genre}
            </Typography>
          </CardContent>
          <CardMedia
            component="img"
            height={170}
            image={movie?.img_src}
            sx={{ maxWidth: 130, maxHeight: 170, margin: "auto" }}
          />
          <CardContent>
            <div
              style={{
                height: "85px",
                width: "100%",
                ...elipsisStyle,
                maxHeight: "100px",
                whiteSpace: "normal",
                overflowY: "scroll",
                boxSizing: "border-box",
                padding: "2px 5px 2px 5px",
              }}
            >
              <Typography sx={{ fontSize: 12 }}>
                {movie?.description}
              </Typography>
            </div>
          </CardContent>

          <CardActions>
            <Button
              size="small"
              variant="text"
              sx={{ color: "rgb(144,202,249)", fontWeight: 700 }}
            >
              See More
            </Button>

            <Box>
              {movie?.voters?.map((vote) => {
                ratingMedia = ratingMedia + vote.rating;
              })}
              <Box
                style={
                  ratingMedia / movie?.voters?.length > 70
                    ? { color: "rgb(56,142,60)" }
                    : { color: "rgb(244,67,54)" }
                }
              >
                {!ratingMedia ? (
                  <Typography
                    sx={{
                      fontWeight: 600,
                      ml: 3,
                      fontSize: 12,
                      color: "rgb(65,120,135)",
                    }}
                  >
                    no votes yet
                  </Typography>
                ) : (
                  <Typography sx={{ fontWeight: 700, ml: 8, fontSize: 19 }}>
                    {parseInt(ratingMedia / movie?.voters?.length)}
                  </Typography>
                )}
              </Box>
            </Box>
          </CardActions>
        </Card>
      </a>
    </Link>
  );
}
