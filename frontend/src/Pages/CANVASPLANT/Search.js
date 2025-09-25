import React, { useState, useEffect } from "react";
import { Box, Button, Container, Chip, Stack, Typography } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import ColorPalette from "../../Components/ColorPalette";
import CustomInput from "../../Components/CustomInput";
import CustomToggle from "../../Components/CustomToggle";
import DateTimeFormat from "../../Components/DateTimeFormat";
import axios from "axios";

export default function SearchForm() {
    const addThousandSeparator = (value) => {
        const parts = value.toString().split('.');
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        return parts.join('.');
    };
    
    const getCookie = (name) => {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
    const csrftoken = getCookie('csrftoken');

    const [keyword, setKeyword] = useState("");
    const [field, setField] = useState("user__name");
    const [results, setResults] = useState([]);

    useEffect(() => {
        const filter = {
            keyword: keyword,
            field: field
        };

        axios.post('/api/search/', filter, {
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken
            }
        })
        .then((response) => {
            setResults(response.data);
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
            setResults([]);
        });
    }, [keyword, field]);
    return (
        <ColorPalette>
            <Stack sx={{background: `linear-gradient(0deg, rgba(44,107,112,1) 0%, rgba(5,51,49,1) 60%);`}}>
                <Container fixed sx={{display: 'flex', minHeight: '70vh', justifyContent: 'center'}}>
                    <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
                        <Stack gap={3} direction={"column"} width="100%" maxWidth="800px" padding={2} bgcolor={'white.light'} borderRadius={'8px'}>
                            <Typography variant="h2" color={"primary"} fontSize={{xs: "2rem", sm: "3.75rem"}} textAlign={"center"}>SEARCH</Typography>
                            <Stack direction={"row"} gap={4} className="col" justifyContent={"space-evenly"}>
                                <CustomInput endIcon={<SearchIcon/>} name="Search" type="text" label="Search" var={keyword} setVar={setKeyword} color={"secondary"}/>
                                <CustomToggle var={field} setVar={setField} values={["user__name", "message", "timestamp"]} labels={["NAME", "MESSAGE", "DATE"]} exclusive color={"secondary"}/>
                            </Stack>
                            <Stack gap={2} direction={"column"}>
                                {
                                    results.length>0 ? (
                                        results.map((data, index)=>(
                                            <Stack key={index} gap={1} padding={2} className="form" bgcolor={"white.light"} borderRadius={2}>
                                                <Stack direction={"row"} flexWrap={"wrap"} justifyContent="space-between" alignItems="center">
                                                    <Typography variant="h5" color={"primary"}>{data.user.name}</Typography>
                                                    <Chip label={`${addThousandSeparator(data.amount)} tree(s)`} sx={{fontSize: "0.8em"}} variant="outlined" color={"primary"}/>
                                                </Stack>
                                                {data.message ? (
                                                    <Stack direction={"row"} flexWrap={"wrap"} justifyContent="space-between" alignItems="center">
                                                        <Typography variant="body1" color={"secondary"}>{data.message}</Typography>
                                                        <Typography variant="body2" color={"textSecondary"}><DateTimeFormat timestamp={data.timestamp}/></Typography>
                                                    </Stack>
                                                ) : (
                                                    <Typography variant="body2" color={"textSecondary"} textAlign={"end"}><DateTimeFormat timestamp={data.timestamp}/></Typography>
                                                )}
                                            </Stack>
                                        ))
                                    ) : (
                                        keyword ? (
                                            <Typography variant="body2" color={"textSecondary"} textAlign={"center"}>No results found</Typography>
                                        ) : (
                                            <Typography variant="body2" color={"textSecondary"} textAlign={"center"}>You can search the previous successful donation</Typography>
                                        )
                                    )
                                }
                            </Stack>
                        </Stack>
                    </Box>
                </Container>
            </Stack>
        </ColorPalette>
    );
}
