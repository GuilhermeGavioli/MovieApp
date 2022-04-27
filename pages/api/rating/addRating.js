import clientPromise from '../../../lib/mongodb';
import { getToken } from "next-auth/jwt"

export default async function Movies(req, res) {
    const session = await getToken({ req, secret: process.env.SECRET })
   

    if (!session) {
        return res.json({ error: true, status: 'not authorized' });
    }
    
    
    
    const client = await clientPromise;
    const db = await client.db(process.env.MONGODB_DB);

    if (req.method === 'POST') {

        let {user, rating, star_rating} = req.body
        let { movieID } = req.body
        
        if (session?.user?.email != user?.email) {
            return res.json({ error: true, statusMsg: 'not authorized' });
        }
        

        const specificMovie = await db.collection(process.env.COLLECTION).find({ id: movieID }).toArray();
        const voters = specificMovie[0].voters
        const foundVote = voters.map(vote => {
            if (vote.user == user) { 
                return true
               
            }
        })

        if (foundVote) { 
            return res.json({ error: true, statusMsg: "Users can vote only vote once for each Title!" });
        }
       
        

        voters.push({user, rating, star_rating})
        await db.collection(process.env.COLLECTION).updateOne({ id: movieID }, { $set: {voters: voters}});
        
        return res.json({ error: false, statusMsg: 'ok'});

    }
}