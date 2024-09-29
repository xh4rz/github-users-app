'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { CustomButton } from '@/components/button/CustomButton';
import { useUserStore } from '@/store/user/user-store';
import { Box, Typography } from '@mui/material';
import ReplyIcon from '@mui/icons-material/Reply';

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
	};

	if (loadingUser) {
		return <h1>Cargando...</h1>;
	}

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

			<Box display="flex" flexDirection="column" alignItems="center">
				{!user.login ? (
					<h1>Usuario no encontrado.</h1>
				) : (
					<Box display="flex" gap={5}>
						<Image
							src={user.avatar_url}
							width={300}
							height={300}
							alt="avatar github"
							priority
						/>

						<Box display="flex" flexDirection="column" gap={1}>
							<Typography>Nombre: {user.name}</Typography>
							<Typography>Alias: {user.login}</Typography>
							<Typography>
								Repositorios Publicos: {user.public_repos}
							</Typography>
							<Typography>Seguidores: {user.followers}</Typography>
							<Typography>Seguidos: {user.following}</Typography>
							<Typography>
								Fecha De Creacion:{' '}
								{new Date(user.created_at).toLocaleDateString()}
							</Typography>
						</Box>
					</Box>
				)}
			</Box>
		</>
	);
}
