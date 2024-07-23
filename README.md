Basic QR Scan react component uses html5-qrcode lib

```javascript

            import QrScan from './qr-scan/QrScan';

            ...
          
            <QrScan
                showFocusBox={true}
                focusBoxOutline={80}
                icon={true}
                size={350}
       
                onSuccess={(decodedString) => {
                 
                }}
                onError={({ message, name }) => {
              
                }}
            />
```
