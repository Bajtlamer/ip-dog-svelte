import OkIconGreen from "../templates/ok-icon-green.svelte";
import OkIconGrey from "../templates/ok-icon-grey.svelte";
import FailIconRed from "../templates/fail-icon-red.svelte";

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