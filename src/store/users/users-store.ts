import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { showToast, timeout } from '@/utils';
import { AxiosError } from 'axios';
import axiosClient from '@/axios/axiosClient';
import type { IGitHubUsers, IUser } from '@/ts/interfaces';

interface State {
	users: IUser[];
	cleanUsers: () => void;
	loadingUsers: boolean;
	getUsers: (user: string) => Promise<void>;
	saveUserSearch: string;
}

export const useUsersStore = create<State>()(
	devtools((set) => ({
		users: [],
		loadingUsers: false,
		saveUserSearch: '',
		getUsers: async (user: string) => {
			set({ loadingUsers: true });

			try {
				const {
					data: { items }
				} = await axiosClient.get<IGitHubUsers>('/search/users', {
					params: {
						q: user
					}
				});

				if (items.length !== 0) {
					const dataUsers = items.map(({ login, id, avatar_url }) => ({
						login,
						id,
						avatar_url
					}));
					set({ users: dataUsers, saveUserSearch: user });
					await timeout(2000);
					showToast('Se ha encontrado información.', 'success');
				} else {
					set({ users: [] });
					showToast('No se ha encontrado información.', 'error');
				}
			} catch (error) {
				const err = error as AxiosError<Error>;

				if (!err.response?.data) {
					showToast(err.message, 'error');
				} else {
					showToast(err.response.data.message, 'error');
				}
			} finally {
				set({ loadingUsers: false });
			}
		},
		cleanUsers: () => {
			set({ users: [] });
		}
	}))
);
