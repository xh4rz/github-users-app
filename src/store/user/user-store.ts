import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { showToast, timeout } from '@/utils';
import {
	IGitHubUser,
	IGitHubUserRepositories
} from '@/ts/interfaces/github-user.interface';
import axiosClient from '@/axios/axiosClient';

interface State {
	user: IGitHubUser;
	loadingUser: boolean;
	getUser: (user: string) => Promise<void>;
	cleanUser: () => void;
	repositories: IGitHubUserRepositories[];
}

const initialUser = {
	login: '',
	avatar_url: '',
	html_url: '',
	name: '',
	public_repos: 0,
	followers: 0,
	following: 0,
	created_at: new Date()
};

export const useUserStore = create<State>()(
	devtools((set) => ({
		user: initialUser,
		repositories: [],
		loadingUser: true,
		getUser: async (user: string) => {
			set({ loadingUser: true });

			await timeout(2000);

			try {
				const {
					data: {
						login,
						avatar_url,
						html_url,
						name,
						public_repos,
						followers,
						following,
						created_at
					}
				} = await axiosClient.get<IGitHubUser>(`/users/${user}`);

				const { data: dataRepos } = await axiosClient.get<
					IGitHubUserRepositories[]
				>(`/users/${user}/repos`);

				const dataUser = {
					login,
					avatar_url,
					html_url,
					name,
					public_repos,
					followers,
					following,
					created_at
				};

				const dataRepositories = dataRepos.map(
					({ id, full_name, html_url, forks, language, stargazers_count }) => ({
						id,
						full_name,
						html_url,
						forks,
						language,
						stargazers_count
					})
				);

				set({ user: dataUser });

				set({ repositories: dataRepositories });

				showToast(
					`Se ha encontrado información del usuario: ${user}`,
					'success'
				);
			} catch (error) {
				showToast(
					`No se ha encontrado información del usuario: ${user}`,
					'error'
				);
			} finally {
				set({ loadingUser: false });
			}
		},
		cleanUser: () => {
			set({
				user: initialUser,
				repositories: []
			});
		}
	}))
);
