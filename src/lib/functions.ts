import OkIconGreen from '../templates/icons/ok-icon-green.svelte';
import ServerIconGreen from '../templates/icons/server-icon-green.svelte';
import ServerIconRed from '../templates/icons/server-icon-red.svelte';
import OkIconGrey from '../templates/icons/ok-icon-grey.svelte';
import NetworkIcon from '../templates/icons/network-icon.svelte';
import DeviceIcon from '../templates/icons/device-icon.svelte';

import { fail } from '@sveltejs/kit';

export const isValidIpAddress = (ipaddress: string) => {
	if (
		/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(
			ipaddress
		)
	) {
		return true;
	}
	return false;
};

export const getStatusIcon = (status?: boolean) => {
	return status ? OkIconGreen : OkIconGrey;
};

export const getSubnetDeviceIcon = (subnet: string) => {
	// const isNet = status.match(/\//gi);
	return isValidIpAddress(subnet) ? DeviceIcon : NetworkIcon;
};

export const getDeviceTypeIcon = (subnet: string) => {
	return DeviceIcon;
};

export const getServerStatusIcon = (status: boolean) => {
	return status ? ServerIconGreen : ServerIconRed;
};

export const isValidURL = (url: string): boolean => {
	const urlPattern = /^(https?|http):\/\/[^\s/$.?#].[^\s]*$/i;
	return urlPattern.test(url);
};

export const constructUrl = (url: string, ssl: boolean = true) => {
	if (isValidURL(url)) {
		return url;
	} else {
		return ssl === true ? 'https://' + url : 'http://' + url;
	}
};

export const parseResponseToJson = async (response: Response) => {
	const message = await response.text();
	try {
		return await JSON.parse(message);
	} catch (err) {
		// console.log(err)
		return fail(response.status, { auth: false, message });
		//   throw new Error("Did not receive JSON, instead received: " + text)
	}
};
