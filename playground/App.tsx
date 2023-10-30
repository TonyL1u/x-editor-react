import './App.css';

import { useState } from 'react';
import XEditor from 'x-editor-react';

const initialCode = `
import { useEffect } from 'react';

export default () => {
    return <div className="bg-red-300">Test Code</div>
}
`.trim();

function App() {
    const [code, setCode] = useState(initialCode);

    return <XEditor code={code} onChange={v => v && setCode(v)} showPreview />;
}

export default App;
