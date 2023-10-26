import './App.css';

// import { useState } from 'react';
import { Console, Editor, Preview, Toolbox, XEditorProvider } from 'x-editor-react';

// import viteLogo from '/vite.svg';

// import reactLogo from './assets/react.svg';

const code = `
import { useEffect } from 'react';

export default () => {
    return <div className="bg-red-300">Test Code</div>
}
`.trim();

function App() {
    // const [count, setCount] = useState(0);

    return (
        <>
            {/* <div>
                <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
                    <img src={viteLogo} className="logo" alt="Vite logo" />
                </a>
                <a href="https://react.dev" target="_blank" rel="noreferrer">
                    <img src={reactLogo} className="logo react" alt="React logo" />
                </a>
            </div>
            <h1>Vite + React</h1>
            <div className="card">
                <button onClick={() => setCount(count => count + 1)}>count is {count}</button>
                <p>
                    Edit <code>src/App.tsx</code> and save to test HMR
                </p>
            </div>
            <p className="read-the-docs">Click on the Vite and React logos to learn more</p> */}
            <XEditorProvider code={code}>
                <div className="flex flex-col border-[1px] border-solid border-[#f0f0f0]">
                    <Toolbox />
                    <div className="flex">
                        <Preview className="flex-1" />
                        <Editor width={800} height={400} />
                    </div>
                    <Console />
                </div>
            </XEditorProvider>
        </>
    );
}

export default App;
