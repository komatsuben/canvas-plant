import React from "react";
import { Button, Container, Stack, Typography } from "@mui/material";

const Landing = () => {
    return (
        <>
            <Stack sx={{ background: `rgba(44,107,112,1)` }}>
                <Container fixed style={{ marginTop: "2%", marginBottom: "2%" }}>
                    <Stack>
                        <Typography variant={"h1"}>Canisius Vanguard SDGS</Typography>
                    </Stack>
                </Container>
            </Stack>
        </>);
}

export default Landing;