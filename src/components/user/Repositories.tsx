import { useUserStore } from '@/store/user/user-store';
import { Box, Card, Divider, Grid2, Link, Typography } from '@mui/material';
import { secondaryColor, secondaryColorRgb } from '../themeRegistry/theme';

export const Repositories = () => {
	const { loadingUser, repositories } = useUserStore();

	if (loadingUser) {
		return <></>;
	}

	if (repositories.length === 0) {
		return (
			<Typography fontSize={20} fontWeight="bold" textAlign="center" mb={2}>
				No cuenta con repositorios públicos.
			</Typography>
		);
	}

	return (
		<>
			<Typography fontSize={20} fontWeight="bold" textAlign="center" mb={2}>
				Repositorios
			</Typography>

			<Box width={'100%'} mb={5}>
				<Divider />
			</Box>

			<Grid2 container justifyContent="center" spacing={2}>
				{repositories.map(
					({ id, html_url, full_name, language, forks, stargazers_count }) => (
						<Grid2
							key={id}
							size={{ xs: 12, md: 6, lg: 3 }}
							flexDirection="column"
						>
							<Card
								key={id}
								sx={{
									display: 'flex',
									flexDirection: 'column',
									gap: 2,
									p: 2,
									'&:hover': {
										boxShadow: `0 0 10px ${secondaryColorRgb}, 0px 0px 20px ${secondaryColorRgb}`
									}
								}}
							>
								<Link
									variant="body2"
									underline="hover"
									sx={{
										color: secondaryColor,
										cursor: 'pointer',
										fontSize: 15
									}}
									href={html_url}
									target="_blank"
								>
									{full_name}
								</Link>

								<Box display="flex" gap={2}>
									{language && (
										<Typography fontSize={13}>{language}</Typography>
									)}
									<Typography fontSize={13}>Forks: {forks}</Typography>
									<Typography fontSize={13}>
										Stars: {stargazers_count}
									</Typography>
								</Box>
							</Card>
						</Grid2>
					)
				)}
			</Grid2>
		</>
	);
};
