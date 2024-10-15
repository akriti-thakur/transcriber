import React, { useState,useEffect,useRef } from "react";
import HeaDer from "./components/Header.jsx"; 
import Main from "./components/Main.jsx";
import FileDisplay from "./components/fileDisplay.jsx";
import InFormation from "./components/Information.jsx";
import Transcribe from "./components/Tran.jsx";


export default function App() {
    const[file,setFile]= useState(null)
    const[audio,setAudioStream]= useState(null)
    const [output, setOutput] = useState(false)
    const [downloading, setDownloading] = useState(false)
    const [loading, setLoading] = useState(false)
    const [finished, setFinished] = useState(false)
    const worker = useRef(null)

    const isAudioAvailable = file || audio;


    function handelreset(){
          setFile(null)
          setAudioStream(null)

    } 



// Define the onMessageReceive function outside of useEffect
const onMessageReceive = async (e) => {
  // eslint-disable-next-line default-case
  switch (e.data.type) {
    case 'DOWNLOADING':
      setDownloading(true);
      console.log("downloading");
      break;
    case 'LOADING':
      setLoading(true);
      console.log("loading");
      break;
    case 'RESULT':
      setOutput(true);
      console.log("result");
      break;
    case 'WORK_DONE':
      setFinished(true);
      console.log('work_done');
      break;
  }
}

useEffect(() => {
  if (!worker.current) {
    worker.current = new Worker(new URL('./utils/whi.worker.js', import.meta.url), {
      type: 'module'
    })
  }

  worker.current.addEventListener('message', onMessageReceive);
  return () => {
    worker.current.removeEventListener('message', onMessageReceive);
  };
}, [])

    




async function readAudio(file) {
    const sampleRate = 16000;
    const audioContext = new AudioContext({ sampleRate });
    const arrayBuffer = await file.arrayBuffer();
    const audioData = await audioContext.decodeAudioData(arrayBuffer);
    return audioData.getChannelData(0);
}

async function handleForm() {
    if (!file && !audio) return;

    const audio = await readAudio(file || audio);
    const modelName = 'openai/whisper-tiny.en';

    worker.current.postMessage({
        type: 'INFERENCE_REQUEST',
        audio,
        modelName
    });
}









    // useEffect(()=>{
    //     console.log(audio)
    // },[audio])

    return (
        <>
        <div className=" flex flex-col ">
            <section className="min-h-screen flex flex-col">
            <HeaDer/>

            {
            output?(<InFormation output={output} finished={finished}/>):
            loading?(<Transcribe></Transcribe>):
            isAudioAvailable ? (
                <FileDisplay   handelreset={handelreset} file={file}  audio={audio}/>
            ) : (
                <Main setFile={setFile} setAudioStream={setAudioStream} />
            )
            }



            </section>
            
        </div>
        </>
    );
}
