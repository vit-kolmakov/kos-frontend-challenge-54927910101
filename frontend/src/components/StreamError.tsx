import { Alert, Box } from "@mui/material";

const StreamError = ({ message }: { message: string }) => (
  <Box
    sx={{
      position: "absolute",
      top: 60,
      left: "50%",
      transform: "translateX(-50%)",
      zIndex: 15,
      width: "auto",
      minWidth: 300,
    }}
  >
    <Alert variant="filled" severity="error" sx={{ boxShadow: 3 }}>
      {message}
    </Alert>
  </Box>
);

export default StreamError;
