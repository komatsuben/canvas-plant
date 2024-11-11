import React, { useState } from 'react';
import { Button, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import ImageIcon from '@mui/icons-material/Image';
import CloseIcon from '@mui/icons-material/Close';
import zIndex from '@mui/material/styles/zIndex';

const ImageUpload = (props) => {
    const [fileName, setFileName] = useState(props.var ? props.var.name : '');
    const [fileURL, setFileURL] = useState(props.var ? URL.createObjectURL(props.var) : '');
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        props.setVar(file);
        setFileName(file.name);
        setFileURL(URL.createObjectURL(file))
    };

    const handleClearImage = () => {
        props.setVar('');
        setFileName('');
        setFileURL('')
    };

    function truncateString(str) {
        if (str.length > 15) {
            return str.slice(0, 15) + '...';
        } else {
            return str;
        }
    }      

    return (
        <Stack className="col" spacing={2}>
            {props.var ? (
                <Button variant='outlined' color='error' startIcon={<ImageIcon />} endIcon={<CloseIcon sx={{zIndex:5}} onClick={handleClearImage} />}>
                    <Link to={fileURL} target='_blank'>
                        <Stack style={{width: "100%"}} direction={'row'}>
                            <Typography color={"#f44336"} variant='p' textTransform={"None"}>{truncateString(fileName)}</Typography>
                        </Stack>
                    </Link>
                </Button>
            ) : (
                <Button
                    component="label"
                    role={undefined}
                    variant="contained"
                    tabIndex={-1}
                    startIcon={<props.icon />}
                >
                    Upload Image
                    <input
                        type="file"
                        style={{ display: 'none' }}
                        accept="image/*"
                        onChange={handleImageChange}
                        required
                    />  
                </Button>
            )}
        </Stack>
    );
};

export default ImageUpload;
