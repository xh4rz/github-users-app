'use client';

import { SubmitHandler, useForm } from 'react-hook-form';
import { useUsersStore } from '@/store/users/users-store';
import { Grid2, TextField } from '@mui/material';
import { CustomButton } from '../button/CustomButton';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import ClearIcon from '@mui/icons-material/Clear';
import { useEffect } from 'react';

type FormSearchValues = {
	user: string;
};

export const SearchUser = () => {
	const { getUsers, cleanUsers, saveUserSearch } = useUsersStore();

	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
		reset
	} = useForm<FormSearchValues>({
		mode: 'onChange'
	});

	const onSubmit: SubmitHandler<FormSearchValues> = async (data) => {
		getUsers(data.user);
	};

	const handleReset = () => {
		reset();
		cleanUsers();
	};

	useEffect(() => {
		if (saveUserSearch) {
			setValue('user', saveUserSearch);
		}
	}, [saveUserSearch]);

	return (
		<Grid2
			container
			spacing={2}
			justifyContent="center"
			component="form"
			onSubmit={handleSubmit(onSubmit)}
			noValidate
		>
			<Grid2 size={12} height={70}>
				<TextField
					required
					fullWidth
					autoFocus
					type="text"
					size="medium"
					variant="outlined"
					placeholder="Ingrese usuario de GitHub..."
					autoComplete="off"
					{...register('user', {
						required: 'Campo requerido'
					})}
					error={!!errors.user}
					helperText={errors.user?.message}
				/>
			</Grid2>

			<Grid2 size={{ xs: 12, md: 'auto' }}>
				<CustomButton title="Buscar" icon={PersonSearchIcon} type="submit" />
			</Grid2>

			<Grid2 size={{ xs: 12, md: 'auto' }}>
				<CustomButton
					title="Limpiar"
					icon={ClearIcon}
					type="reset"
					color="error"
					onHandleClick={handleReset}
				/>
			</Grid2>
		</Grid2>
	);
};
