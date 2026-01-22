//Custom made - to fetch position data every 10s using tanstack query

import useApi from "../../hooks/useApi";

import BatteryChargingFullIcon from "@mui/icons-material/BatteryChargingFull";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import GpsFixedIcon from "@mui/icons-material/GpsFixed";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import type { MergedObject } from "../../types";
const LiveObjectData = ({
  objectId,
  initialData,
}: {
  objectId: number | undefined;
  initialData: MergedObject;
}) => {
  const { data: liveData } = useApi<MergedObject>(`/position?id=${objectId}`, {
    refetchInterval: 10000,
    refetchIntervalInBackground: true,
  });

  const battery =
    liveData?.battery?.percentage ?? initialData.battery?.percentage;
  const x = liveData?.x ?? initialData.x;
  const y = liveData?.y ?? initialData.y;
  const lat = liveData?.latitude ?? initialData.latitude;
  const lon = liveData?.longitude ?? initialData.longitude;
  const timestamp = liveData?.timestamp ?? initialData.timestamp;

  return (
    <Box sx={{ flex: 1 }}>
      <Box display="flex" flexDirection="row">
        <LocationOnIcon
          fontSize="small"
          sx={{ color: "text.secondary", mt: 0.3, mr: 1 }}
        />
        <Typography
          variant="subtitle2"
          color="primary"
          sx={{ mb: 1, fontWeight: "bold" }}
        >
          LOCATION & STATUS (LIVE)
        </Typography>
      </Box>

      <Box display="flex" alignItems="center" mb={1.5}>
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <BatteryChargingFullIcon
            fontSize="small"
            sx={{
              mr: 1,
              color: (battery ?? 0) < 20 ? "error.main" : "success.main",
            }}
          />
          <Typography variant="body2" fontWeight="medium">
            Battery: {battery !== undefined ? `${battery}%` : "N/A"}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "row", ml: 1 }}>
          <LocalOfferIcon
            fontSize="small"
            sx={{ color: "text.secondary", mr: 1 }}
          />
          <Typography variant="body2">
            <strong>Tag:</strong> {initialData.tag_id}
          </Typography>
        </Box>
      </Box>

      <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}>
        <Box sx={{ display: "flex" }}>
          <GpsFixedIcon
            fontSize="small"
            sx={{ color: "text.secondary", mr: 1 }}
          />
          <Typography variant="body2">
            <strong>X:</strong> {x.toFixed(2)} <strong>Y:</strong>{" "}
            {y.toFixed(2)}
          </Typography>
          <Typography variant="body2" sx={{ ml: 1 }}>
            <strong>Lat/Lon:</strong> {lat?.toFixed(4)}, {lon?.toFixed(4)}
          </Typography>
        </Box>
      </Box>

      <Box
        display="flex"
        justifyContent="center"
        sx={{ mt: 2, p: 1, bgcolor: "#f9f9f9", borderRadius: 1 }}
      >
        <Typography variant="caption" color="text.secondary" display="block">
          <strong>Updated:</strong>
        </Typography>
        <Typography variant="caption" color="text.secondary" display="block">
          {new Date(timestamp ?? new Date()).toLocaleTimeString()}
        </Typography>
      </Box>
    </Box>
  );
};
export default LiveObjectData;
