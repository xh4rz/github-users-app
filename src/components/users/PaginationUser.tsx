'use client';

import { ChangeEvent, useState } from 'react';
import { useUsersStore } from '@/store/users/users-store';
import { Pagination } from '@mui/material';

export const PaginationUser = () => {
	const { saveUserSearch, totalCount, getUsers } = useUsersStore();

	const [page, setPage] = useState(1);

	const handleChange = (event: ChangeEvent<unknown>, value: number) => {
		setPage(value);
		getUsers(saveUserSearch, value);
	};

	return (
		<>
			{totalCount !== 0 && (
				<Pagination
					count={
						Math.ceil(totalCount / 30) > 34 ? 34 : Math.ceil(totalCount / 30)
					}
					page={page}
					onChange={handleChange}
				/>
			)}
		</>
	);
};
