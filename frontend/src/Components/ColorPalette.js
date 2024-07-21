import React from "react";
import { createTheme, ThemeProvider, alpha, getContrastRatio } from "@mui/material"; 

export default function ColorPalette(props) {
    let black_primary = '#0b1f1e';
    let dark_primary = '#053331';
    let primary = '#296460';
    let secondary = '#bda26d';
    let white = '#d7d9d8';

    let theme = createTheme({});
    theme = createTheme(theme, {
        palette: {
            dark_forest: theme.palette.augmentColor({
                color: {
                    main: black_primary,
                },
                name: 'dark_forest',
            }),
            forest: theme.palette.augmentColor({
                color: {
                    main: dark_primary,
                },
                name: 'forest',
            }),
            primary: theme.palette.augmentColor({
                color: {
                    main: primary,
                },
                name: 'primary',
            }),
            secondary: theme.palette.augmentColor({
                color: {
                    main: secondary,
                    contrastText: white,
                },
                name: 'secondary',
            }),
            white: theme.palette.augmentColor({
                color: {
                    main: white,
                },
                name: 'white',
            }),
        },
    });
    return (
        <ThemeProvider theme={theme}>
            {props.children}
        </ThemeProvider>
    );
};