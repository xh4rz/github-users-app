import { createTheme } from '@mui/material/styles';

const theme = createTheme({
	palette: {
		mode: 'dark',
		primary: {
			main: '#297190'
		},
		secondary: {
			main: '#b4711a'
		}
	},
	typography: {
		fontFamily: "'Futura Md BT', sans-serif"
	}
});

const primaryColor = theme.palette.primary.main;
const secondaryColor = theme.palette.secondary.main;

const primaryColorRgb = 'rgb(41, 113, 144)';
const secondaryColorRgb = 'rgb(180, 113, 26)';

export { primaryColor, secondaryColor, primaryColorRgb, secondaryColorRgb };

export default theme;