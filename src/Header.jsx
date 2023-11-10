import { useState } from "react";

export function Header({ handleMenuClick, getMenuItemClass }) {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const menuClick = (stopId, station = 'stop') => {
    handleMenuClick(stopId, station);
    setIsNavOpen(false);
  }

  return (
    <div className="flex items-center justify-between  py-8">
      <nav>
        <section className="flex">
          <div
            className="space-y-2 ml-4"
            onClick={() => setIsNavOpen((prev) => !prev)}
          >
            <span className="block h-0.5 w-8 animate-pulse bg-white"></span>
            <span className="block h-0.5 w-8 animate-pulse bg-white"></span>
            <span className="block h-0.5 w-8 animate-pulse bg-white"></span>
          </div>

          <div className={isNavOpen ? "showMenuNav" : "hideMenuNav"}>
            <div
              className="absolute top-0 right-0 px-8 py-8"
              onClick={() => setIsNavOpen(false)}
            >
              <svg
                className="h-8 w-8 text-gray-600"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap=""
                strokeLinejoin="roroundund"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </div>
            <ul className="flex flex-col items-center justify-between min-h-[250px]">
              <li className=" my-6  text-black text 2xl">
                <a href="#" onClick={() => menuClick('HSL:2112401')}
                  className={getMenuItemClass('HSL:2112401')}>sello(15)</a>
              </li>
              <li className=" my-6 text-black">
                <a href="#" onClick={() => menuClick('HSL:2000202', 'station')}
                  className={getMenuItemClass('HSL:2000202')}>sello(juna)</a>
              </li>
              <li className=" my-6  text-black">
                <a href="#" onClick={() => menuClick('HSL:2222406')}
                  className={getMenuItemClass('HSL:2222406')}>otaniemi(15)</a>
              </li>
              <li className=" my-6  text-black">
                <a href="#" onClick={() => menuClick('HSL:2112208')}
                  className={getMenuItemClass('HSL:2112208')}>koti(113)</a>
              </li>
            </ul>
          </div>
        </section>
      </nav>
      <style>{`
      .hideMenuNav {
        display: none;
      }
      .showMenuNav {
        display: block;
        position: absolute;
        width: 100%;
        height: 100vh;
        top: 0;
        left: 0;
        background: white;
        z-index: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
      }
    `}</style>
    </div>


  );
}
