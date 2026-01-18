import {
  Box,
  Typography,
  Divider,
  Chip,
  Paper,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import BatteryChargingFullIcon from "@mui/icons-material/BatteryChargingFull";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useAppSelector, useAppDispatch } from "../store/store";
import { setSelectedObject } from "../store/map/mapSlice";
import useMergeData from "../hooks/useMergeData";
import type { MergedObject } from "../types";

// Since this page is display of static data and no logic involved
// i have used AI to generate this page and made some manual changes

const ObjectDetails = () => {
  const dispatch = useAppDispatch();
  const { mergedData } = useMergeData();
  const selectedId = useAppSelector((state) => state.map.selectedObjectId);

  const obj = mergedData?.find((o) => o.id === selectedId) as
    | MergedObject
    | undefined;

  if (!obj) return null;

  const handleClose = () => dispatch(setSelectedObject(null));

  const formatKey = (key: string) =>
    key
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

  return (
    <Paper
      elevation={2}
      sx={{
        width: "100%", // Stretch to fill container width
        maxWidth: 800, // Optional: keep it from getting too wide on desktop
        mt: 2, // Margin top to separate from Canvas
        borderRadius: 2,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          p: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          bgcolor: "#f5f5f5",
          borderBottom: "1px solid #ddd",
        }}
      >
        <Box>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ textTransform: "uppercase", fontWeight: "bold" }}
          >
            {obj.labels[0]}
          </Typography>
          <Typography variant="h6" fontWeight="bold" lineHeight={1.2}>
            {obj.name}
          </Typography>
        </Box>
        <IconButton size="small" onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </Box>

      {/* Content - Using a Row layout for the two data sections on wider screens */}
      <Box
        sx={{
          p: 2,
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          gap: 4,
        }}
      >
        {/* Metadata Section */}
        <Box sx={{ flex: 1 }}>
          <Typography
            variant="subtitle2"
            color="primary"
            sx={{ mb: 1, fontWeight: "bold" }}
          >
            METADATA
          </Typography>
          <Box>
            {Object.entries(obj.properties).map(([key, value]) => (
              <DetailRow
                key={key}
                label={formatKey(key)}
                value={String(value)}
                isUrgent={key === "priority" && value === "urgent"}
              />
            ))}
          </Box>
        </Box>

        <Divider
          orientation="vertical"
          flexItem
          sx={{ display: { xs: "none", sm: "block" } }}
        />

        {/* Telemetry Section */}
        <Box sx={{ flex: 1 }}>
          <Typography
            variant="subtitle2"
            color="primary"
            sx={{ mb: 1, fontWeight: "bold" }}
          >
            LOCATION & STATUS
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", mb: 1.5 }}>
            <BatteryChargingFullIcon
              fontSize="small"
              sx={{
                mr: 1,
                color:
                  (obj.battery?.percentage ?? 0) < 20
                    ? "error.main"
                    : "success.main",
              }}
            />
            <Typography variant="body2" fontWeight="medium">
              Battery:{" "}
              {obj.battery?.percentage !== undefined
                ? `${obj.battery.percentage}%`
                : "N/A"}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}>
            <LocationOnIcon
              fontSize="small"
              sx={{ color: "text.secondary", mt: 0.3 }}
            />
            <Box>
              <Typography variant="body2">
                <strong>Tag:</strong> {obj.tag_id}
              </Typography>
              <Typography variant="body2">
                <strong>X:</strong> {obj.x.toFixed(2)} <strong>Y:</strong>{" "}
                {obj.y.toFixed(2)}
              </Typography>
              <Typography variant="body2">
                <strong>Lat/Lon:</strong> {obj.latitude?.toFixed(4)},{" "}
                {obj.longitude?.toFixed(4)}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ mt: 2, p: 1, bgcolor: "#f9f9f9", borderRadius: 1 }}>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ display: "block" }}
            >
              <strong>Object ID:</strong> {obj.object_id} |{" "}
              <strong>Updated:</strong>{" "}
              {new Date(obj.timestamp ?? new Date()).toLocaleTimeString()}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};

const DetailRow = ({
  label,
  value,
  isUrgent,
}: {
  label: string;
  value: string;
  isUrgent?: boolean;
}) => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "space-between",
      mb: 0.8,
      alignItems: "center",
    }}
  >
    <Typography variant="body2" color="text.secondary">
      {label}
    </Typography>
    {isUrgent ? (
      <Chip
        label={value}
        size="small"
        color="error"
        sx={{ height: 20, fontSize: "0.7rem", fontWeight: "bold" }}
      />
    ) : (
      <Typography variant="body2" fontWeight="bold">
        {value || "N/A"}
      </Typography>
    )}
  </Box>
);

export default ObjectDetails;
