import React from "react";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import { useDrag } from "react-dnd";
import { DraggingItem } from "../types";

interface CardProps {
  text: string;
  status: "todo" | "doing" | "completed";
  index: number;
  id: string;
}

const Card: React.FC<CardProps> = ({ text, status, index, id }) => {
  const item: DraggingItem = {
    type: "Card",
    sourceColumn: status,
    index,
    taskId: id,
  };
  const [{ isDragging }, drag] = useDrag({
    item,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const styles = { opacity: isDragging ? 0.4 : 1 };
  return (
    <div style={{ ...styles }} ref={drag}>
      <Box
        display="flex"
        paddingX="2px"
        marginY={2}
        minHeight="3rem"
        clone
        alignItems="center"
        justifyContent="center"
        style={{ cursor: "move" }}
      >
        <Paper>{text}</Paper>
      </Box>
    </div>
  );
};

export default Card;
