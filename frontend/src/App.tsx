import { Container, Typography, Box } from "@mui/material";
import MapCanvas from "./components/MapCanvas";

function App() {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, textAlign: "center" }}>
      <Typography variant="h4" gutterBottom>
        Plant Map
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <MapCanvas />
      </Box>

      <Typography variant="caption" display="block" sx={{ mt: 2 }}>
        Legend
      </Typography>
    </Container>
  );
}

export default App;
