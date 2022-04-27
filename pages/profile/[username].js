import clientPromise from "../../lib/mongodb"

export default function username({votedMovies}) { 
    console.log(votedMovies)

    return (

        <>{votedMovies?.map(movie => { 
            return (
                <div key={movie?.id}>
                    <h1>{movie?.movie} ({ movie?.year})</h1>
                    <p>your rating for this movie was: {movie?.voters.rating}</p>
                    <p>your star r.for this movie was: {movie?.voters.star_rating}</p>
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