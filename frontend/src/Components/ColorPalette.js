import React from "react";
import { createTheme, ThemeProvider, alpha, getContrastRatio } from "@mui/material";

export default function ColorPalette(props) {
    let black_primary = '#0B2109';
    let dark_primary = '#0B2109'; //edit this if it looks ugly
    let primary = '#123300';
    let secondary = '#DBCF64';
    // let white = '#d7d9d8';
    let white = '#FFFFFF';

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