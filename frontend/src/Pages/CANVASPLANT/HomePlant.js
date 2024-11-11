import React, { useState, useEffect } from "react";
import { Button, Container, Stack, Typography } from "@mui/material";
import ColorPalette from "../../Components/ColorPalette";
import Banner from "./Banner";
import Tree from "./Tree";
import Donate from "./Donate";
import Leaderboard from "./Leaderboard";
import PlantingProjects from "./PlantingProjects";
import PlantingProgress from "./Progress";
import { HashLink as Link } from 'react-router-hash-link';
import CustomToggle from "../../Components/CustomToggle";

export default function HomePlant() {
    const addThousandSeparator = (value) => {
        const parts = value.toString().split('.');
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        return parts.join('.');
    };

    const [total, setTotal] = useState(0);
    const target = 1_000;
    const [isTree, setIsTree] = useState(true);

    useEffect(()=>{
        fetch('/api/donation')
        .then(response => response.json())
        .then(data => {
            setTotal(data.total);
        })
    }, [])

    return (
        <ColorPalette>
            <Stack bgcolor={'forest.main'}>
                <Banner total={total}/>
                <Container fixed style={{marginTop: "2%", marginBottom: "2%"}}>
                    <Stack gap={{xs: 5, sm: 10}} display={"flex"}>
                        <Stack></Stack>
                        <Stack gap={{xs: 1, sm: 2}} direction={"column"} flexWrap={"wrap"} id={"donate"} bgcolor={"forest.light"} borderRadius={'8px'} padding={"3% 2%"}>
                            <Stack className="col">
                                <Typography color={"secondary"} textAlign={"center"} variant="h4" fontSize={{xs: "1.5rem", sm: "2.125rem"}}>JOIN US</Typography>
                                <Typography variant="p" color={"secondary"} textAlign={"center"} fontSize={{xs: "0.9rem", sm: "1rem"}}>
                                    by sponsoring our event
                                </Typography>
                            </Stack>
                            <Stack className="col" justifyContent={"center"} direction={"row"}>
                                <CustomToggle var={isTree} setVar={setIsTree} values={[true, false]} labels={["TREE", "DONATE"]} exclusive color={"secondary"}/>
                            </Stack>
                            {isTree ? (<Tree current_tree={total} target={target}/>) : (<Donate/>)}
                        </Stack>
                        <Stack></Stack>
                    </Stack>
                </Container>
            </Stack>
            <Stack bgcolor={'white.main'}>
                <Container fixed style={{marginTop: "2%", marginBottom: "2%"}}>
                    <Stack gap={{xs: 5, sm: 10}} display={"flex"}>
                        <Stack direction={"column"} flexWrap={'wrap'}>
                            <Stack direction={'row'} justifyContent={'center'}>
                                <Button variant="contained" sx={{borderRadius:'32px', fontSize:'1.5rem'}} 
                                component={Link} smooth to={"/#planting-project"}><Typography color={"secondary"} textAlign={"center"} variant="h4" fontSize={{xs: "1.5rem", sm: "2.125rem"}}>Our Planting Project</Typography></Button>
                            </Stack>
                        </Stack>
                        <Stack gap={{xs: 1, sm: 2}} direction={"column"} flexWrap={"wrap"} id={'leaderboard'} bgcolor={"secondary.light"} borderRadius={'8px'} padding={"3% 2%"}>
                            <Leaderboard/>
                        </Stack>
                        <Stack bgcolor={"#cecece"} borderRadius={'8px'} padding={"3% 2%"}>
                            <PlantingProgress trees={total} total={target} />
                        </Stack>
                        <Stack gap={{xs: 1, sm: 2}} direction={"column"} flexWrap={"wrap"} bgcolor={"secondary.light"} style={{borderRadius: '8px'}} id={'planting-project'}>
                            <PlantingProjects/>
                        </Stack>
                        <Stack></Stack>
                    </Stack>
                </Container>
            </Stack>
        </ColorPalette>
    );
}