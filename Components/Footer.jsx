import React from "react";

const Footer = () => {
  const cury = new Date().getFullYear();
  return (
    <footer className="bg-slate-900 flex flex-col justify-center items-center px-4 h-20  text-white py-3">
      <p className="text-center text-slate-100">
        Copyright &copy; {cury} Get me a Coffee - All right reserved
      </p>
      <p className="text-slate-400">Crafted with ❤️ by Huzaifa</p>
    </footer>
  );
};

export default Footer;
