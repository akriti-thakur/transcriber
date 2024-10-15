// import React, { useState, useRef, useEffect } from "react";

// export default function Main({ setAudioStream, setFile }) {
//     console.log('Main component props:', { setAudioStream, setFile });

//     const [recordingStatus, setRecordingStatus] = useState('inactive');
//     const [audioChunks, setAudioChunks] = useState([]);
//     const [duration, setDuration] = useState(0);

//     const mediaRecorder = useRef(null);
//     const mimeType = 'audio/webm';

//     async function startRecording() {
//         let tempStream;
//         console.log('Start recording');

//         try {
//             const streamData = await navigator.mediaDevices.getUserMedia({
//                 audio: true,
//                 video: false
//             });
//             tempStream = streamData;
//         } catch (err) {
//             console.log(err.message);
//             return;
//         }

//         setRecordingStatus('recording');

//         const media = new MediaRecorder(tempStream, { mimeType });
//         mediaRecorder.current = media;

//         mediaRecorder.current.start();
//         setAudioChunks([]);

//         mediaRecorder.current.ondataavailable = (event) => {
//             if (event.data.size > 0) {
//                 setAudioChunks(prevChunks => [...prevChunks, event.data]);
//             }
//         };
//     }

//     function stopRecording() {
//         if (mediaRecorder.current) {
//             setRecordingStatus('inactive');
//             console.log('Stop recording');

//             mediaRecorder.current.stop();
//             mediaRecorder.current.onstop = () => {
//                 const audioBlob = new Blob(audioChunks, { type: mimeType });
//                 setAudioStream(audioBlob);
//                 setAudioChunks([]);
//                 setDuration(0);
//             };
//         }
//     }

//     useEffect(() => {
//         if (recordingStatus === 'inactive') return;

//         const interval = setInterval(() => {
//             setDuration(curr => curr + 1);
//         }, 1000);

//         return () => clearInterval(interval);
//     }, [recordingStatus]);

//     useEffect(() => {
//         const textContainer = document.getElementsByClassName("text-container")[0];
//         const text = document.querySelectorAll(".text");
//         let currentElement = text.length - 1;

//         const interval = setInterval(() => {
//             text.forEach((element, index) => {
//                 const el = element;
//                 if (index === currentElement) {
//                     el.style.opacity = "1";
//                     el.style.transform = "scale(1)";
//                 } else {
//                     el.style.opacity = "0.3";
//                     el.style.transform = "scale(0.8)";
//                 }
//             });
//             currentElement = (currentElement + 1) % text.length;
//         }, 900);

//         return () => clearInterval(interval);
//     }, []);

//     return (
//         <main className='flex-1 p-4 flex flex-col gap-3 text-center sm:gap-4 justify-center pb-20'>
//             <div id="container" className="container">
//                 <span>
//                     FREE<span className="text-blue-400">scribble&rarr;</span>
//                 </span>
//                 <div className="text-container">
//                     <span className="text">Record</span>
//                     <span className="text">Transcribe</span>
//                     <span className="text">Translate</span>
//                 </div>

//                 <button
//                     onClick={recordingStatus === 'recording' ? stopRecording : startRecording}
//                     className='flex specialbutton px-4 py-2 rounded-xl items-center text-base justify-between gap-4 mx-auto w-72 max-w-full my-4'
//                 >
//                     <p className='text-blue-400'>
//                         {recordingStatus === 'inactive' ? 'Record' : 'Stop recording'}
//                     </p>
//                     <div className='flex items-center gap-2'>
//                         {duration !== 0 && (
//                             <p className='text-sm'>{duration}s</p>
//                         )}
//                         <i className={`fa-solid duration-200 fa-microphone ${recordingStatus === 'recording' ? ' text-rose-300' : ''}`}></i>
//                     </div>
//                 </button>
//                 <p className='text-base'>
//                     Or <label className='text-blue-400 cursor-pointer hover:text-blue-600 duration-200'>
//                         upload <input
//                             onChange={(e) => {
//                                 const tempFile = e.target.files ? e.target.files[0] : null;
//                                 setFile(tempFile);
//                             }}
//                             className='hidden'
//                             type='file'
//                             accept='.mp3,.wav'
//                         />
//                     </label> a mp3 or wav file
//                 </p>
//             </div>
//         </main>
//     );
// }         **************************TYPESCRIPT



