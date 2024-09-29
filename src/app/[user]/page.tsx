'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { CustomButton } from '@/components/button/CustomButton';
import { useUserStore } from '@/store/user/user-store';
import {
	Box,
	Card,
	CardActions,
	CardContent,
	Typography,
	Skeleton,
	Paper
} from '@mui/material';
import { secondaryColorRgb } from '@/components/themeRegistry/theme';
import { clearToast } from '@/utils';
import ReplyIcon from '@mui/icons-material/Reply';
import GitHubIcon from '@mui/icons-material/GitHub';
import { Repositories } from '@/components/user/Repositories';

export default function UserProfilePage({
	params
}: {
	params: { user: string };
}) {
	const router = useRouter();

	const { getUser, user, loadingUser, cleanUser } = useUserStore();

	useEffect(() => {
		getUser(params.user);

		return () => {
			cleanUser();
		};
	}, [params.user]);

	const handleBack = () => {
		router.push('/');
		clearToast();
	};

	return (
		<>
			<Box width={150} mb={5}>
				<CustomButton
					title="Volver"
					variant="contained"
					color="primary"
					icon={ReplyIcon}
					onHandleClick={handleBack}
				/>
			</Box>

			{!user.login && !loadingUser ? (
				<Box display="flex" justifyContent="center">
					<Box component={Paper} p={2}>
						<Typography align="center" variant="h6" component="div">
							No se ha encontrado información del usuario{' '}
							{' ' + params.user + ' '}
							inténtelo con otro.
						</Typography>
					</Box>
				</Box>
			) : (
				<Box display="flex" flexDirection="column" alignItems="center">
					<Card
						sx={{
							display: 'flex',
							'&:hover': {
								boxShadow: !loadingUser
									? `0 0 10px ${secondaryColorRgb}, 0px 0px 20px ${secondaryColorRgb}`
									: 'none'
							},
							padding: 2
						}}
					>
						<CardActions sx={{ padding: 0 }}>
							{loadingUser ? (
								<Skeleton
									variant="rectangular"
									animation="wave"
									width={300}
									height={300}
								/>
							) : (
								<Image
									src={user.avatar_url}
									width={300}
									height={300}
									alt="avatar github"
									priority
								/>
							)}
						</CardActions>

						<CardContent
							sx={{
								width: '100%',
								display: 'flex',
								flexDirection: 'column',
								gap: 1,
								'&.MuiCardContent-root': {
									paddingBottom: 2,
									paddingRight: 0
								}
							}}
						>
							{loadingUser ? (
								<Skeleton
									variant="rectangular"
									animation="wave"
									width={300}
									height={30}
									sx={{ mb: 5 }}
								/>
							) : (
								<Box
									display="flex"
									alignItems="center"
									justifyContent="center"
									mb={2}
								>
									<Typography fontSize={20} fontWeight="bold">
										{user.name}
									</Typography>
								</Box>
							)}

							{loadingUser ? (
								<Skeleton
									variant="rectangular"
									animation="wave"
									width={300}
									height={20}
								/>
							) : (
								<Box display="flex" gap={1} alignItems="center">
									<Typography fontSize={16}>Nombre de usuario:</Typography>

									<Typography fontSize={16} fontWeight="bold" color="secondary">
										{user.login}
									</Typography>
								</Box>
							)}

							{loadingUser ? (
								<Skeleton
									variant="rectangular"
									animation="wave"
									width={300}
									height={20}
								/>
							) : (
								<Box display="flex" gap={1} alignItems="center">
									<Typography fontSize={16}>Seguidores:</Typography>

									<Typography fontSize={16} fontWeight="bold" color="secondary">
										{user.followers}
									</Typography>
								</Box>
							)}

							{loadingUser ? (
								<Skeleton
									variant="rectangular"
									animation="wave"
									width={300}
									height={20}
								/>
							) : (
								<Box display="flex" gap={1} alignItems="center">
									<Typography fontSize={16}>Seguidos:</Typography>

									<Typography fontSize={16} fontWeight="bold" color="secondary">
										{user.following}
									</Typography>
								</Box>
							)}

							{loadingUser ? (
								<Skeleton
									variant="rectangular"
									animation="wave"
									width={300}
									height={20}
								/>
							) : (
								<Box display="flex" gap={1} alignItems="center">
									<Typography fontSize={16}>Repositorios públicos:</Typography>

									<Typography fontSize={16} fontWeight="bold" color="secondary">
										{user.public_repos}
									</Typography>
								</Box>
							)}

							{loadingUser ? (
								<Skeleton
									variant="rectangular"
									animation="wave"
									width={300}
									height={20}
								/>
							) : (
								<Box display="flex" gap={1} alignItems="center">
									<Typography fontSize={16}>Fecha de creación:</Typography>

									<Typography fontSize={16} fontWeight="bold" color="secondary">
										{new Date(user.created_at).toLocaleDateString()}
									</Typography>
								</Box>
							)}

							{loadingUser ? (
								<Skeleton
									variant="rectangular"
									animation="wave"
									width={100}
									height={30}
									sx={{ mt: 2, margin: 'auto' }}
								/>
							) : (
								<Box
									display="flex"
									alignItems="center"
									justifyContent="center"
									mt={2}
								>
									<Link href={user.html_url} target="_blank">
										<CustomButton
											title="Visitar"
											variant="contained"
											color="secondary"
											icon={GitHubIcon}
										/>
									</Link>
								</Box>
							)}
						</CardContent>
					</Card>

					<Box mt={5}>
						<Repositories />
					</Box>
				</Box>
			)}
		</>
	);
}
