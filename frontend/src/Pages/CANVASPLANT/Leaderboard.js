import React, { useEffect, useState } from "react";
import { Box, Button, Chip, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';
import CustomToggle from "../../Components/CustomToggle";
import DateTimeFormat from "../../Components/DateTimeFormat";
import axios from "axios";

export default function Leaderboard() {
    const addThousandSeparator = (value) => {
        const parts = value.toString().split('.');
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        return parts.join('.');
    };

    const [isRecent, setIsRecent] = useState(true);
    const [mostRecent, setMostRecent] = useState([]);
    const [mostTree, setMostTree] = useState([]);

    useEffect(() => {
        const fetchLeaderboard = async () => {
            try {
                const [recentRes, treeRes] = await Promise.all([
                    axios.get('/api/leaderboard/recent'),
                    axios.get('/api/leaderboard/tree')
                ]);
                setMostRecent(recentRes.data);
                setMostTree(treeRes.data);
            } catch (error) {
                console.error("Error fetching leaderboard:", error);
            }
        };
        fetchLeaderboard();
    }, []);

    return (
        <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
            <Stack gap={3} direction={"column"} width="100%" maxWidth="800px" padding={2}>
                <Typography variant="h2" color={"primary"} fontSize={{xs: "2rem", sm: "3.75rem"}} textAlign={"center"}>LEADERBOARD</Typography>
                <Stack direction={"row"} gap={4} className="col" justifyContent={"center"}>
                    <Button startIcon={<SearchIcon/>} variant="contained" sx={{borderRadius:'32px', fontSize:'1.5rem'}}>
                        <Link to={`/search`} target="_blank">
                            <Typography fontSize={{xs: "0.5rem", sm:"0.875rem"}} color={"secondary"}>Search</Typography>
                        </Link>
                    </Button>
                    <CustomToggle var={isRecent} setVar={setIsRecent} values={[true, false]} labels={["MOST RECENT", "MOST TREES"]} exclusive color={"primary"}/>
                </Stack>
                <Stack gap={2} direction={"column"}>
                    {isRecent ?
                        mostRecent.map((data, index)=>(
                            <Stack key={index} gap={1} padding={2} className="form" bgcolor={"white.light"} borderRadius={2}>
                                <Stack direction={"row"} flexWrap={"wrap"} justifyContent="space-between" alignItems="center">
                                    <Typography variant="h5" color={"primary"} fontSize={{xs: "1rem", sm: "1.5rem"}}>{data.name}</Typography>
                                    <Chip label={`${addThousandSeparator(data.amount)} tree(s)`} sx={{fontSize: "0.8em"}} variant="outlined" color={"primary"}/>
                                </Stack>
                                {data.message ? (
                                    <Stack direction={"row"} flexWrap={"wrap"} justifyContent="space-between" alignItems="center">
                                        <Typography variant="body1" color={"primary"}>{data.message}</Typography>
                                        <Typography variant="body2" color={"textSecondary"}><DateTimeFormat timestamp={data.timestamp}/></Typography>
                                    </Stack>
                                ) : (
                                    <Typography variant="body2" color={"textSecondary"} textAlign={"end"}><DateTimeFormat timestamp={data.timestamp}/></Typography>
                                )}
                            </Stack>
                        ))
                    :
                        mostTree.map((data, index)=>(
                            <Stack key={index} gap={2} padding={2} className="form" bgcolor={"white.light"} borderRadius={2}>
                                <Stack direction={"row"} flexWrap={"wrap"} justifyContent="space-between" alignItems="center">
                                    <Typography variant="h5" color={"primary"} fontSize={{xs: "1rem", sm: "1.5rem"}}>{data.name}</Typography>
                                    <Chip label={`${addThousandSeparator(data.tree)} tree(s)`} sx={{fontSize: "0.8em"}} variant="outlined" color={"primary"}/>
                                </Stack>
                            </Stack>
                        ))
                    }
                </Stack>
            </Stack>
        </Box>
    );
}