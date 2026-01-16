export interface IQuiz {
	id: string;
	name: string;
	description: string;
	created_at: Date;
	updated_at: Date;
	is_active: boolean;
	slug: string;
}
