import { alpha, styled } from "@mui/material/styles";

const StyledSearch = styled("div")(({ theme }) => ({
  borderRadius: theme.shape.borderRadius * 2,
  backgroundColor: alpha(theme.palette.common.white, 0.25),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.3),
  },
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
  },
}));

export default StyledSearch;
