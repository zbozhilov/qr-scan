Basic QR Scan react component

```javascript

            import QrScan from './qr-scan/QrScan';

            ...
          
            <QrScan
                showFocusBox={true}
                icon={true}
                size={350}
                focusBoxOutline={80}
                verbose={true}
                onSuccess={(decodedString) => {
                 
                }}
                onError={({ message, name }) => {
              
                }}
            />
```
