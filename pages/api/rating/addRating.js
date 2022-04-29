import clientPromise from '../../../lib/mongodb';
import { getToken,} from "next-auth/jwt"
import { getSession } from "next-auth/react"

export default async function Movies(req, res) {
    const client = await clientPromise;
    const db = await client.db(process.env.MONGODB_DB);
    const session = await getSession({ req })
    let {userEmail} = req.body
    console.log('usermeial ',userEmail)
    console.log(session)
    // Check if the User is in the DB
    const foundDBUser = await db.collection(process.env.USERS_COLLECTION).findOne({ email: session?.user?.email })
    if (!foundDBUser) { 
        return res.json({error: true, status: 'User does not exist!'})
    }

    //Check if there is session
    if (!session) {
        return res.json({ error: true, status: 'Not authorized' });
    }
    if (session?.user?.email != userEmail) { 
        return res.json({ error: true, status: 'Not authorized' });
    }




    //check if the user exists firts in the users collection
    //check if there is session
    //check if the user from getsession is the same as the user from the body request 
    //Get session in a better way *FIX

    
    

    if (req.method === 'POST') {

        let { rating, star_rating} = req.body
        let { movieID } = req.body
        console.log('uuuu ', userEmail)
        
        // if (session?.user?.email != user) {
        //     return res.json({ error: true, statusMsg: 'not authorized' });
        // }
        

        const specificMovie = await db.collection(process.env.COLLECTION).findOne({ id: movieID });
        console.log(specificMovie)
        const voters = specificMovie.voters
        console.log(voters)
        let check = false;
        
        await voters.map(vote => {
            if (userEmail == vote.userEmail) {

                check = true;
            }
        })
        
        console.log('check', check)
        if (check === true) { 
            return res.json({ error: true, statusMsg: "Users can vote only vote once for each Title!" });
        }

        
        voters.push({ userEmail, rating, star_rating})
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
        
        return res.json({ error: false, statusMsg: "Rating was updated succesfully" });

            
    }
}