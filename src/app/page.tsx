import { Grid2 } from '@mui/material';
import { SearchUser, CardUser, PaginationUser } from '@/components/users';

export default function UsersPage() {
	return (
		<Grid2 container spacing={4} justifyContent="center" alignItems="center">
			<Grid2 size={{ xs: 12, lg: 3 }}>
				<SearchUser />
			</Grid2>

			<Grid2 size={12}>
				<CardUser />
			</Grid2>

			<Grid2>
				<PaginationUser />
			</Grid2>
		</Grid2>
	);
}
