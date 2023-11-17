export interface ScanResult {
    devices:string[],
    count:number,
    message?:string,
    // auth:boolean
}

export class ScanResult implements ScanResult  {
	public devices = ['']
	public count = 0
	// public message = ''
	// public auth = false


	constructor(result?: ScanResult) {
        if (result === null || result === undefined) {
            return;
        }
        Object.keys(result).forEach((key, index) => {
            let k = key as keyof ScanResult;
            this[k] = result[k as keyof object];
        });
    }
}
