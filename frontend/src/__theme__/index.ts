import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

const bodyFontFamily = [
    'Inter',
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

// eslint-disable-next-line
const themeConfig = createMuiTheme({
    palette: {
        background: {
            default: '#000000',
            paper: '#111111',
        },
        type: 'dark',
    },
    typography: {
        fontFamily: bodyFontFamily.join(','),
        fontSize: 17,
        h1: {
            fontWeight: 900,
        },
        h2: {
            fontWeight: 900,
        },
        h3: {
            fontWeight: 900,
        },
        h4: {
            fontWeight: 900,
        },
        h5: {
            fontWeight: 900,
        },
        h6: {
            fontWeight: 600,
        },
        body1: {
            fontWeight: 400,
        },
        body2: {
            fontWeight: 400,
        },
    },
});

export const theme = responsiveFontSizes(themeConfig);
