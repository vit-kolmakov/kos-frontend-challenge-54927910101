import { Container, Typography, Box } from "@mui/material";
import MapCanvas from "./components/Map/MapCanvas";
import ObjectDetails from "./components/ObjectDetails/ObjectDetails";
import useMergeData from "./hooks/useMergeData";

function App() {
  const { mergedData, isLoading, error } = useMergeData();
  return (
    <Container maxWidth="lg" sx={{ mt: 4, textAlign: "center" }}>
      <Typography variant="h3" gutterBottom sx={{ color: "#FFFF" }}>
        Plant Map
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <MapCanvas data={mergedData} isLoading={isLoading} error={error} />
      </Box>

      <ObjectDetails data={mergedData} />
    </Container>
  );
}

export default App;
