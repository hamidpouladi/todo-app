import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

export default function Loading() {
  return (
    <div style={{ marginTop: 15, marginLeft: 15 }}>
      <CircularProgress disableShrink />;
    </div>
  );
}
