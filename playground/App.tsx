import './App.css';

import { Editor, Preview, XEditorProvider } from 'x-editor-react';

import main from './example/main?raw';
import s from './style.module.scss';

function App() {
    return (
        <XEditorProvider initialCode={main}>
            <div className="relative top-[15vh] flex h-[400px] w-full">
                <Preview className={s.preview} width={600} borderless styleless showRunning={false} showLoading={false} />
                <Editor
                    className={s.editor}
                    width={800}
                    onMount={editor => {
                        editor.revealLine(42);
                    }}
                />
            </div>
        </XEditorProvider>
    );
}

export default App;
