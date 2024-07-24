import React, { useState } from "react";
import { Button, Container, Stack, Typography } from "@mui/material";
import ColorPalette from "../Components/ColorPalette";
import Donate from "./Donate";
import Leaderboard from "./Leaderboard";
import PlantingProjects from "./PlantingProjects";
import PlantingProgress from "./Progress";
import { HashLink as Link } from 'react-router-hash-link';

export default function Home() {
    const addThousandSeparator = (value) => {
        const parts = value.toString().split('.');
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        return parts.join('.');
    };

    const [total, setTotal] = useState(1_000);
    const [target, setTarget] = useState(10_000);

    return (
        <ColorPalette>
            <Container fixed style={{marginTop: "2%", marginBottom: "2%"}}>
                <Stack gap={{xs: 5, sm: 10}} display={"flex"}>
                    <Stack gap={{xs: 1, sm: 2}} direction={"column"} flexWrap={"wrap"}>
                        <Stack className="col" id={'home'}>
                            <Typography variant="h2" color={"primary"} textAlign={"center"} fontSize={{xs: "2rem", sm: "3.75rem"}}>#REFORESTATION</Typography>
                        </Stack>
                        <Stack className="col">
                            <Typography variant="h4" color={"primary"} textAlign={"center"} fontSize={{xs: "1.5rem", sm: "2.125rem"}}>JOIN THE MOVEMENT</Typography>
                        </Stack>
                        <Stack className="col">
                            <Typography variant="p" color={"primary"} textAlign={"center"} fontSize={{xs: "0.9rem", sm: "1rem"}}>
                                The 17 UN Sustainable Development Goals (SDGs) are a plan to create a better 
                                and more sustainable future for all. <br/>
                                Reforestation and land restoration help to benefit all 17 SDGs. 
                                Plant with us and track our progress!
                            </Typography>
                        </Stack>
                        <Stack className="col">
                            <Typography variant="h1" color={"primary"} textAlign={"center"} fontSize={{xs: "3rem", sm: "6rem"}}>{addThousandSeparator(total)}</Typography>
                        </Stack>
                        <Stack className="col" id={'#reforestation'}>
                            <Donate/>
                        </Stack>
                    </Stack>
                    <Stack direction={"column"} flexWrap={'wrap'}>
                        <Stack direction={'row'} justifyContent={'center'}>
                            <Button variant="contained" sx={{borderRadius:'32px', fontSize:'1.5rem'}} 
                            component={Link} smooth to={"/#planting project"}>Our Planting Project</Button>
                        </Stack>
                    </Stack>
                    <Stack gap={{xs: 1, sm: 2}} direction={"column"} flexWrap={"wrap"} id={'leaderboard'}>
                        <Leaderboard/>
                    </Stack>
                    <Stack>
                        <PlantingProgress trees={total} total={target} />
                    </Stack>
                    <Stack gap={{xs: 1, sm: 2}} direction={"column"} flexWrap={"wrap"} bgcolor="secondary.main" style={{borderRadius: '8px'}} id={'planting project'}>
                        <PlantingProjects/>
                    </Stack>
                </Stack>
            </Container>
        </ColorPalette>
    );
}