import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { timeout } from '@/utils';
import axios from 'axios';
import { IGitHubUser } from '@/ts/interfaces/github-user.interface';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

interface State {
	user: IGitHubUser;
	loadingUser: boolean;
	getUser: (user: string, router: AppRouterInstance) => Promise<void>;
	cleanUser: () => void;
}

const initialUser = {
	login: '',
	avatar_url: '',
	url: '',
	name: '',
	public_repos: 0,
	followers: 0,
	following: 0,
	created_at: new Date()
};

export const useUserStore = create<State>()(
	devtools((set) => ({
		user: initialUser,
		loadingUser: true,
		getUser: async (user: string, router: AppRouterInstance) => {
			set({ loadingUser: true });

			await timeout(2000);

			try {
				const { data } = await axios.get<IGitHubUser>(
					`https://api.github.com/users/${user}`
				);

				set({ user: data });
			} catch (error) {
			} finally {
				set({ loadingUser: false });
			}
		},
		cleanUser: () => {
			set({
				user: initialUser
			});
		}
	}))
);