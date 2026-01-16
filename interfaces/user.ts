export interface IUser {
	id: string;
	email: string;
	name: string;
	role: string;
	is_verified: boolean;
	created_at: Date;
	updated_at: Date;
}
