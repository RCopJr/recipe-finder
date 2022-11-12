import { Card } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius * 4,
  transition: "box-shadow .3s",
  ":hover": {
    boxShadow: "0 2px 5px rgba(60, 60, 93, 0.33)",
  },
}));

export default StyledCard;
