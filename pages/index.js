import { Box, CircularProgress} from "@mui/material";
import { useRouter } from "next/router";
import { useEffect } from "react";


export default function Home() { 
    const router = useRouter();

    useEffect(() => { 
        router.push('/movies/1');
    }, [router])

    return (
        <Box sx={{margin: "auto", lineHeight: 20, width: "fit-content"}}>
            <CircularProgress sx={{color: 'orange'}}/>
        </Box>

    )

}