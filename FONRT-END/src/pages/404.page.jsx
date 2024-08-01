import React from "react";
import pageNotFound from "../imgs/Logo/404.png";
import logo from "../imgs/Logo/lpb.png";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <section className=" h-cover relative p-10 flex flex-col items-center gap-10 text-center">
      <img
        src={pageNotFound}
        className="select-none border-2 border-grey w-72 aspect-square object-cover rounded"
      />
      <h1 className="text-4xl font-gelasio leading-7">Page not found </h1>
      <p className="text-dark-grey text-xl leading-7 -mt-8 ">
        the page you are looking for dose not exissts. head back to the
        <Link to="/" className="text-black underline">
          home page
        </Link>{" "}
      </p>

      <div className="mt-auto">
        <img src={logo} className="h-20 object-contain block mx-auto select-none" />
        <p className="mt-5 text-dark-grey">ຂໍອະໄພຫາໜ້າເພສບໍ່ເຈີກະຮຸນາລອງໃຫ່ມ</p>
      </div>
    </section>
  );
};

export default PageNotFound;
