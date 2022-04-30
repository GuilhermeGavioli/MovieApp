import Image from "next/image";




import { Button, Avatar, Slider, Box, List, ListItem, Typography, Rating } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';

import { useSession } from "next-auth/react"

import { useRouter } from "next/router";
import { useState } from "react";

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
              
            <div style={{width: '100%',height: '900px', margin: 'auto'}}>
            
            
            <Box sx={{paddingTop: 10, width: '40%', margin: 'auto', mb: 8}}>

                <Slider size="medium" valueLabelDisplay="on" />

                <Rating
                    size="medium"
                    precision={0.5}
                    name="valueHating"
                    onChange={(e) => setStarRating(e.target.value)}
                    sx={{mt: 3}}
              />

            </Box>
            
            {votedMovies?.map(movie => {
                
                return (
                    <Box key={movie?.id} sx={{  bgcolor: 'white', width: '50%', mt: 1, mb: 1, padding: 1, margin: 'auto', '&:hover': {cursor: 'pointer', bgcolor: 'whitesmoke'}}}

                    >
                      
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Box sx={{width: '30%', maxWidth: '30%'}}>
                                <Typography sx={{whiteSpace:'nowrap',overflow: 'hidden', textOverflow:'ellipsis'}}>{movie?.movie} ({ movie?.year})</Typography>
                            </Box>
                            <Box sx={{width: '20%'}}>
                                <Typography>Rating: {movie?.voters.rating}</Typography>
                            </Box>
                                <Box sx={{width: '20%'}}>
                                <Typography>&#x2605;: {movie?.voters.star_rating}</Typography>
                                </Box>
                            <Box>
                                {session?.user?.email == router.query.username + "@gmail.com" ?
                                    <Button variant="text" size="small" onClick={()=> handleUpdate(movie?.id)}>Update Vote</Button>
                                    :
                                    <></>
                                }
                            </Box>
                            <Box>
                                <DeleteIcon/>
                            </Box>
                                {/* <Image height={80} width={50} alt="movieimg" src={movie?.img_src}/>  */}
                        </Box>
                        
           
           
           </Box>
           )
        })}
        </div>

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
