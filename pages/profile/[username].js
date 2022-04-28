import clientPromise from "../../lib/mongodb"

import { Button } from "@mui/material"
import { useSession } from "next-auth/react"

// `${window.location.host}/api/rating/addrating`
export default function Username({votedMovies}) {
    const { data: session } = useSession();
    console.log(session)
    //change process.env.basepath to window.location.host *IMPORTANT*   

    async function handleUpdate(movieID) { 
        const urlRequest = "http://localhost:3000/api/rating/addRating" //change this name to handlerating
        const res = await fetch(urlRequest, {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userEmail: session?.user?.email, newRating: 50, newStarRating: 2.5, movieID}),
        })
        const data = await res.json();
        console.log(data)
       
        
  
    }


    return (

        <>{votedMovies?.map(movie => { 
            return (
                <div key={movie?.id}>
                    <h1>{movie?.movie} ({ movie?.year})</h1>
                    <p>your rating for this movie was: {movie?.voters.rating}</p>
                    <p>your star r.for this movie was: {movie?.voters.star_rating}</p>
                    <Button variant="contained" onClick={()=> handleUpdate(movie?.id)}>Update Vote</Button>
                </div>


            )


        })}</>
    )
}




export async function getStaticPaths() { 
    //get all users profiles
    const client = await clientPromise
    const db = await client.db(process.env.MONGODB_DB);
    const allUsers = await db.collection(process.env.USERS_COLLECTION).find().toArray();
    const allUsersEmails = allUsers.map((user) => { 
        return user.email
    })
    
    console.log('aaalll ', allUsersEmails)
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