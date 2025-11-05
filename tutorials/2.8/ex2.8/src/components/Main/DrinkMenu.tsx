
import {
  Container,
  Card,
  CardMedia,
  CardContent,
  Typography,
  useTheme

} from "@mui/material";
import { Grid } from "@mui/material"
import { Drink } from "../../types";

interface DrinkMenuProps {
  title: string;
  drinks: Drink[];
}

const DrinkMenu : React.FC<DrinkMenuProps> = ({title, drinks}) => {
  const theme = useTheme();
  return (
   <Container>
    <Typography variant="h4" gutterBottom
    sx={{
      color: theme.palette.primary.contrastText,
      textAlign: "center",
      marginTop: 2
    }}>
      {title}
    </Typography>
    <Grid container spacing={3}>
      {drinks.map((drink, index) => (
        <Grid item xs={12} sm={6} key={index}>
          <Card>
            <CardMedia component="img"
            image={drink.image}
            alt={drink.title}
            style={{objectFit: "contain", height: "200px"}} 
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {drink.title}
              </Typography>
              <Typography gutterBottom variant="body1" component="p">
                {drink.volume}
              </Typography>
              <Typography gutterBottom variant="body2" component="p">
                {drink.price}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
   </Container>
  );
};

export default DrinkMenu;
