import { createTheme } from "@mui/material";
import { ThemeOptions, PaletteOptions } from "@mui/material";

interface ThemeConfig extends ThemeOptions {
    palette:PaletteOptions & {
        white: {
            main: string,
        },
        success: {
            main: string
        }
    }
}

const config: ThemeConfig = {
    palette: {
        primary: {
            main: "#691d3d"
        },
        white : {
            main: "#FFEECF"
        },
        success: {
            main: "#4BB543"
        }
    }
}

export const themes = createTheme(config);
