import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Stack, Typography } from "@mui/material";
import CustomInput from "../../Components/CustomInput";
import CustomInputNumber from "../../Components/CustomInputNumber";
import Popup from "../../Components/Popup";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ImageUpload from "../../Components/ImageUpload";
import axios from "axios";

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

    const [popup, setPopup] = useState(false);
    const [next, setNext] = useState(false);

    const [tree, setTree] = useState(0);
    const [message, setMessage] = useState('');
    const [price, setPrice] = useState(15000.00);

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [image, setImage] = useState(null);

    useEffect(() => {
        console.log(image);
    }, [image]);

    const handleNext = async () => {
        if (!email) {
            alert("Please enter your email first.");
            return;
        }
        
        if (!phone) {
            alert("Please enter your phone number first.");
            return;
        }
    
        try {
            const response = await axios.get(`/api/user/`, {
                params: {
                    email: email,
                    name: name || "",
                    phone: phone || ""
                }
            });
    
            const data = response.data;
    
            setEmail(data.email || email);
            setName(data.name || name);
            if (data.phone) setPhone(data.phone);
            
            setNext(true);
    
        } catch (error) {
            console.error(error.response || error);
            console.error("POST error:", error.response?.data || error);
            alert("Something went wrong: " + JSON.stringify(error.response?.data || error.message, null, 2));
        }
    };
    
    const handleForm = async (event) => {
        event.preventDefault();
        
        // 1️⃣ Validate tree selection
        if (!tree || tree <= 0) {
            alert("Please select a tree amount.");
            return;
        }
        
        // 2️⃣ Validate image upload
        if (!image || !(image instanceof File)) {
            alert("Please upload transaction proof.");
            return;
        }
        
        // 3️⃣ Prepare FormData with user data as JSON string
        const formData = new FormData();
        const normalizedPhone = phone.replace(/\D/g, ''); // remove all non-digits
        const formattedPhone = '+' + normalizedPhone; 
        
        // Create user object and stringify it
        const userObj = {
            email: email,
            name: name,
            phone: formattedPhone
        };
        
        // Append user data as JSON string
        formData.append("user", JSON.stringify(userObj));
        formData.append("amount", parseInt(String(tree).replaceAll(",", "")));
        formData.append("message", message || "");
        formData.append("transaction_prove", image);
        formData.append("type", "TREE");
        
        // Log FormData for debugging
        console.log("Submitting form with data:");
        for (let [key, value] of formData.entries()) {
            console.log(key, value);
        }
        
        try {
            const response = await axios.post("/api/transaction/post", formData, {
                headers: {
                    "X-CSRFToken": csrftoken,
                    // Let browser set Content-Type for FormData with boundary
                },
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
            alert("Something went wrong: " + JSON.stringify(error.response?.data, null, 2));

        }
    };
    
    return (
        <>
            <Popup title={"QRIS"} trigger={popup} setTrigger={setPopup}>
                <Stack direction={"column"} justifyContent={"center"} alignItems={"center"} gap={2}>
                    <Stack>
                        {/* TODO: make sure to check the special code in amount. is it still 0.64? */}
                        <Typography variant="h3">Amount: Rp {addThousandSeparator(tree*parseInt(price)+0.64)}</Typography>
                    </Stack>
                    <Stack className="col">
                        {/* TODO: revise the qris image here if it changes for this year */}
                        <img src="/static/images/qris.jpg"/>
                    </Stack>
                </Stack>
            </Popup>
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
                                        <Typography variant="p" color={"primary"} textAlign={"center"}>IDR {addThousandSeparator(price)} / tree</Typography>
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
                                        <CustomInput name="email" label="Email Address" type={"email"} var={email} setVar={setEmail} fullWidth color={"primary"} required/>
                                    </Stack>
                                    <Stack className="col">
                                        <CustomInput name="phone" label="Phone Number" type={"tel"} var={phone} setVar={setPhone} fullWidth color={"primary"} required/>
                                    </Stack>
                                </Stack>
                                <Stack direction={"row"} flexWrap={"wrap"} gap={1}>
                                    <Stack className="col">
                                        <ImageUpload var={image} setVar={setImage} icon={CloudUploadIcon} />
                                    </Stack>
                                    <Stack className="col">
                                        <Button variant="contained" color={"primary"} onClick={()=>{setPopup(true)}}>
                                            QRIS
                                        </Button>
                                    </Stack>
                                </Stack>
                                <Stack direction={"row"} flexWrap={"wrap"} gap={2}>
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
        </>
    );
}