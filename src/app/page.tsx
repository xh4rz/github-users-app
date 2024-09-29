import { Grid2 } from '@mui/material';

import { SearchUser, CardUser } from '@/components/users';

export default function UserPage() {
	return (
		<Grid2 container spacing={4} justifyContent="center" alignItems="center">
			<Grid2 size={{ xs: 12, lg: 3 }}>
				<SearchUser />
			</Grid2>

			<Grid2 size={12}>
				<CardUser />
			</Grid2>
		</Grid2>
	);
}
