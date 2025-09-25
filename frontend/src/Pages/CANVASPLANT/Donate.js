import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Stack, Typography } from "@mui/material";
import CustomInput from "../../Components/CustomInput";
import CustomInputNumber from "../../Components/CustomInputNumber";
import axios from "axios";

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

    const handleNext = async () => {
        try {
            const response = await axios.get(`/api/user/`, {
                params: { email }
            });
            const data = response.data;
            if (!data.error) {
                setName(data.name);
                setPhone(data.phone);
            } else {
                setName('');
                setPhone('');
            }
        } catch (error) {
            alert(error);
        }
        setNext(true);
    };

    const handleForm = async (event) => {
        event.preventDefault();
    
        if (!tree || tree <= 0) {
            alert("Please select a tree amount.");
            return;
        }
    
        if (!image || !(image instanceof File)) {
            alert("Please upload transaction proof.");
            return;
        }
    
        // Format phone number for Indonesia (add country code if needed)
        let formattedPhone = '';
        if (phone) {
            // Remove all non-digit characters
            let digits = phone.replace(/\D/g, '');
            
            // If the number starts with 0, replace with country code
            if (digits.startsWith('0')) {
                digits = `62${digits.substring(1)}`;
            }
            // If the number doesn't start with a country code, add it
            else if (!digits.startsWith('62')) {
                digits = `62${digits}`;
            }
            
            formattedPhone = `+${digits}`;
        }
    
        // Parse tree amount to integer
        const amount = parseInt(String(tree).replaceAll(",", ""));
        if (isNaN(amount) || amount <= 0) {
            alert("Invalid tree amount.");
            return;
        }
    
        // Create user object and stringify it
        const userData = {
            email: email,
            name: name || "",
            phone: formattedPhone
        };
    
        const formData = new FormData();
        formData.append("user", JSON.stringify(userData));
        formData.append("amount", amount);
        formData.append("message", message || "");
        formData.append("transaction_prove", image);
        formData.append("type", "TREE");
    
        try {
            const response = await axios.post("/api/transaction/post", formData, {
                headers: {
                    "X-CSRFToken": csrftoken,
                    "Content-Type": "multipart/form-data"
                }
            });
    
            const data = response.data;
    
            if (data.status === "Accepted") {
                alert("Transaction saved successfully!");
                navigate("/");
            } else {
                console.error("Rejected data:", data.error);
                alert("Transaction rejected: " + JSON.stringify(data.error));
            }
        } catch (error) {
            console.error("POST error:", error.response?.data || error);
            if (error.response) {
                console.error("Error data:", error.response.data);
                console.error("Error status:", error.response.status);
                alert(`Error ${error.response.status}: ${JSON.stringify(error.response.data)}`);
            } else if (error.request) {
                alert("No response received from server.");
            } else {
                alert(`Error: ${error.message}`);
            }
        }
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