import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Stack, Typography } from "@mui/material";
import ColorPalette from "../Components/ColorPalette";
import CustomToggle from "../Components/CustomToggle";
import Popup from "../Components/Popup";

export default function Success(props) {
    const navigate = useNavigate();
    const [popup, setPopup] = useState(false);
    const rekening = ["342-7702777", "YAY BUDI SISWA"];
    const [isQRIS, setIsQRIS] = useState(true);
    return (
        <ColorPalette>
            <Popup title={"QRIS"} trigger={popup} setTrigger={setPopup}>
                <Stack direction={"column"} justifyContent={"center"} alignItems={"center"} gap={2}>
                    {/* <Stack className="col">
                        <CustomToggle var={isQRIS} setVar={setIsQRIS} values={[true, false]} labels={["QRIS", "Rekening"]} exclusive color={"primary"}/>
                    </Stack> */}
                    <Stack className="col">
                        {/* {isQRIS ? (
                            <img src="/static/images/qris.jpg"/>
                        ) : (
                            <>
                                <Typography variant="h5" color={"primary"} textAlign={"center"} fontSize={{xs: "1rem", sm: "1.5rem"}}>
                                    No. Rekening: <b>{rekening[0]}</b>
                                </Typography>
                                <Typography variant="h5" color={"primary"} textAlign={"center"} fontSize={{xs: "1rem", sm: "1.5rem"}}>
                                    Nama: <b>{rekening[1]}</b>
                                </Typography>
                            </>
                        )} */}
                        <img src="/static/images/qris.jpg"/>
                    </Stack>
                </Stack>
            </Popup>
            <Stack sx={{background: `linear-gradient(0deg, rgba(44,107,112,1) 0%, rgba(5,51,49,1) 60%);`}}>
                <Container fixed sx={{display: 'flex', minHeight: '70vh', justifyContent: 'center', alignItems: 'center'}}>
                    <Stack gap={4} maxWidth={"600px"} className="form" bgcolor={"white.light"}>
                        <Stack direction={"column"} gap={2}>
                            <Stack className="col">
                                <Typography variant="h2" color={"primary"} textAlign={"center"}>SAVED</Typography>
                            </Stack>
                            <Stack direction={"column"} gap={1}>
                                <Stack className="col">
                                    <Typography variant="h5" color={"secondary"} textAlign={"center"} fontSize={{xs: "1rem", sm: "1.5rem"}}>Your data transaction has been saved</Typography>
                                </Stack>
                                <Stack className="col">
                                    <Typography variant="h5" color={"secondary"} textAlign={"center"} fontSize={{xs: "1rem", sm: "1.5rem"}}>You can transfer your donation on the QRIS</Typography>
                                </Stack>
                                <Stack className="col">
                                    <Typography variant="h5" color={"secondary"} textAlign={"center"} fontSize={{xs: "1rem", sm: "1.5rem"}}>It may take some time to publish your transaction</Typography>
                                </Stack>
                            </Stack>
                        </Stack>
                        <Stack direction={"row"} gap={1} flexWrap={"wrap"} justifyContent={"center"}>
                            <Stack className="col">
                                <Button variant="contained" color={"primary"} onClick={()=>{navigate('/')}}>
                                    OK
                                </Button>
                            </Stack>
                            <Stack className="col">
                                <Button variant="contained" color={"primary"} onClick={()=>{setPopup(true)}}>
                                    Show QRIS
                                </Button>
                            </Stack>
                        </Stack>
                    </Stack>
                </Container>
            </Stack>
        </ColorPalette>
    );
}