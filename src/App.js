import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import './App.css';
import '../src/shared/data/datastore.js';
import { useState } from 'react';
import Intro from './intro/Intro.tsx';
import ConditionEditor from './conditionEditor/ConditionEditor.tsx';
function App() {
    const [showIntro, setShowIntro] = useState(true);
    return (_jsxs(_Fragment, { children: [showIntro && _jsx(Intro, { handleOnEnter: () => setShowIntro(false) }), !showIntro && _jsx(ConditionEditor, {})] }));
}
export default App;
