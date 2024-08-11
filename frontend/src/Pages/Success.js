import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Stack, Typography } from "@mui/material";
import ColorPalette from "../Components/ColorPalette";

export default function Success() {
    const navigate = useNavigate();
    return (
        <ColorPalette>
            <Stack sx={{background: `linear-gradient(0deg, rgba(44,107,112,1) 0%, rgba(5,51,49,1) 80%);`}}>
                <Container fixed sx={{display: 'flex', minHeight: '70vh', justifyContent: 'center', alignItems: 'center'}}>
                    <Stack gap={3} maxWidth={"500px"} className="form" bgcolor={"white.light"}>
                        <Stack direction={"column"} gap={1}>
                            <Stack className="col">
                                <Typography variant="h2" color={"primary"} textAlign={"center"}>SAVED</Typography>
                            </Stack>
                            <Stack direction={"column"} gap={2}>
                                <Stack className="col">
                                    <Typography variant="h5" color={"secondary"} textAlign={"center"}>Your data transaction has been saved</Typography>
                                </Stack>
                                <Stack className="col">
                                    <Typography variant="h5" color={"secondary"} textAlign={"center"}>You can transfer your donation on this QRIS</Typography>
                                </Stack>
                                <Stack className="col">
                                    <Typography variant="h5" color={"secondary"} textAlign={"center"}>It may take some time to publish your transaction</Typography>
                                </Stack>
                            </Stack>
                        </Stack>
                        <Stack direction={"row"} gap={1} flexWrap={"wrap"} justifyContent={"center"}>
                            <Stack className="col">
                                <Button variant="contained" color={"primary"} onClick={()=>{navigate('/')}}>
                                    OK
                                </Button>
                            </Stack>
                        </Stack>
                    </Stack>
                </Container>
            </Stack>
        </ColorPalette>
    );
}