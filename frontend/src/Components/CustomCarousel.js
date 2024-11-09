import React, { useState } from "react";
import Carousel from "react-material-ui-carousel";
import { Paper, Button, Typography, Stack } from "@mui/material";

const CustomCarousel = () => {
  return (
    <>
      <Stack>
        <Carousel className="">
          {item.map((item, index) => {
            return <Content item={item} key={index} />;
          })}
        </Carousel>
      </Stack>
    </>
  );
};

const Content = ({ item }) => {
  return (
    <Paper sx={{ backgroundColor: item.color, pt: "25%" }} elevation={5}>
      <Stack
        bgcolor="rgba(0, 0, 0, 0.28)"
        sx={{ position: "relative", px: "8%", py: "2%" }}
      >
        <Typography variant="h5" color={"secondary"}>
          {item.name}
        </Typography>
        <br />
        <Typography color={"secondary"}>{item.description}</Typography>
        <Button
          component="a"
          href={item.href}
          target="_blank"
          rel="noreferrer"
          color={"secondary"}
        >
          Learn more
        </Button>
      </Stack>
    </Paper>
  );
};

const item = [
  { name: "Harun", description: "Lorem Ipsum", color: "#64ACC8", href: "#" },
  { name: "Sigma", description: "Lorem Ipsum", color: "#7D85B1", href: "#" },
  { name: "Example", description: "Lorem Ipsum", color: "#CE7E78", href: "#" },
  { name: "Harun", description: "Lorem Ipsum", color: "#C9A27E", href: "#" },
];

export default CustomCarousel;
