import { Button, Box} from "@mui/material";
import Router from "next/router";

export default function Home() { 
    

    return (
        <Box sx={{margin: "auto", width: "fit-content"}}>
       
            <Button variant="contained" size="large" sx={{ width: '200px', height: '50px', mt: 10 }}
                onClick={()=>Router.push('/movies/1')}
            >Movies</Button>
        </Box>

    )

}