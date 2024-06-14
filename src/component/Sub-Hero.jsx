import React from "react";

function SubHero() {
  return (
    <>
      <div>
        <div className="w-10/12 mx-auto py-20">
          <div>
            <p className="text-lg">
              Discover our innovative template design project, where creativity
              meets simplicity. Our intuitive tool allows you to effortlessly
              create stunning, customizable banners tailored to your needs.
              Whether for personal or professional use, design with ease and
              download high-quality results in just a few clicks.
            </p>
          </div>
          <div className="w-[500px] mx-auto py-10">
            <img src="../../public/2_may_3.jpg" alt="" />
          </div>
          <div >
            <p className="text-lg" >
              Our cutting-edge banner design tool offers a user-friendly and
              versatile platform to create stunning, personalized banners. With
              a wide range of features, including customizable sizes, background
              options, text, and image uploads, you have complete control over
              your design. The intuitive interface allows you to effortlessly
              add and modify shapes, apply gradients, and even incorporate
              user-created shapes from your local system. Whether for personal
              projects or professional needs, our design tool empowers you to
              craft visually appealing banners with ease.
            </p>
            <ui className="text-left text-lg font-medium flex flex-col items-center py-5 ">
              <li className="text-left">Download your custom banners in high-quality PNG format</li>
              <li className="text-left">Elevate your visual content effortlessly</li>
              <li className="text-left">Try it now and unleash your creativity!</li>
            </ui>
          </div>
        </div>
      </div>
    </>
  );
}

export default SubHero;
