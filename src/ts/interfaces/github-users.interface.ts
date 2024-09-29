export interface IGitHubUsers {
	items: IUser[];
}

export interface IUser {
	login: string;
	id: number;
	avatar_url: string;
}
