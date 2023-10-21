import { writable } from "svelte/store"

const user = 'bajt@volny.cz'
const pass = 'printadmin'

export const store = writable(null);

let sessions = []

export const getUserDetails = async ( username:string, password:string ) => {
	if ( username === user && password === pass )
		return 1
}

// export const listItesms = writable([]);

// const fetchLists = async () => {
//      const url = 'https://api.trello.com/1/boards/602151ffe5a21a668a2594e7/lists?key=00450919759ab31defee14bbbf480305&token=a217aec0d024790902cfa97bed2882be38f059d1780cdf3d8f086199a7e03ba0';
//      const res = await fetch(url);
//      const data = await res.json();
//      const lists = data.map((data, index:number)=>{
//         return {
//             id: data.id,
//             name: data.name
//         }
//      })

//     listItesms.set(lists);
//  }

// fetchLists();