
import { Box, Container, Typography } from "@mui/material";
import logo from "../../assets/images/js-logo.png";
import { Copyright } from "@mui/icons-material";

const Footer = () => {
  return (
    <Box component="footer" color="">
      <Container maxWidth="sm">
        <Box>
          <Typography variant="body2">But we also love TS</Typography>
          <Typography>
            <Copyright />
            myAmazingPizzeria
          </Typography>
        </Box>
        <Box>
          <img src={logo} alt="" width={5} />
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
