import './App.css';
import '../src/shared/data/datastore.js';
import { useState } from 'react';
import Intro from './intro/Intro.tsx';

import ConditionEditor from './conditionEditor/ConditionEditor.tsx';

function App() {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <>
      {showIntro && <Intro handleOnEnter={() => setShowIntro(false)} />}
      {!showIntro && <ConditionEditor />}
    </>
  );
}

export default App;
