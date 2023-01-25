import * as React from "react";

import { styled } from "@mui/material/styles";
import { avatar } from "../../config/Constants";
import { Box, Avatar, Badge } from "@mui/material";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""'
    }
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0
    }
  }
}));

const AvatarBubble = ({
  game: { currentAcusado, player },
  avatarPath,
  message
}) => {
  return (
    <Box>
      {currentAcusado === player && (
        <Box sx={{ gap: 2 }}>
          <StyledBadge
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            variant="dot"
          >
            <Avatar
              sx={avatar}
              alt={message}
              src={avatarPath}
              className="avatar-img"
            />
          </StyledBadge>
          <span className="player-name">{message}</span>
        </Box>
      )}
      {currentAcusado !== player && (
        <Box sx={{ gap: 2 }}>
          <StyledBadge
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            variant="dot"
            invisible
          >
            <Avatar
              sx={avatar}
              alt={message}
              src={avatarPath}
              className="avatar-img"
            />
          </StyledBadge>
          <span className="player-name">{message}</span>
        </Box>
      )}
    </Box>
  );
};

export { AvatarBubble };
