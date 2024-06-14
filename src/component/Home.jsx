import React from "react";
import 'boxicons';

function Home() {
  return (
    <>
      <div>
        <div className="w-11/12 mx-auto pt-36 flex justify-between items-center ">
          <div className="w-1/2 flex flex-col justify-center px-24 ">
              <h5 className="text-4xl font-semibold ">Make Beautiful and stuning</h5>
              <span className="text-4xl font-bold  bg-yellow-300">Banner</span>
              <h5 className="text-4xl font-semibold ">That you want</h5>
              <p className="text-sm font-semibold pt-6">Our website help you to create beautiful and attractive</p>
              <p className="text-sm font-semibold  "> banner which will make your orgnization visible</p>
          </div>
          <div className="flex w-1/2 justify-center items-center">
            <video
              className="w-[400px] "
              autoPlay
              muted
              playsInline
              loop
              disableRemotePlayback
              title="Get the word out with amazing social media graphics, videos, flyers and email campaigns."
              poster="https://d1csarkz8obe9u.cloudfront.net/assets/landing-page-homepage-hero.jpg"
            >
              <source
                type="video/mp4"
                src="https://www.postermywall.com/assets/images/landing-page/homepage-hero.mp4"
              />
              <p>Your browser doesn't support HTML5 video.</p>
            </video>
          </div>
          
        </div>
        <div className="w-10/12 mx-auto flex justify-between pt-16">
             <span className="flex flex-col px-5 justify-center items-center text-lg font-semibold "><box-icon name='download'></box-icon> Easy Download</span>
             <span className="flex flex-col px-5  justify-center items-center text-lg font-semibold "><box-icon type='solid' name='image'></box-icon>Add as many image you want</span>
             <span className="flex flex-col px-5  justify-center items-center text-lg font-semibold  "><box-icon type='solid' name='palette'></box-icon>Make Sure to make it colorful</span>
             <span className="flex flex-col px-5 justify-center items-center text-lg font-semibold "><box-icon type='solid' name='edit'></box-icon>Custmize as you want</span>
          </div>
      </div>
    </>
  );
}

export default Home;
