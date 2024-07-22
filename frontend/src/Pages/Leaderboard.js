import React, { useEffect, useState } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import CustomInput from "../Components/CustomInput";
import CustomToggle from "../Components/CustomToggle";

export default function Leaderboard() {
    const [search, setSearch] = useState('');
    const [isRecent, setIsRecent] = useState(true);

    const addThousandSeparator = (value) => {
        const parts = value.toString().split('.');
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        return parts.join('.');
    };

    const generateBoard = (data) => {
        let res = [];
        for (let i=0; i<30; i++) {
            res.push(<></>)
        }
    }

    return (
        <form>
            <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
                <Stack gap={3} direction={"column"}>
                    <Typography variant="h2" color={"primary"} fontSize={{xs: "2rem", sm: "3.75rem"}} textAlign={"center"}>LEADERBOARD</Typography>
                    <Stack direction={"row"} gap={2}>
                        <CustomInput name="Search" type="text" label="Search" var={search} setVar={setSearch} color={"secondary"}/>
                        <CustomToggle var={isRecent} setVar={setIsRecent} values={[true, false]} labels={["MOST RECENT", "MOST TREES"]} exclusive color={"secondary"}/>
                    </Stack>
                    <Stack direction={"column"}></Stack>
                </Stack>
            </Box>
        </form>
    );
}