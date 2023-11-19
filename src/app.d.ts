type AuthResponse = {
	auth: boolean
	message: string
}
declare global {
	namespace App {
		interface Error {message:string}
		interface AuthResponse {auth: boolean, message: string}
		interface Locals { user: User | null }
		interface PageData {}
		interface Platform {}
	}
}

declare namespace App {
	interface Locals {
	  user: {
		username: string,
		fullname: string,
		isAdmin: boolean,
	  }
	}
  }