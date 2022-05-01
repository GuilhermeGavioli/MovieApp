import Image from "next/image";
import Link from 'next/link'



import { Button, Avatar, Slider, Box, List, ListItem, Typography, Rating, CircularProgress } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';

import { useSession } from "next-auth/react"

import { useRouter } from "next/router";
import { useState } from "react";

// `${window.location.host}/api/rating/addrating`
export default function Username({ votedMovies, basepath, error, foundUser }) {
    const [showRatingBox, setShowRatingBox] = useState([]);
    const [sliderValue, setSliderValue] = useState(65);
    const [starValue, setStarValue] = useState(3);


 

    const router = useRouter();
   
    const { data: session } = useSession();
    if (error) { 
        return <div>NO USER WITH THAT NAME</div>
    }

    if (router.isFallback) { 
        return(
            <Box sx={{margin: 'auto', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <CircularProgress sx={{mt: 15, color: 'orange'}} />
            </Box>
        )
    }
  

    //change process.env.basepath to window.location.host *IMPORTANT*  
    async function handleUpdate(movieID) {
       
        const urlRequest = `${basepath}/api/rating/addRating` //change this name to handlerating
        const res = await fetch(urlRequest, {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userEmail: session?.user?.email, newRating: sliderValue, newStarRating: parseFloat(starValue), movieID}),
        })
        const data = await res.json();
        if (data.error === false) {
            window.alert("Rating was updated succesfully");
        } else { 
            window.alert("request failed. Try again")
        }
       
        
  
    }


    return (
              
        <div style={{ width: '100%', height: '900px', margin: 'auto' }}>
            
            
                <Box sx={{paddingTop: 10, width: '40%', margin: 'auto', mb: 8}}>
            {showRatingBox ? 

                    <>
                        <Typography>{showRatingBox[0] ? showRatingBox[0]+"("+ showRatingBox[1]+")" :  ""}</Typography>
                        {showRatingBox[2] ? 
                            <div>
                                <Image width={90} height={125} src={showRatingBox[2]} alt="movieimg"/>
                                <Slider size="medium" valueLabelDisplay="on" defaultValue={65} sx={{ color: 'orange' }}
                                    onChange={e => setSliderValue(e.target.value)}
                                />
                                <Rating
                                    size="medium"
                                    precision={0.5}
                                    name="valueHating"
                                    sx={{ mt: 3 }}
                                    defaultValue={3}
                                    onChange={e => setStarValue(e.target.value)}
                              />
                            <Button sx={{ float: 'right', fontWeight: 700, mt: 2 }} variant="contained" onClick={()=> handleUpdate(showRatingBox[3])}>Update</Button>

                            </div>
                        
                        : <></>}
                        

                </>
                : <></>}
            
                </Box>
            {votedMovies?.map(movie => {
                
                return (
                    <Box key={movie?.id} sx={{ bgcolor: 'white', width: '98%', mt: 1, mb: 1, padding: 1, margin: 'auto', color: 'rgb(60,60,60)', justifyContent:'center', alignItems: 'center', '&:hover': { cursor: 'pointer', bgcolor: 'whitesmoke' } }}
                        
                        
                        onClick={() => {
                            if (session?.user?.email == router.query.username + "@gmail.com") { 
                                setShowRatingBox([ movie?.movie, movie?.year, movie?.img_src, movie?.id,])
                                window.scrollTo(0, 0);
                               
                            }
                    }}
                    >
                     
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Box sx={{width: '30%', maxWidth: '30%'}}>
                                <Typography sx={{whiteSpace:'nowrap',overflow: 'hidden', textOverflow:'ellipsis'}}>{movie?.movie} ({ movie?.year})</Typography>
                            </Box>
                            <Box sx={{width: '20%'}}>
                                <Typography>Rating: {movie?.voters?.rating}</Typography>
                            </Box>
                                <Box sx={{width: '20%'}}>
                                <Typography><span style={{color: 'orange', fontSize: 20}}>&#x272E;</span> {movie?.voters?.star_rating}</Typography>
                                </Box>
                            
                            <Box>
                                <DeleteIcon sx={{ color:"rgb(150,150,150)" }}/>
                            </Box>
                                {/* <Image height={80} width={50} alt="movieimg" src={movie?.img_src}/>  */}
                        </Box>
                        
           
           
           </Box>
           )
            })}
            <Button variant="contained" sx={{ float: 'right', mt: 3, bgcolor: 'rgb(253,70,4)', color: 'rgb(210,210,210)' }} onClick={ ()=> router.back()}>Go back</Button>
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
