import { alpha, styled, Switch } from "@mui/material";
const PublicSwitch = styled(Switch)(({ theme }) => ({
  "& .MuiSwitch-switchBase.Mui-checked": {
    color: "#088178",
    "&:hover": {
      backgroundColor: alpha("#088178", theme.palette.action.hoverOpacity),
    },
  },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: "#088178",
  },
}));

export default PublicSwitch;
