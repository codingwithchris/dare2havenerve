import { createMuiTheme } from '@material-ui/core/styles';

const localPalette = {
    black: '#000000',
    white: '#FFFFFF',
};

export const theme = createMuiTheme({
    palette: {
        primary: {
            main: localPalette.black,
        },
        secondary: {
            main: localPalette.white,
        },
    },
    typography: {
        fontFamily: [
            'Roboto',
            'system-ui',
            '-apple-system',
            'BlinkMacSystemFont',
            '"Helvetica Neue"',
            '"Segoe UI"',
            'Oxygen-Sans',
            'Ubuntu',
            'Cantarell',
            'sans-serif',
        ].join(','),
        fontSize: 17,
    },
});
