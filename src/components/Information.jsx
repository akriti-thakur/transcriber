import React, { useState } from "react";
import Scribe from "./Transcription";
import Slation from "./Translation";

export default function InFormation(props) {
  const { output, finished } = props;
  const [tab, setTab] = useState('transcription');

  return (
    <>
      <main className='flex-1 p-4 flex flex-col gap-3 text-center sm:gap-4 justify-center pb-20 w-full max-w-prose mx-auto'>
        <h1 className='font-semibold text-4xl sm:text-5xl whitespace-nowrap'>
          Your <span className='text-blue-400 bold'>TRANSCRIPTION</span>
        </h1>
        <div className="flex mx-auto bg-white border-2 border-solid shadow-2xl ring overflow-hidden rounded-full items-center gap-2">
          <button
            className={"px-4 py-1  duration-200 italic font-medium" + (tab === 'transcription' ? ' bg-blue-300 text-white' : ' text-blue-400 hover:text-blue-600')}
            onClick={() => setTab('transcription')}
          >
            Transcription
          </button>
          <button
            className={"px-4 py-1 duration-200 italic font-medium" + (tab === 'translation' ? ' bg-blue-300 text-white' : ' text-blue-400 hover:text-blue-600')}
            onClick={() => setTab('translation')}
          >Translation</button>
        </div>

        {tab ==='transcription' ? (
         <Scribe></Scribe>
        ):(<Slation></Slation>)}
        
      </main>
    </>
  );
}
