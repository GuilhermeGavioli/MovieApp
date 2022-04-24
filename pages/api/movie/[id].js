import clientPromise from '../../../lib/mongodb';

export default async function Movies(req, response) {
    const client = await clientPromise;
    const db = await client.db('newProject');
    const id = req.query.id

    //sql injection protection
    if (parseInt(id) < 100000) {
        const FoundMovie = await db.collection("new").find({ id: id }).toArray();
        response.json(FoundMovie[0]);
    } else { 
        response.json({error: true})
    }
}