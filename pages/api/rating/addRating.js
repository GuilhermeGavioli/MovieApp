import clientPromise from '../../../lib/mongodb';
import { getToken } from "next-auth/jwt"

export default async function Movies(req, res) {
    const session = await getToken({ req, secret: process.env.SECRET })
    // console.log(session)
    
    //check if the user exists firts in the users collection
    //Get session in a better way *FIX
    // if (!session) {
    //     return res.json({ error: true, status: 'not authorized' });
    // }

    
    
    const client = await clientPromise;
    const db = await client.db(process.env.MONGODB_DB);

    if (req.method === 'POST') {

        let {user, rating, star_rating} = req.body
        let { movieID } = req.body
        
        // if (session?.user?.email != user) {
        //     return res.json({ error: true, statusMsg: 'not authorized' });
        // }
        

        const specificMovie = await db.collection(process.env.COLLECTION).find({ id: movieID }).toArray();
        const voters = specificMovie[0].voters
        
        let check = false;
        await voters.map(vote => {
            if (user == vote.user) {
                check = true;
            }
        })
        if (check === true) { 
            return res.json({ error: true, statusMsg: "Users can vote only vote once for each Title!" });
        }

        

        
        

        voters.push({user, rating, star_rating})
        await db.collection(process.env.COLLECTION).updateOne({ id: movieID }, { $set: {voters: voters}});
        
        return res.json({ error: false, statusMsg: 'ok'});

    }


    if (req.method === 'PUT') {
        console.log('received');
        console.log(req.body)
        const { userEmail, newRating, newStarRating, movieID } = req.body
        
        const foundMovie = await db.collection(process.env.COLLECTION).find({ id: movieID }).toArray();
        const votes = foundMovie[0].voters
        votes.map(vote => {
            if (vote.user === userEmail) {
                vote.rating = newRating
                vote.star_rating = newStarRating
            }
        })
        // e se tiver mais votos // worked

      

        await db.collection(process.env.COLLECTION).updateOne({ id: movieID }, {$set: {voters: votes}})
        
        return res.json({ received: true });

            
    }
}