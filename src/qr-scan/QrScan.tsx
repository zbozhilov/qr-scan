import { Html5Qrcode, Html5QrcodeSupportedFormats } from 'html5-qrcode';
import { useEffect, useState, useRef } from 'react';
import { QrScanProps } from './QrScanProps';
import './QrScan.scss';

const QrScan = (props: QrScanProps) => {
    const [codeDetected, setCodeDetected] = useState<boolean>(false);
    const elementId = props.id || 'zb-qr-scanner';
    const scanContainer = useRef(null);
    const html5QrCodeRef = useRef<Html5Qrcode | null>(null);
    const size = props.size || 250;
    const verbose = props.verbose ?? false;

    useEffect(() => {
        if (!scanContainer.current || html5QrCodeRef.current) {
            return;
        }
        const html5QrCode = new Html5Qrcode(elementId, {
            verbose: verbose,
            formatsToSupport: [Html5QrcodeSupportedFormats.QR_CODE],
        });

        html5QrCodeRef.current = html5QrCode;

        html5QrCode
            .start(
                { facingMode: 'environment' },
                {
                    fps: 30,
                    qrbox: size,
                },
                (decodedText) => {
                    setCodeDetected(true);

                    if (typeof props.onSuccess === 'function') {
                        props.onSuccess(decodedText);
                    }
                },
                (errorMessage) => {
                    setCodeDetected(false);

                    if (errorMessage.includes('NotFoundException')) {
                        return;
                    }

                    if (typeof props.onError === 'function') {
                        props.onError({ message: errorMessage });
                    }
                }
            )
            .catch((errorMessage: string) => {
                const wasNotAllowedError =
                    errorMessage.includes('NotAllowedError');
                const errorName = wasNotAllowedError ? 'NotAllowedError' : '';

                if (typeof props.onError === 'function') {
                    props.onError({ message: errorMessage, name: errorName });
                }
            });

        return () => {
            if (html5QrCode) {
                html5QrCode.clear();
            }
        };
    }, [codeDetected, elementId, props, size, verbose]);

    const classNameArray = ['zb-qr-scan-wrapper'];

    if (codeDetected) {
        classNameArray.push('zb-qr-code-detected');
    }

    return (
        <div
            className={classNameArray.join(' ')}
            style={{
                width: size,
                height: size,
            }}
        >
            <div
                className='zb-qr-scan'
                ref={scanContainer}
                id={elementId}
            ></div>

            {false !== props.showFocusBox && (
                <div
                    className='zb-qr-scan-focus-box'
                    style={{
                        borderWidth: props.focusBoxOutline || 60,
                    }}
                ></div>
            )}

            {false !== props.icon && <i className='fa-solid fa-qrcode'></i>}
        </div>
    );
};

export default QrScan;
