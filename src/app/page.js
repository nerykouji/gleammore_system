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
              <h1 className="text-3xl font-semibold tracking-wide text-gray-800 ">Gleammore: Where Fashion Meets Artistry</h1>
              <p className="mt-4 text-gray-600 ">Gleammore is your ultimate destination for trendsetting fashion crafted from exquisite beaded accessories. We specialize in creating timeless pieces that blend vibrant artistry with contemporary style, offering everything from chic jewelry and statement handbags to elegant phone charms and customized wearables.</p>
              <div className="mt-6">
                <Link href="/shop" className="px-6 py-2.5 mt-6 text-sm font-medium leading-5 text-center text-white capitalize bg-yellow-600 rounded-lg hover:bg-yellow-500 lg:mx-0 lg:w-auto focus:outline-none">Shop now</Link>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center w-full h-96 lg:w-1/2">
            <img className="object-cover w-full h-full max-w-2xl rounded-md" src="https://scontent.fdvo2-1.fna.fbcdn.net/v/t39.30808-6/468464265_970495065104404_6006090984930513705_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=833d8c&_nc_ohc=KYeFR-8KT_4Q7kNvgGUDBfP&_nc_zt=23&_nc_ht=scontent.fdvo2-1.fna&_nc_gid=AxozLTXa_nvXvBKKFzRCWhg&oh=00_AYBHbAAeak9vQlRmSbPeqqfLWUT6ONlmVGGq-8URZYOWdA&oe=6755AB36" alt="background" />
          </div>
        </div>




      </main>

      <Footer />
    </div>
  );
}