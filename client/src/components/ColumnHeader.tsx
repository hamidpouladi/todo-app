import React from "react";
import Box from "@material-ui/core/Box";

interface ColumnHeaderProps {
  color: string;
}

export default function ColumnHeader({
  children,
  color,
}: React.PropsWithChildren<ColumnHeaderProps>) {
  return (
    <Box
      padding={1}
      borderRadius="borderRadius"
      style={{ backgroundColor: color }}
    >
      <Box textAlign="center" fontSize={18} color="secondary">
        {children}
      </Box>
    </Box>
  );
}
