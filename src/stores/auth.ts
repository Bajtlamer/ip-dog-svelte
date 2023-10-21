import { writable } from "svelte/store"
import { getUsernameAuthToken } from "../auth.service"

// const username = 'bajt@volny.cz'
// const pass = 'printadmin'

let token:any = null

export const store = writable({user:{token:null}});

let sessions = []

export const getUserDetails = async ( username:string, password:string ) => {

    return getUsernameAuthToken(username, password)
        // .then(res => {
        //     token = res.token
        //     console.log(res)
        //     return token
        // })
        // .catch(err => {throw Error(err)})

	// if ( username === user && password === pass )
	// 	return 1
}
