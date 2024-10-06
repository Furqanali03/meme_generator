import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Memes {
  id: number;
  name: string;
  url: string;
}

export default async function Home() {
  const data = await fetch("https://api.imgflip.com/get_memes");
  const response = await data.json();
  console.log(response.data.memes);

  return (
    <>
      <h1 className="text-4xl font-bold underline text-center mt-8 mb-12">Meme Generator</h1>
      <div className="flex justify-center gap-8 flex-wrap px-6">
        {response && response.data.memes.map((item: Memes) => {
          return (
            <div key={item.id} className="w-72 bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105">
              <Image src={item.url} alt="Meme" width={288} height={288} className="rounded-t-lg" />
              <div className="p-4 flex justify-center">
                <Link href={{
                  pathname: "creatememe",
                  query: {
                    url: item.url,
                    id: item.id,
                  }
                }}>
                  <button className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition-colors">Generate Meme</button>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
