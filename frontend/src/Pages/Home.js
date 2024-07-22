import React, { useState } from "react";
import { Container, Stack, Typography } from "@mui/material";
import ColorPalette from "../Components/ColorPalette";
import Donate from "./Donate";
import Leaderboard from "./Leaderboard";

export default function Home() {
    const [number, setNumber] = useState(0)
    return (
        <ColorPalette>
            <Container fixed style={{marginTop: "2%", marginBottom: "2%"}}>
                <Stack gap={{xs: 4, sm: 6}} display={"flex"}>
                    <Stack gap={{xs: 1, sm: 2}} direction={"column"} flexWrap={"wrap"}>
                        <Stack className="col" id={'home'}>
                            <Typography variant="h2" color={"primary"} textAlign={"center"} fontSize={{xs: "2rem", sm: "3.75rem"}}>#REFORESTATION</Typography>
                        </Stack>
                        <Stack className="col">
                            <Typography variant="h4" color={"primary"} textAlign={"center"} fontSize={{xs: "1rem", sm: "2.125rem"}}>JOIN THE MOVEMENT</Typography>
                        </Stack>
                        <Stack className="col">
                            <Typography variant="p" color={"primary"} textAlign={"center"} fontSize={{xs: "0.5rem", sm: "1rem"}}>
                                The 17 UN Sustainable Development Goals (SDGs) are a plan to create a better 
                                and more sustainable future for all. <br/>
                                Reforestation and land restoration help to benefit all 17 SDGs. 
                                Plant with us and track our progress!
                            </Typography>
                        </Stack>
                        <Stack className="col">
                            <Typography variant="h1" color={"primary"} textAlign={"center"} fontSize={{xs: "3rem", sm: "6rem"}}>{number}</Typography>
                        </Stack>
                        <Stack gap={{xs: 1, sm: 2}} direction={"column"} flexWrap={"wrap"} id={'#reforestation'}>
                            <Donate/>
                        </Stack>
                    </Stack>
                    <Stack gap={{xs: 1, sm: 2}} direction={"column"} flexWrap={"wrap"} id={'leaderboard'}>
                        <Leaderboard/>
                    </Stack>
                </Stack>
            </Container>
        </ColorPalette>
    );
}