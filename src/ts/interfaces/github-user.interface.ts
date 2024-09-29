export interface IGitHubUser {
	login: string;
	avatar_url: string;
	html_url: string;
	name: string;
	public_repos: number;
	followers: number;
	following: number;
	created_at: Date;
}

export interface IGitHubUserRepositories {
	id: number;
	full_name: string;
	html_url: string;
	language: string;
	stargazers_count: number;
	forks: number;
}
