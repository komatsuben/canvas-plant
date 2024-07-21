import React, { useEffect, useState } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import CustomInputNumber from "./CustomInputNumber";
import ColorPalette from "./ColorPalette";

export default function Donate() {
    const addThousandSeparator = (value) => {
        const parts = value.toString().split('.');
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        return parts.join('.');
    };

    const [tree, setTree] = useState('');
    const [price, setPrice] = useState(15000.00);

    useEffect(()=>{
        setPrice(addThousandSeparator(price));
    }, [price]);

    return (
        <form>
            <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
                <Stack gap={5} className="form" maxWidth={'350px'} bgcolor={'#d7d9d8'}>
                    <Stack direction={"column"} gap={2} className="row center" flexWrap={"wrap"}>
                        <Stack className="col">
                            <Typography variant="h5" color={"primary"} textAlign={"center"}>JOIN #REFORESTATION</Typography>
                        </Stack>
                        <Stack className="col">
                            <Typography variant="p" color={"primary"} textAlign={"center"}>IDR {price} / tree</Typography>
                        </Stack>
                    </Stack>
                    <Stack className="col" direction={"column"} gap={1} width={'100%'}>
                        <Stack direction={"row"} flexWrap={"wrap"} className="col" gap={1}>
                            <Stack className="col">
                                <Button variant="outlined" color={"primary"}>
                                    5 trees
                                </Button>
                            </Stack>
                            <Stack className="col">
                                <Button variant="outlined" color={"primary"}>
                                    20 trees
                                </Button>
                            </Stack>
                        </Stack>
                        <Stack direction={"row"} flexWrap={"wrap"} className="col" gap={1}>
                            <Stack className="col">
                                <Button variant="outlined" color={"primary"}>
                                    50 trees
                                </Button>
                            </Stack>
                            <Stack className="col">
                                <Button variant="outlined" color={"primary"}>
                                    100 trees
                                </Button>
                            </Stack>
                        </Stack>
                        <Stack className="col">
                            <CustomInputNumber name="tree" label="Other Amount" var={tree} setVar={setTree} fullWidth color={"primary"}/>
                        </Stack>
                    </Stack>
                    <Stack direction={"row"}>
                        <Stack className="col">
                            <Button variant="contained" color={"primary"}>
                                Submit
                            </Button>
                        </Stack>
                    </Stack>
                </Stack>
            </Box>
        </form>
    );
}