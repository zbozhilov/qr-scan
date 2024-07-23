export interface QrScanProps {
    id?: string,
    facingMode?: 'user' | 'environment',
    icon?: boolean,
    size?: number,
    verbose?: boolean,
    showFocusBox?: boolean,
    focusBoxOutline?: number,
    onSuccess?: (decodedString: string) => void,
    onError?: ({
        message,
        name
    }: {
        message: string;
        name?: string;
    }) => void,
}