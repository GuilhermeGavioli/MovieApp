import clientPromise from "../../../lib/mongodb"

export default async function Profile(req, res) { 
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB)
   
    const userEmail = req.query.username + "@gmail.com"
    const foundUser = JSON.parse(JSON.stringify(await db.collection(process.env.USERS_COLLECTION).findOne({ email: userEmail })));

    if (!foundUser) {
        return res.json({error: true, statusMsg: "No user found with that name"})
    }


    const movies = await db.collection(process.env.COLLECTION).find().toArray();
    const moviesWhichTheUserHasVoted = []
    movies.map(movie => {
        movie.voters.map(vote => {
            if (vote.userEmail === userEmail) {
                moviesWhichTheUserHasVoted.push({ ...movie, voters: { rating: vote.rating, star_rating: vote.star_rating }}) 
            }
        })
    })



    return res.json({ foundUser, moviesWhichTheUserHasVoted  })


}




