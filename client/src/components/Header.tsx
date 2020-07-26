import React, { ReactNode } from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

interface HeaderProps {
  children: ReactNode;
}

export default function Header({ children }: HeaderProps) {
  return (
    <Box color="#735843" padding={3} margin={1} fontWeight="fontWeightBold">
      <Typography variant="h2" align="center">
        {children}
      </Typography>
    </Box>
  );
}
