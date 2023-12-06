import { MODAL_TYPE_CONFIRM, MODAL_TYPE_INFO, MODAL_TYPE_WARNING } from "../constants"
import type { TButton } from "./types"

export interface IModalInterface {
    title: string,
    message: string,
    buttons: TButton[],
    type?: string
}

export class ModalDialog implements IModalInterface  {
	title = ''
    message = ''
    buttons = []
    type = MODAL_TYPE_INFO

	constructor(modal?: IModalInterface) {
        Object.assign(this, modal);
    }

    createModalInfoDialog(title: string, message: string): ModalDialog {
        return new ModalDialog({
            title: title,
            message: message,
            buttons: [],
            type: MODAL_TYPE_INFO
        })
    }

    createModalWarningDialog(title: string, message: string): ModalDialog {
        return new ModalDialog({
            title: title,
            message: message,
            buttons: [],
            type: MODAL_TYPE_WARNING
        })
    }

    createModalConfirmationDialog(title: string, message: string, buttons:TButton[]): ModalDialog {
        return new ModalDialog({
            title: title,
            message: message,
            buttons: buttons,
            type: MODAL_TYPE_CONFIRM
        })
    }
}
