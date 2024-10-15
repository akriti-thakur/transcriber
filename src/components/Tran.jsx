import React from "react";



export default function Transcribe (props){

    const { downloading } = props

return (
<>
   <div className="flex items-center flex-col justify-center gap-10 md:gap-14 py-24">
       <div className="flex flex-col gap-2 sm:gap-4">
          <h1 className='font-semibold text-4xl   '> <span className='text-blue-400  test-sm italic '>TRANSCRIBING</span></h1>
          <p className="flex justify-center mb-8">{!downloading ? 'warming up':'loading'}</p>
       </div>
        <div className="flex flex-col gap-2 sm:gap-4 max-w-[500px] max-auto w-full">
            {[0,1,2].map(val=>{
                return(
                    // eslint-disable-next-line no-useless-concat
                    <div key={val} className={'rounded-full h-2 sm:h-3 bg-slate-400 loading ' + `loading${val}`}></div>
                )
            })}

        </div>
   
   </div>











</>
)





}