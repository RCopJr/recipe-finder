import { styled, alpha } from "@mui/material/styles";

const StyledSearch = styled("div")(({ theme }) => ({
  borderRadius: theme.shape.borderRadius * 2,
  backgroundColor: alpha(theme.palette.common.white, 0.25),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.3),
  },
  margin: "auto",
  width: "auto",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

export default StyledSearch;
