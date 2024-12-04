'use client'

import Footer from "@/components/client/footer";
import Header from "@/components/client/header";
import { useCurrentUser } from "@/db.supa.backend/utils";
import Link from "next/link";

export default function Home() {
  useCurrentUser();

  return (
    <div className="h-screen flex flex-col">
      <Header />

      <main aria-label="Container content" className="flex-grow">


        <div className="container flex flex-col px-6 py-4 mx-auto space-y-6 lg:h-[32rem] lg:py-16 lg:flex-row lg:items-center">
          <div className="flex flex-col items-center w-full lg:flex-row lg:w-1/2">
            <div className="flex justify-center order-2 mt-6 lg:mt-0 lg:space-y-3 lg:flex-col">
              <button className="w-3 h-3 mx-2 bg-blue-500 rounded-full lg:mx-0 focus:outline-none"></button>
              <button className="w-3 h-3 mx-2 bg-gray-300 rounded-full lg:mx-0 focus:outline-none hover:bg-blue-500"></button>
              <button className="w-3 h-3 mx-2 bg-gray-300 rounded-full lg:mx-0 focus:outline-none hover:bg-blue-500"></button>
              <button className="w-3 h-3 mx-2 bg-gray-300 rounded-full lg:mx-0 focus:outline-none hover:bg-blue-500"></button>
            </div>

            <div className="max-w-lg lg:mx-12 lg:order-2">
              <h1 className="text-3xl font-semibold tracking-wide text-gray-800 ">WQEQEQW</h1>
              <p className="mt-4 text-gray-600 ">Are you ready to elevate your computing experience without breaking the bank? Look no further! Our curated selection of the most affordable PC parts you`ve ever seen is here to help you build or upgrade your dream machine without stretching your budget.</p>
              <div className="mt-6">
                <Link href="/shop" className="px-6 py-2.5 mt-6 text-sm font-medium leading-5 text-center text-white capitalize bg-yellow-600 rounded-lg hover:bg-yellow-500 lg:mx-0 lg:w-auto focus:outline-none">Shop now</Link>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center w-full h-96 lg:w-1/2">
            <img className="object-cover w-full h-full max-w-2xl rounded-md" src="https://img.freepik.com/free-vector/colorful-workspace-with-isometric-perspective_23-2147679428.jpg?semt=ais_hybrid" alt="apple watch photo" />
          </div>
        </div>




      </main>

      <Footer />
    </div>
  );
}