import React from "react";

type Props = {};

const Navbar = (props: Props) => {
  return (
    <>
      <nav className="w-full p-3 mb-3 text-white flex flex-row items-center justify-between">
        <img src={"/logo.png"} alt="LOGO" className="w-32 h-auto" />
      </nav>
    </>
  );
};

export default Navbar;
