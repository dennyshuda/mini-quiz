export interface IQuiz {
	id: string;
	name: string;
	description: string;
	created_at: Date;
	updated_at: Date;
	is_active: boolean;
	slug: string;
}

interface Question {
	options: string[];
	question_number: number;
	questiton_text: string;
}

export interface ActiveQuizResponse {
	session_id: string;
	subtest_name: string;
	expires_at: Date;
	questions: Question[];
}
