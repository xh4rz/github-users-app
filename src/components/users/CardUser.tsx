'use client';

import Image from 'next/image';
import { userStore } from '@/store/userStore';
import { Box, Card, Grid2, Typography } from '@mui/material';
import { CustomButton } from '../button/CustomButton';
import { secondaryColorRgb } from '../themeRegistry/theme';
import VisibilityIcon from '@mui/icons-material/Visibility';

export const CardUser = () => {
	const { users } = userStore();

	return (
		<Grid2 container justifyContent="center" spacing={2}>
			{users.map(({ id, avatar_url, login }) => (
				<Grid2
					key={id}
					size={{ xs: 12, md: 6, lg: 3, xl: 2 }}
					flexDirection="column"
				>
					<Card
						key={id}
						sx={{
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							gap: 2,
							p: 2,
							'&:hover': {
								boxShadow: `0 0 10px ${secondaryColorRgb}, 0px 0px 20px ${secondaryColorRgb}`
							}
						}}
					>
						<Image
							src={avatar_url}
							width={100}
							height={100}
							alt="avatar github"
							style={{
								borderRadius: '50%'
							}}
						/>

						<Typography variant="subtitle1" fontSize={20}>
							{login}
						</Typography>

						<Box width={200}>
							<CustomButton
								title="Ver Detalles"
								variant="outlined"
								color="secondary"
								icon={VisibilityIcon}
							/>
						</Box>
					</Card>
				</Grid2>
			))}
		</Grid2>
	);
};
