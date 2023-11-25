export function clickOutside(element: HTMLElement, callbackFunction: Function) {
	const handleClick = (event: any) => {
		// console.log(event.target);
		if (element && !element.contains(event.target) && !event.defaultPrevented) {
			callbackFunction();
		}
	};

	document.addEventListener('click', handleClick, true);

	return {
		update(newCallbackFunction: Function) {
			callbackFunction = newCallbackFunction;
		},
		destroy() {
			document.removeEventListener('click', handleClick, true);
		}
	};
}
