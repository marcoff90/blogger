import React from "react";
import {Box, Container} from "@mui/material";
import Navbar from "./components/Navbar";

type Props = {
  children: React.ReactNode
}

const Layout: React.FC<Props> = ({children}) => {
  return (
    <>
      <Navbar/>
      <Box px={30} py={10}>
        <Container maxWidth={'xl'}>
          {children}
        </Container>
      </Box>
    </>
  );
};

export default Layout;
