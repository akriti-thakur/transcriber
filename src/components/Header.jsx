import React from "react";

export default function HeaDer() {
    return (
        <div className="flex flex-col p-4 max-w-[1400px] ">
            <section className=" flex flex-col">
                <header className="flex items-center justify-between gap-4 p-4">
                    <b><a href="/"><h1>FREE<span className="text-blue-400">scribble</span></h1></a></b>
                    <a href="/" className="flex items-center gap-2 specialbutton px-4 py-2 rounded-lg text-blue-400 ">
                        <p>New</p>
                        <span className="material-symbols-outlined">add</span>
                    </a>
                </header>
            </section>
            <footer></footer>
        </div>
    );
}
