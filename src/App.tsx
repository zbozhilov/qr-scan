import React from 'react';
import QrScan from './qr-scan/QrScan';
import './App.css';

function App() {
    return (
        <div className='App'>
            <QrScan
                showFocusBox={true}
                icon={true}
                size={350}
                focusBoxOutline={80}
                verbose={true}
                onSuccess={(decodedString) => {
                    console.log(decodedString);
                }}
                onError={({ message, name }) => {
                    console.log(name);
                }}
            />
        </div>
    );
}

export default App;
