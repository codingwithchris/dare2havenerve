import { createMuiTheme } from '@material-ui/core/styles';

const localPalette = {
    black: '#000000',
    white: '#FFFFFF',
};

const bodyFontFamily = [
    'Montserrat',
    'system-ui',
    '-apple-system',
    'BlinkMacSystemFont',
    '"Helvetica Neue"',
    '"Segoe UI"',
    'Oxygen-Sans',
    'Ubuntu',
    'Cantarell',
    'sans-serif',
];

const headingFontFamily = [
    'Montserrat',
    'system-ui',
    '-apple-system',
    'BlinkMacSystemFont',
    '"Helvetica Neue"',
    '"Segoe UI"',
    'Oxygen-Sans',
    'Ubuntu',
    'Cantarell',
    'sans-serif',
];

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
        fontSize: 17,
        h1: {
            fontFamily: headingFontFamily.join(','),
            fontWeight: 700,
        },
        h2: {
            fontFamily: headingFontFamily.join(','),
            fontWeight: 700,
        },
        h3: {
            fontFamily: headingFontFamily.join(','),
            fontWeight: 700,
        },
        h4: {
            fontFamily: headingFontFamily.join(','),
            fontWeight: 700,
        },
        body1: {
            fontFamily: bodyFontFamily.join(','),
        },
    },
});
