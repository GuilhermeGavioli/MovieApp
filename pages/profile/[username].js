import Image from "next/image";
import Head from 'next/head'



import { Button, Avatar, Slider, Box, ListItem, Typography, Rating, CircularProgress } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';

import { useSession } from "next-auth/react"
import { useRouter } from "next/router";
import { useState } from "react";

// `${window.location.host}/api/rating/addrating`
export default function Username({ votedMovies, basepath, error, foundUser }) {
    const [showRatingBox, setShowRatingBox] = useState([]);
    const [sliderValue, setSliderValue] = useState(65);
    const [starValue, setStarValue] = useState(3);
    const { data: session } = useSession();
    const router = useRouter();

    

    if (router.isFallback) { 
        return(
            <Box sx={{margin: 'auto', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <CircularProgress sx={{mt: 15, color: 'orange'}} />
            </Box>
        )
    }

 

   
    if (error) { 
        return (
            <Box sx={{ margin: 'auto', display: "flex", flexDirection: 'column', alignItems: "center", padding: 15 }}>
                <Box sx={{margin: 'auto'}}>
                    <Typography sx={{textAlign: 'center'}}>User {router.query.username} does not exit...</Typography>
                </Box>
                <Box sx={{margin: 'auto'}}>
                    <Button variant="contained" sx={{ mt: 3 }}  onClick={()=>router.push('/movies/1')}>Go to movies</Button>
                </Box>
            </Box>
        )
    }

     // If user has no ratings...
    if (votedMovies.length == 0) { 
        return (
            <Box sx={{ margin: 'auto', display: "flex", flexDirection:"column", alignItems: "center", padding: 15 }}>
                <Box sx={{margin: 'auto'}}>
                <Typography sx={{textAlign: 'center'}}>{router.query.username} has no ratings to be shown yet...</Typography>

        
                </Box>
                <Box sx={{margin: 'auto'}}>
                    <Button variant="contained" sx={{ mt: 3 }} onClick={()=>router.push('/movies/1')}>Go to movies</Button>
                </Box>
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

    async function handleDelete(movieID, ratingID) { 
        console.log(ratingID)
        console.log(movieID)
        const urlRequest = `${basepath}/api/rating/addRating` //change this name to handlerating
        const res = await fetch(urlRequest, {
            method: 'DELETE',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userEmail: session?.user?.email, movieID, id: ratingID}),
        })
        const data = await res.json();
        if (data.error === false) {
            window.alert("Succefully deleted");
        } else { 
            window.alert("request failed. Try again")
        }
    }

    
    

    return (
              
        <div style={{ width: '100%', height: 'fit-content', margin: 'auto' }}>

        <Head>
                <title>Profile</title>
        <link rel="icon" href="/companyLogo.ico" />  
        <meta name="description" content=""></meta>
        <meta name="keywords" content="Movie, Film, Rating, Profile"></meta>
        </Head>


            
            
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
                                <Typography><span style={{color: 'orange', fontSize: 20}}>&#10030;</span> {movie?.voters?.star_rating}</Typography>
                                </Box>
                            
                            <Box>
                                <DeleteIcon sx={{ color: "rgb(120,120,120)" }} onClick={() => handleDelete(movie?.id, movie?.voters?.id)}/>
                            </Box>
                                {/* <Image height={80} width={50} alt="movieimg" src={movie?.img_src}/>  */}
                        </Box>
                        
           
           
           </Box>
           )
            })}
            <Button variant="contained" sx={{ float: 'right', mt: 3, fontWeight: 700 }} onClick={ ()=> router.back()}>Go back to Movies</Button>
        </div>

    )
}




export async function getStaticPaths() {
    //get all users profiles
    // const client = await clientPromise
    // const db = await client.db(process.env.MONGODB_DB);
    // const allUsers = await db.collection(process.env.USERS_COLLECTION).find().toArray();
    // const allUsersEmails = await allUsers.map((user) => { 
    return { paths: [ ], fallback: true}

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
