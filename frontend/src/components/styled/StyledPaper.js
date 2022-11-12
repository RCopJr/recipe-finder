import { Paper } from "@mui/material-ui";
import { styled } from "@mui/material/styles";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
}));

export default StyledPaper;
