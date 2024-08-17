import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Stack, Typography } from "@mui/material";
import CustomInput from "../Components/CustomInput";
import CustomInputNumber from "../Components/CustomInputNumber";

export default function Tree(props) {
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
    const navigate = useNavigate();

    const [next, setNext] = useState(false);
    const [tree, setTree] = useState(0);
    const [message, setMessage] = useState('');
    const [price, setPrice] = useState(15000.00);

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');

    const handleNext = () => {
        fetch(`/api/user/?email=${email}`)
        .then(response => response.json())
        .then(data => {
            if (!data.error) {
                setName(data.name);
                setPhone(data.phone);
            } else {
                setName('');
                setPhone('');
            }
        })
        .catch(error => {
            alert(error);
        });
        // if (props.current_tree + parseInt(String(tree).replace(',', '')) <= props.target) {
        //     setNext(true);
        // } else {
        //     alert("Targeted tree limit exceed");
        // }
        setNext(true);
    }

    const handleForm = (event) => {
        event.preventDefault();
        const data = {
            user: {
                email: email,
                name: name,
                phone: phone
            },
            amount: parseInt(String(tree).replace(',', '')),
            message: message,
            type: "TREE"
        };

        fetch('/api/transaction/post', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === "Accepted") {
                navigate(`/success/?price=${parseInt(String(tree).replace(',', ''))*15_000}`);
            } else {
                alert(JSON.stringify(data.error));
            }
        })
        .catch(error => {
            alert(JSON.stringify(data));
        });
    };

    useEffect(()=>{
        setPrice(addThousandSeparator(price));
    }, [price]);

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', height: '100%', alignItems: 'center' }}>
            <form onSubmit={handleForm} style={{ maxWidth: '450px', width: '100%' }}>
                <Stack gap={3} className="form" bgcolor={"white.light"} justifyContent={"center"} height={"100%"}>
                    {next ? (
                        <>
                            <Stack className="col" direction={"column"} gap={1} width={'100%'}>
                                <Stack className="col">
                                    <Typography variant="h5" color={"primary"} textAlign={"center"}>DETAILS</Typography>
                                </Stack>
                                <Stack direction={"column"} gap={2}>
                                    <Stack className="col">
                                        <CustomInput name="name" label="Display Name" type={"text"} helperText={"Gunakan nama lengkap Anda (Please use your fullname)"} var={name} setVar={setName} fullWidth color={"primary"}/>
                                    </Stack>
                                    <Stack className="col">
                                        <CustomInput name="phone" label="Phone Number" type={"tel"} var={phone} setVar={setPhone} fullWidth color={"primary"}/>
                                    </Stack>
                                    <Stack className="col">
                                        <CustomInput name="message" label="Message" var={message} setVar={setMessage} multiline rows={3} fullWidth/>
                                    </Stack>
                                </Stack>
                            </Stack>
                            <Stack direction={"row"} gap={1} flexWrap={"wrap"}>
                                <Stack className="col">
                                    <Button variant="contained" color={"primary"} type="submit">
                                        Submit
                                    </Button>
                                </Stack>
                                <Stack className="col">
                                    <Button variant="outlined" color={"primary"} onClick={()=>{setNext(false)}}>
                                        Previous
                                    </Button>
                                </Stack>
                            </Stack>
                        </>
                    ) : (
                        <>
                            <Stack direction={"column"} gap={2} className="row center" flexWrap={"wrap"}>
                                <Stack className="col">
                                    <Typography variant="h5" color={"primary"} textAlign={"center"}>JOIN #CANVASPLANT</Typography>
                                </Stack>
                                <Stack className="col">
                                    <Typography variant="p" color={"primary"} textAlign={"center"}>IDR {price} / tree</Typography>
                                </Stack>
                            </Stack>
                            <Stack className="col" direction={"column"} gap={1} width={'100%'}>
                                <Stack direction={"row"} flexWrap={"wrap"} className="col" gap={1}>
                                    <Stack className="col">
                                        <Button variant={tree==5 ? "contained" : "outlined"} onClick={()=>setTree(5)} color={"primary"}>
                                            5 trees
                                        </Button>
                                    </Stack>
                                    <Stack className="col">
                                        <Button variant={tree==20 ? "contained" : "outlined"} onClick={()=>setTree(20)} color={"primary"}>
                                            20 trees
                                        </Button>
                                    </Stack>
                                </Stack>
                                <Stack direction={"row"} flexWrap={"wrap"} className="col" gap={1}>
                                    <Stack className="col">
                                        <Button variant={tree==50 ? "contained" : "outlined"} onClick={()=>setTree(50)} color={"primary"}>
                                            50 trees
                                        </Button>
                                    </Stack>
                                    <Stack className="col">
                                        <Button variant={tree==100 ? "contained" : "outlined"} onClick={()=>setTree(100)} color={"primary"}>
                                            100 trees
                                        </Button>
                                    </Stack>
                                </Stack>
                                <Stack className="col">
                                    <CustomInputNumber name="tree" label="Other Amount" var={tree} setVar={setTree} fullWidth color={"primary"} unit={"tree"}/>
                                </Stack>
                                <Stack className="col">
                                    <CustomInput name="email" label="Email Address" type={"email"} var={email} setVar={setEmail} fullWidth color={"primary"}/>
                                </Stack>
                            </Stack>
                            <Stack direction={"row"} flexWrap={"wrap"}>
                                <Stack className="col">
                                    <Button variant="contained" color={"primary"} onClick={()=>{handleNext()}}>
                                        Next
                                    </Button>
                                </Stack>
                            </Stack>
                        </>
                    )}
                </Stack>
            </form>
        </Box>
    );
}