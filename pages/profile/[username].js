import Image from "next/image";




import { Button, Avatar } from "@mui/material"
import { useSession } from "next-auth/react"

import { useRouter } from "next/router";


// `${window.location.host}/api/rating/addrating`
export default function Username({ votedMovies, basepath, error, foundUser }) {
    const router = useRouter();
    console.log(foundUser)
    const { data: session } = useSession();
    if (error) { 
        return <div>NO USER WITH THAT NAME</div>
    }
  

    //change process.env.basepath to window.location.host *IMPORTANT*  
    async function handleUpdate(movieID) { 
        const urlRequest = `${basepath}/api/rating/addRating` //change this name to handlerating
        const res = await fetch(urlRequest, {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userEmail: session?.user?.email, newRating: 50, newStarRating: 2.5, movieID}),
        })
        const data = await res.json();
        if (data.error === false) { 
            window.alert("Rating was updated succesfully");
        }
       
        
  
    }


    return (
        <>          
            <div style={{margin: 'auto', width:"120"}}>
            {/* <Image src={foundUser?.image} height="120" width="120" alt="profpic" style={{borderRadius: '50%'}}/> */}

            </div>
            
            {votedMovies?.map(movie => {
                
            return (
                
                <div key={movie?.id}>
                    <h1>{movie?.movie} ({ movie?.year})</h1>
                    <p>your rating for this movie was: {movie?.voters.rating}</p>
                    <p>your star r.for this movie was: {movie?.voters.star_rating}</p>

                    {session?.user?.email == router.query.username + "@gmail.com" ?
                        <Button variant="contained" onClick={()=> handleUpdate(movie?.id)}>Update Vote</Button>
                        :
                        <></>
                    }
                </div>
           
           
           )
        })}
        
        </>
    )
}




export async function getStaticPaths() {
    //get all users profiles
    // const client = await clientPromise
    // const db = await client.db(process.env.MONGODB_DB);
    // const allUsers = await db.collection(process.env.USERS_COLLECTION).find().toArray();
    // const allUsersEmails = await allUsers.map((user) => { 
    //     return { params: { username: user.email.split('@gmail.com')[0] } }
    // })
    return { paths: [], fallback: true }

}

export async function getStaticProps(context) {
    const username = context.params.username
    const res = await fetch(`${process.env.BASE_PATH}/api/profile/${username}`)
    const data = await res.json();
    if (data.error) { 
        return {
            props: {error: data.error}
        }
    }


    return {
        props: {
                foundUser: { ...data.foundUser, email: ""}, 
                votedMovies: data.moviesWhichTheUserHasVoted,
                basepath: process.env.BASE_PATH
            },
            revalidate: 20
    }
    
}
