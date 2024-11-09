import React, { useState } from 'react';
import { Button, Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import ImageIcon from '@mui/icons-material/Image';
import CloseIcon from '@mui/icons-material/Close';

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

    return (
        <Stack className="col" spacing={2}>
            {props.var ? (
                <Button variant='outlined' color='error' startIcon={<ImageIcon />} endIcon={<CloseIcon onClick={handleClearImage} />}>
                    <Stack style={{width: "100%"}} direction={'row'}>
                        <Link to={fileURL} target='_blank' style={{color: "#f44336"}}>{fileName}</Link>
                    </Stack>
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
                    />  
                </Button>
            )}
        </Stack>
    );
};

export default ImageUpload;
