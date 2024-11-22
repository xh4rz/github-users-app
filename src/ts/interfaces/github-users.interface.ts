export interface IGitHubUsers {
	items: IUser[];
	total_count: number;
}

export interface IUser {
	login: string;
	id: number;
	avatar_url: string;
}
