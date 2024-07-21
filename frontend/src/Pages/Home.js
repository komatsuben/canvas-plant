import React, { useState } from "react";
import { Container, Stack, Typography } from "@mui/material";
import ColorPalette from "../Components/ColorPalette";
import Donate from "../Components/Donate";

export default function Home() {
    const [number, setNumber] = useState(0)
    return (
        <ColorPalette>
            <Container fixed style={{marginTop: "5%"}}>
                <Stack gap={{xs: 2, sm: 3}} display={"flex"}>
                    <Stack gap={{xs: 1, sm: 2}} direction={"column"} flexWrap={"wrap"}>
                        <Stack className="col">
                            <Typography variant="h2" color={"primary"} textAlign={"center"}>#REFORESTATION</Typography>
                        </Stack>
                        <Stack className="col">
                            <Typography variant="h4" color={"primary"} textAlign={"center"}>JOIN THE MOVEMENT</Typography>
                        </Stack>
                        <Stack className="col">
                            <Typography variant="p" color={"primary"} textAlign={"center"}>
                                The 17 UN Sustainable Development Goals (SDGs) are a plan to create a better 
                                and more sustainable future for all. <br/>
                                Reforestation and land restoration help to benefit all 17 SDGs. 
                                Plant with us and track our progress!
                            </Typography>
                        </Stack>
                        <Stack className="col">
                            <Typography variant="h1" color={"primary"} textAlign={"center"}>{number}</Typography>
                        </Stack>
                    </Stack>
                    <Stack gap={{xs: 1, sm: 2}} direction={"column"} flexWrap={"wrap"}>
                        <Donate/>
                    </Stack>
                </Stack>
            </Container>
        </ColorPalette>
    );
}