'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useUsersStore } from '@/store/users/users-store';
import { Card, CardContent, Grid2, Skeleton, Typography } from '@mui/material';
import { CustomButton } from '../button/CustomButton';
import { secondaryColorRgb } from '../themeRegistry/theme';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { clearToast } from '@/utils';

export const CardUser = () => {
	const router = useRouter();

	const { users, loadingUsers } = useUsersStore();

	const handleClick = (username: string) => {
		router.push(`/${username}`);
		clearToast();
	};

	return (
		<Grid2 container justifyContent="center" spacing={2}>
			{users.map(({ id, avatar_url, login: username }) => (
				<Grid2
					key={id}
					size={{ xs: 12, md: 6, lg: 3, xl: 2 }}
					flexDirection="column"
				>
					{loadingUsers ? (
						<Card>
							<Skeleton
								variant="rectangular"
								animation="wave"
								width="100%"
								height={180}
							/>

							<CardContent>
								<Skeleton
									variant="rectangular"
									animation="wave"
									width="100%"
									height={20}
								/>
							</CardContent>
						</Card>
					) : (
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
								priority
							/>

							<Typography variant="subtitle1" fontSize={20}>
								{username}
							</Typography>

							<CustomButton
								title="Ver Detalles"
								variant="outlined"
								color="secondary"
								icon={VisibilityIcon}
								onHandleClick={() => handleClick(username)}
							/>
						</Card>
					)}
				</Grid2>
			))}
		</Grid2>
	);
};
