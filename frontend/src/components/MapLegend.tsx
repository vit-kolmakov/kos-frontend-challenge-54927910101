import { Paper, Box, Typography, Stack } from "@mui/material";

const LegendItem = ({
  color,
  label,
  shape,
}: {
  color: string;
  label: string;
  shape: "path" | "triangle";
}) => (
  <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 1 }}>
    <Box
      sx={{
        width: 16,
        height: 16,
        bgcolor: color,
        borderRadius: shape === "path" ? "2px" : "0px",
        clipPath:
          shape === "triangle" ? "polygon(50% 0%, 0% 100%, 100% 100%)" : "none",
        border: "1px solid rgba(0,0,0,0.1)",
      }}
    />
    <Typography
      variant="caption"
      sx={{ fontWeight: 500, textTransform: "capitalize" }}
    >
      {label}
    </Typography>
  </Stack>
);

const MapLegend = () => {
  return (
    <Paper
      elevation={3}
      sx={{
        position: "absolute",
        bottom: 20,
        left: 20,
        p: 1.5,
        bgcolor: "rgba(255, 255, 255, 0.9)",
        backdropFilter: "blur(4px)",
        borderRadius: "var(--radius-md)",
        zIndex: 10,
        minWidth: 120,
        border: "1px solid rgba(0,0,0,0.1)",
      }}
    >
      <Typography
        variant="subtitle2"
        sx={{
          mb: 1,
          fontWeight: "bold",
          borderBottom: "1px solid #eee",
          pb: 0.5,
        }}
      >
        Legend
      </Typography>
      <LegendItem color="#b6561a" label="Tool" shape="path" />
      <LegendItem color="#4caf50" label="Container" shape="path" />
      <LegendItem color="#9c41eb" label="Order" shape="triangle" />
    </Paper>
  );
};
export default MapLegend;
