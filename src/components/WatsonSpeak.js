import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TextToSpeechV1 from 'ibm-watson/text-to-speech/v1.js';
import { IamAuthenticator } from 'ibm-watson/auth';

const getSpeech = (e, text) => {
    const fs = require('fs');
    const textToSpeech = new TextToSpeechV1({
        authenticator: new IamAuthenticator({ apikey: 'IE31jJFGeiJZ1-GXJXw0YkvNYOHHUuIRNTrk1UZBVNP-' }),
        url: 'https://stream.watsonplatform.net/text-to-speech/api/'
      });
    
      const params = {
        text: 'Hello from IBM Watson',
        voice: 'en-US_AllisonVoice', // Optional voice
        accept: 'audio/wav',
        disableSslVerification: true,
      };
      
      // Synthesize speech, correct the wav header, then save to disk
      // (wav header requires a file length, but this is unknown until after the header is already generated and sent)
      // note that `repairWavHeaderStream` will read the whole stream into memory in order to process it.
      // the method returns a Promise that resolves with the repaired buffer
      textToSpeech
        .synthesize(params)
        .then(response => {
          const audio = response.result;
          return textToSpeech.repairWavHeaderStream(audio);
        })
        .then(repairedFile => {
          fs.writeFileSync('audio.wav', repairedFile);
          console.log('audio.wav written with a corrected wav header');
        })
        .catch(err => {
          console.log(err);
        });
     
      
    
}


export default function WatsonSpeak( { text }) {
    return (
        <div style={{display: 'flex', justifyContent: 'spaceBetween'}}>
            <button style={{flexBasis: '3%'}} onClick={(e) => getSpeech(e, text)}>
                <FontAwesomeIcon icon="volume-up"></FontAwesomeIcon>
            </button>
            <p style={{textAlign: 'left', paddingLeft: '15px'}}>
                {text}
            </p>
        </div>
    )
}
