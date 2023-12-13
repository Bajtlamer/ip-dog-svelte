import OkIconGreen from '../templates/icons/ok-icon-green.svelte';
import ServerIconGreen from '../templates/icons/server-icon-green.svelte';
import ServerIconRed from '../templates/icons/server-icon-red.svelte';
import OkIconGrey from '../templates/icons/ok-icon-grey.svelte';
import NetworkIcon from '../templates/icons/network-icon.svelte';
import DeviceIcon from '../templates/icons/device-icon.svelte';

import { fail } from '@sveltejs/kit';
import PcIcon from '../templates/icons/pc-icon.svelte';

export const isValidIpAddress = (ip: string) => {
	const pattern = new RegExp(
		'^((([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|' +
			'25[0-5])\\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|' +
			'2[0-4][0-9]|25[0-5]))$'
	);

	return pattern.test(ip);
};

export const isValidNetworkSubnet = (subnet: string) => {
	const pattern = new RegExp(
		'^((([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|' +
			'25[0-5])\\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|' +
			'2[0-4][0-9]|25[0-5]))\\/([0-9]|[1-2][0-9]|3[0-2])$'
	);

	return pattern.test(subnet);
};

export const getStatusIcon = (status?: boolean | null) => {
	return status ? OkIconGreen : OkIconGrey;
};

export const getSubnetDeviceIcon = (subnet: string) => {
	// const isNet = status.match(/\//gi);
	return isValidIpAddress(subnet) ? DeviceIcon : NetworkIcon;
};

export const getDeviceTypeIcon = (subnet?: string) => {
	if (typeof(subnet) !== "string") return DeviceIcon
	return isValidIpAddress(subnet) ? DeviceIcon : PcIcon;
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
