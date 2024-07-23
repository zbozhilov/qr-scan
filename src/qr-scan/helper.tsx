import { Html5Qrcode } from 'html5-qrcode';

export const getCameraId = async (): Promise<string> => {
    const cameras = await Html5Qrcode.getCameras();

    if (!cameras || cameras.length === 0) {
        return '';
    }

    return cameras[1].id;
};

export const throwError = ({
    message,
    name
}: {
    message: string;
    name?: string;
}) => {

    const error = new Error(message);

    if (name) {
        error.name = name;
    }
    throw error;

}