// JAVASCRIPT*************************



import React, { useState, useEffect, useRef } from 'react'

export default function Main(props) {
    const { setAudioStream, setFile } = props

    const [recordingStatus, setRecordingStatus] = useState('inactive')
    const [audioChunks, setAudioChunks] = useState([])
    const [duration, setDuration] = useState(0)

    const mediaRecorder = useRef(null)

    const mimeType = 'audio/webm'

    async function startRecording() {
        let tempStream
        console.log('Start recording')

        try {
            const streamData = await navigator.mediaDevices.getUserMedia({
                audio: true,
                video: false
            })
            tempStream = streamData
        } catch (err) {
            console.log(err.message)
            return
        }
        setRecordingStatus('recording')

     
        const media = new MediaRecorder(tempStream, { type: mimeType })
        mediaRecorder.current = media

        mediaRecorder.current.start()
        let localAudioChunks = []
        mediaRecorder.current.ondataavailable = (event) => {
            if (typeof event.data === 'undefined') { return }
            if (event.data.size === 0) { return }
            localAudioChunks.push(event.data)
        }
        setAudioChunks(localAudioChunks)
    }

    async function stopRecording() {
        setRecordingStatus('inactive')
        console.log('Stop recording')

        mediaRecorder.current.stop()
        mediaRecorder.current.onstop = () => {
            const audioBlob = new Blob(audioChunks, { type: mimeType })
            setAudioStream(audioBlob)
            setAudioChunks([])
            setDuration(0)
        }
    }

    useEffect(() => {
        if (recordingStatus === 'inactive') { return }
        const interval = setInterval(() => {
            setDuration(curr => curr + 1)
        }, 1000)

        return () => clearInterval(interval)
    })



    useEffect(() => {
        // const textContainer = document.getElementsByClassName("text-container")[0];
        const text = document.querySelectorAll(".text");
        let currentElement = text.length -1 ;

        const interval = setInterval(() => {
            text.forEach((element, index) => {
                const el = element;
                if (index === currentElement) {
                    el.style.opacity = "1";
                    el.style.transform = "scale(1)";
                } else {
                    el.style.opacity = "0.3";
                    el.style.transform = "scale(0.8)";
                }
            });
            


            currentElement = (currentElement === 0) ? text.length - 1 : currentElement - 1;
        }, 1100);

        return () => clearInterval(interval);
    }, []);

return (

<main className='flex-1 p-4 flex flex-col gap-3 text-center sm:gap-4 justify-center pb-20 w-full max-w-prose mx-auto'>
                <div id="container" className="container">
                    <span>
                        FREE<span className="text-blue-400">scribble&rarr;</span>
                </span>
                <div className="text-container">
                        <span className="text">Record</span>
                    <span className="text">Transcribe</span>
                    <span className="text">Translate</span>
                </div>

                <button
                    onClick={recordingStatus === 'recording' ? stopRecording : startRecording}
                    className='flex specialbutton px-4 py-2 rounded-xl items-center text-base justify-between gap-4 mx-auto w-72 max-w-full my-4'
                >
                    <p className='text-blue-400'>
                        {recordingStatus === 'inactive' ? 'Record' : 'Stop recording'}
                    </p>
                    <div className='flex items-center gap-2'>
                        {duration !== 0 && (
                            <p className='text-sm'>{duration}s</p>
                        )}
                        <i className={`fa-solid duration-200 fa-microphone ${recordingStatus === 'recording' ? ' text-rose-300' : ''}`}></i>
                    </div>
                </button>
                <p className='text-base'>
                    Or <label className='text-blue-400 cursor-pointer hover:text-blue-600 duration-200'>
                        upload <input
                            onChange={(e) => {
                                const tempFile = e.target.files ? e.target.files[0] : null;
                                setFile(tempFile);
                            }}
                            className='hidden'
                            type='file'
                            accept='.mp3,.wav'
                        />
                    </label> a mp3 or wav file
                </p>
            </div>
        </main>



)
}