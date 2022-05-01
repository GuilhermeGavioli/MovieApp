import Image from "next/image";
import companyLogo from "../public/companyLogo.ico";

import { Box } from "@mui/material";

import { useContext } from "react";
import { SidebarContext } from "./Layout/Layout";
import { useRouter } from "next/router";

export default function FooterApp() {
  const [sidebar, setSidebar, closeSidebar] = useContext(SidebarContext);
  const router = useRouter();

  return (
    <Box
      sx={{
       
        width: "100%",
        height: "30vh",
        bgcolor: "rgb(15,15,15)",
        minHeight: "60px",
      }}
      onClick={closeSidebar}
      style={router.isFallback ? { marginTop: "100vh" } : {}}
    >
      <Box sx={{ display: "flex", justifyContent: "center", pt: 2 }}>
        <Image
          src={companyLogo}
          alt="logo"
          height={45}
          width={45}
          
        />
      </Box>
    </Box>
  );
}
