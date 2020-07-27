import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faMagic, faVolumeUp } from '@fortawesome/free-solid-svg-icons';
import WatsonSpeak from './components/WatsonSpeak.js';
import './App.css';

/* this pulls in the font awesome icons you need
for use in any component globally in your app 
so you have to include them in the library in app so that
can travel down the dom tree
*/
library.add(faMagic, faVolumeUp);


function App() {
  let theText = 'It\'s strange indeed how memories can lie dormant in a man\'s mind for so many years. Yet those memories can be awakened and brought forth fresh and new, just by something you\'ve seen, or something you\'ve heard, or the sight of an old familiar face';
  return (
    <div className="App">
    <WatsonSpeak text={theText} />
    </div>
  );
}

export default App;
