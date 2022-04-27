import clientPromise from "../../lib/mongodb"

import { Button } from "@mui/material"


export default function username({votedMovies}) { 
    // console.log(votedMovies)
    //change process.env.basepath to window.location.host *IMPORTANT*   

    async function handleUpdate() { 
        const urlRequest = `https://${window.location.host}/api/rating/addrating` //change this name to handlerating
        console.log(urlRequest)
        const res = await fetch(urlRequest, {
            method: 'UPDATE',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(),
        })
        const data = await res.json();
        
  
    }


    return (

        <>{votedMovies?.map(movie => { 
            return (
                <div key={movie?.id}>
                    <h1>{movie?.movie} ({ movie?.year})</h1>
                    <p>your rating for this movie was: {movie?.voters.rating}</p>
                    <p>your star r.for this movie was: {movie?.voters.star_rating}</p>
                    <Button variant="contained" onClick={()=> handleUpdate()}>Update Vote</Button>
                </div>


            )


        })}</>
    )
}




export async function getStaticPaths() { 
    return {paths: [], fallback: true}
}

export async function getStaticProps(context) {
    const username = context.params.username + "@gmail.com"
    
    const client = await clientPromise;
    const db = await client.db(process.env.MONGODB_DB);
    const movies = await db.collection(process.env.COLLECTION).find().toArray();
    const moviesWhichTheUserHasVoted = []
    movies.map(movie => {
        movie.voters.map(vote => {
            if (vote.user === username) {
                moviesWhichTheUserHasVoted.push({ ...movie, voters: { rating: vote.rating, star_rating: vote.rating }})
                
            }
            
        })
    })
    return {
        props: {
            votedMovies: JSON.parse(JSON.stringify(moviesWhichTheUserHasVoted))
        }
    }

}