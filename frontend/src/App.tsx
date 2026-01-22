import { Container, Typography, Box } from "@mui/material";
import MapCanvas from "./components/MapCanvas";
import ObjectDetails from "./components/ObjectDetails/ObjectDetails";

function App() {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, textAlign: "center" }}>
      <Typography variant="h4" gutterBottom sx={{ color: "#FFFF" }}>
        Plant Map
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <MapCanvas />
      </Box>

      <ObjectDetails />
    </Container>
  );
}

export default App;
