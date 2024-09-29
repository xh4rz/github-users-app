import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { showToast } from '@/utils';
import axios, { AxiosError } from 'axios';
import type { IGitHubUser, IUser } from '@/ts/interfaces';

interface State {
	users: IUser[];
	cleanUsers: () => void;
	loadingUsers: boolean;
	getUsers: (user: string) => Promise<void>;
}

export const userStore = create<State>()(
	devtools((set) => ({
		users: [],
		loadingUsers: false,
		getUsers: async (user: string) => {
			set({ loadingUsers: true });

			try {
				const {
					data: { items }
				} = await axios.get<IGitHubUser>(
					'https://api.github.com/search/users',
					{
						params: {
							q: user
						}
					}
				);

				if (items.length !== 0) {
					set({ users: items });
					showToast(`Se ha encontrado información.`, 'success');
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
