type User = {
	id: number
	email: string
	role: string
}
declare global {
	namespace App {
		interface Error {}
		interface Locals { user: User | null }
		interface PageData {}
		interface Platform {}
	}
}

export {};
