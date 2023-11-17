import OkIconGreen from "../templates/ok-icon-green.svelte";
import OkIconGrey from "../templates/ok-icon-grey.svelte";
import FailIconRed from "../templates/fail-icon-red.svelte";
import { fail } from "@sveltejs/kit";

export const getStatusIcon = (status:boolean) => {
    return (status) ? OkIconGreen : OkIconGrey;
}

export const getServerStatusIcon = (status:boolean) => {
    return (status) ? OkIconGreen : FailIconRed;
}

export const isValidURL = (url: string): boolean => { 
    const urlPattern = /^(https?|http):\/\/[^\s/$.?#].[^\s]*$/i; 
    return urlPattern.test(url); 
}

export const constructUrl = (url: string, ssl:boolean = true) => {
    if(isValidURL(url)) {
        return url;
    }else{
        return (ssl === true) ? "https://" + url : "http://" + url;
    }
}

export const parseResponseToJson = async (response:Response) => {
    const message = await response.text()
    try{
      return await JSON.parse(message)
    
    } catch(err) {
        // console.log(err)
        return fail(response.status,{auth: false, message});
        //   throw new Error("Did not receive JSON, instead received: " + text)
    }
  }