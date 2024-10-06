"use client";
import Image from 'next/image';
import React, { useState, useRef } from 'react';
import { toPng } from 'html-to-image';

interface Meme {
    id: string;
    url: string;
}

const CreateMeme = ({ searchParams }: { searchParams: Meme }) => {
    const [topText, setTopText] = useState("");
    const [bottomText, setBottomText] = useState("");
    const memeRef = useRef<HTMLDivElement>(null);

    const handleSaveMeme = async () => {
        if (memeRef.current === null) {
            return;
        }

        try {
            const dataUrl = await toPng(memeRef.current);
            const link = document.createElement('a');
            link.href = dataUrl;
            link.download = 'meme.png';
            link.click();
        } catch (err) {
            console.error('Failed to save meme', err);
        }
    };

    return (
        <>
            <div className="min-h-screen flex flex-col items-center mt-5 justify-center p-8 text-black">
                <h1 className="text-4xl font-bold text-white mb-8">Edit Your Meme</h1>

                <div className="relative w-full max-w-md" ref={memeRef}>
                    <Image src={searchParams.url} alt="Meme" width={400} height={400} className="rounded-lg" />
                    {/* Top Text */}
                    <div className="absolute top-4 left-18 right-16 text-center text-2xl font-bold drop-shadow-lg uppercase">
                        {topText}
                    </div>
                    {/* Bottom Text */}
                    <div className="absolute bottom-4 left-18 right-16 text-center text-2xl font-bold drop-shadow-lg uppercase">
                        {bottomText}
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-center items-center mt-8 gap-4">
                    {/* Top Text Input */}
                    <input
                        type="text"
                        placeholder="Top Text"
                        value={topText}
                        onChange={(e) => setTopText(e.target.value)}
                        className="border border-gray-300 rounded p-2 w-full max-w-xs"
                    />
                    {/* Bottom Text Input */}
                    <input
                        type="text"
                        placeholder="Bottom Text"
                        value={bottomText}
                        onChange={(e) => setBottomText(e.target.value)}
                        className="border border-gray-300 rounded p-2 w-full max-w-xs"
                    />
                </div>

                <button 
                    onClick={handleSaveMeme} 
                    className="mt-6 bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition-colors">
                    Save Meme
                </button>
            </div>
        </>
    );
}

export default CreateMeme;
