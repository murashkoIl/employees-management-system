import styled from "@emotion/styled";
import { AccountCircle } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";

export const StyledAccountCircleIcon = styled(AccountCircle)({
  width: "3.5rem",
  height: "3.5rem",
  cursor: "pointer",
});

export const Avatar = styled("div", {
  shouldForwardProp: (prop) => prop !== "backgroundUrl",
})(({ backgroundUrl }: { backgroundUrl: string }) => ({
  width: "3rem",
  height: "3rem",
  background: `url(${backgroundUrl})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  borderRadius: "100%",
  cursor: "pointer",
}));

export const AvatarWrapper = styled("div")({
  position: "relative",
});

export const PositionedAvatarDeleteIcon = styled(CloseIcon)({
  position: "absolute",
  top: "-0.6rem",
  right: "-0.8rem",
  width: "0.8rem",
  color: "grey",
  cursor: "pointer",
});
