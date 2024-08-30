import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Stack, Typography } from "@mui/material";
import CustomInput from "../Components/CustomInput";
import CustomInputNumber from "../Components/CustomInputNumber";

export default function Donate() {
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
    const [donation, setDonation] = useState(0);
    const [message, setMessage] = useState('');

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
            amount: parseInt(String(donation).replaceAll(',', '')),
            message: message,
            type: "DONATION"
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
                navigate(`/success/?price=${parseInt(String(donation).replaceAll(',', ''))}`);
            } else {
                alert(JSON.stringify(data.error));
            }
        })
        .catch(error => {
            alert(JSON.stringify(data));
        });
    };

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
                                    <Button variant="contained" color={"primary"} type="submit" disabled>
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
                                    <Typography variant="h5" color={"primary"} textAlign={"center"}>SPONSOR #CANVASPLANT</Typography>
                                </Stack>
                            </Stack>
                            <Stack className="col" direction={"column"} gap={1} width={'100%'}>
                                <Stack className="col">
                                    <CustomInputNumber name="donation" label="Amount" prefix={"IDR"} var={donation} setVar={setDonation} fullWidth color={"primary"}/>
                                </Stack>
                                <Stack className="col">
                                    <CustomInput name="email" label="Email Address" type={"email"} var={email} setVar={setEmail} fullWidth color={"primary"}/>
                                </Stack>
                            </Stack>
                            <Stack direction={"row"}>
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