import clientPromise from '../../../lib/mongodb';

import { getSession } from "next-auth/react"
import { v4 as uuidv4 } from 'uuid';

export default async function Movies(req, res) {
    const client = await clientPromise;
    const db = await client.db(process.env.MONGODB_DB);
    const session = await getSession({ req })
    let {userEmail} = req.body
    
    
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
        
        

        const specificMovie = await db.collection(process.env.COLLECTION).findOne({ id: movieID });
        if (!specificMovie) return res.json({error: true, statusMsg: 'Sorry, no movie with that id was found'})
      
        const voters = specificMovie.voters
    
        let check = false;
        
        await voters.map(vote => {
            if (userEmail == vote.userEmail) {

                check = true;
            }
        })
        
        if (check === true) { 
            return res.json({ error: true, statusMsg: "Users can vote only vote once for each Title!" });
        }

        
        voters.push({id: uuidv4(), userEmail, rating, star_rating})
        await db.collection(process.env.COLLECTION).updateOne({ id: movieID }, { $set: {voters: voters}});
        
        return res.json({ error: false, statusMsg: 'ok'});

    }


    if (req.method === 'PUT') {


        const { userEmail, newRating, newStarRating, movieID } = req.body
        const foundMovie = await db.collection(process.env.COLLECTION).find({ id: movieID }).toArray();
        if (!foundMovie) return res.json({error: true, statusMsg: 'Sorry, no movie with that id was found'})

        const votes = foundMovie[0].voters
        votes.map(vote => {
            if (vote.userEmail === userEmail) {
                vote.rating = newRating;
                vote.star_rating = newStarRating;
            }
        })
    
        await db.collection(process.env.COLLECTION).updateOne({ id: movieID }, {$set: {voters: votes}})
        return res.json({ error: false, statusMsg: "Rating was updated succesfully" });

            
    }

    if (req.method === 'DELETE') {

        const { id, movieID } = req.body
        
        const foundMovie = await db.collection(process.env.COLLECTION).find({ id: movieID }).toArray();
        if (!foundMovie) return res.json({error: true, statusMsg: 'Sorry, no movie with that id was found'})


        const votes = foundMovie[0].voters
        let check = false;
        const newVotes = await votes.map(vote => {
            if (vote.userEmail === userEmail && vote.id === id) {
                check = true;
            } else {
                return vote
            }
        })
        //eliminar items undefined ta novaArray
        const newestVotes = await newVotes.filter(item => {
            if (item != undefined) return item
        })
     
        if (check) { 
            await db.collection(process.env.COLLECTION).updateOne({ id: movieID }, { $set: {voters: newestVotes}});
            return res.json({ error: false, statusMsg: 'ok'});

        }

        res.json({error: true, statusMsg: 'Ops, something went wrong...'})
    }



}