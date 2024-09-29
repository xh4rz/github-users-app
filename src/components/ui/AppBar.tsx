import { Box, Divider, Typography } from '@mui/material';
import Image from 'next/image';

export const AppBar = ({ children }: { children: React.ReactNode }) => {
	return (
		<Box m={10}>
			<Box display="flex" justifyContent="center" alignItems="center">
				<Image
					src="/img/logos/github-logo.svg"
					width={100}
					height={100}
					alt="logo github"
					priority
				/>

				<Typography ml={2} variant="h4">
					GitHub Usuarios
				</Typography>
			</Box>

			<Divider sx={{ mt: 4, mb: 4 }} />

			{children}
		</Box>
	);
};
