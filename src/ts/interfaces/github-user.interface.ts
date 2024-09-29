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
