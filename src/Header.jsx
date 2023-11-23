import { useState } from 'react';
import { Link } from 'react-router-dom';

import { Clock } from './Clock';

export function Header() {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const menuIcon = () => {
    if (isNavOpen) {
      return (
        <svg className="w-8 h-8" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
          <path stroke="#ffffff" strokeLinecap="round" strokeWidth="2" strokeLinejoin="round" d="M 1,1 l 12,12 M 1,13 l 12,-12" />
        </svg>
      );
    }

    return (
      <svg className="w-8 h-8" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
        <path stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h12M1 7h12M1 13h12" />
      </svg>
    );
  }

  return (
    <nav className="">
      <div className="flex flex-wrap items-center justify-between mx-auto p-4">
        <Clock />

        <button
          type="button"
          onClick={() => setIsNavOpen((prev) => !prev)}
          className="inline-flex items-center justify-center p-2 text-sm text-gray-500 rounded-lg"
        >
          {menuIcon()}
        </button>
        <div className={`${isNavOpen ? '' : 'hidden'} w-full`} id="navbar-hamburger">
          <ul className="flex flex-col font-medium mt-4 rounded-lg">
            <li>
              <Link
                to="/stop/HSL:2112401"
                className="block py-2 px-3 text-white rounded hover:bg-gray-100 hover:text-black"
              >Sello (15)</Link>
            </li>
            <li>
              <Link
                to="/stop/HSL:2222406"
                className="block py-2 px-3 text-white rounded hover:bg-gray-100 hover:text-black"
              >Otaniemi (15)</Link>
            </li>
            <li>
              <Link
                to="/stop/HSL:2222603"
                className="block py-2 px-3 text-white rounded hover:bg-gray-100 hover:text-black"
              >Otaniemi (Metro)</Link>
            </li>
            <li>
              <Link
                to="/stop/HSL:2222603"
                className="block py-2 px-3 text-white rounded hover:bg-gray-100 hover:text-black"
              >Kamppi (Metro)</Link>
            </li>
            <li>
              <Link
                to="/station/HSL:2000202"
                className="block py-2 px-3 text-white rounded hover:bg-gray-100 hover:text-black"
              >Sello (Juna)</Link>
            </li>
            <li>
              <Link
                to="/stop/HSL:2112208"
                className="block py-2 px-3 text-white rounded hover:bg-gray-100 hover:text-black"
              >Koti (113)</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>



  );
}
