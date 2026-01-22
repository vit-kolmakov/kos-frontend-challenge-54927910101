import ViewStreamIcon from "@mui/icons-material/ViewStream";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import HandymanIcon from "@mui/icons-material/Handyman";
const LABEL_ICONS: Record<string, React.ElementType> = {
  container: ViewStreamIcon,
  order: ShoppingBasketIcon,
  tool: HandymanIcon,
};

const LabelIcon = ({ label }: { label: string }) => {
  const Icon = LABEL_ICONS[label];

  return (
    <Icon
      fontSize="small"
      sx={{
        color: "var(--color-primary, #FFFF)",
        mr: 1,
      }}
    />
  );
};

export default LabelIcon;
