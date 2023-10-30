import './App.css';

import { useState } from 'react';
import XEditor from 'x-editor-react';

import main from './example/main?raw';

function App() {
    const [code, setCode] = useState(main);

    return (
        <>
            <XEditor code={code} onChange={v => v && setCode(v)} width={1280} showPreview className="m-auto" />
        </>
    );
}

export default App;
