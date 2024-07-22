import React, { useEffect, useState } from "react";
import { Button, Stack, Typography } from "@mui/material";

export default function PlantingProjects() {
    return (
        <Stack gap={3} direction={"column"} flexWrap={"wrap"} padding={'3%'}>
            <Stack className="col">
                <Typography 
                    variant="h2" color={"primary"} 
                    fontSize={{xs: "2rem", sm: "3.75rem"}} 
                    textAlign={"center"}
                >
                    PLANTING PROJECTS
                </Typography>
            </Stack>
            <Stack direction={"row"} gap={2} flexWrap={"wrap"}>
                <Typography color={"primary"} variant="p">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco 
                    laboris nisi ut aliquip ex ea commodo consequat. 
                    Duis aute irure dolor in reprehenderit in voluptate velit esse 
                    cillum dolore eu fugiat nulla pariatur. 
                    Excepteur sint occaecat cupidatat non proident, 
                    sunt in culpa qui officia deserunt mollit anim id est laborum.
                </Typography>
                <Typography color={"primary"} variant="p">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco 
                    laboris nisi ut aliquip ex ea commodo consequat. 
                    Duis aute irure dolor in reprehenderit in voluptate velit esse 
                    cillum dolore eu fugiat nulla pariatur. 
                    Excepteur sint occaecat cupidatat non proident, 
                    sunt in culpa qui officia deserunt mollit anim id est laborum.
                </Typography>
            </Stack>
        </Stack>
    );
}