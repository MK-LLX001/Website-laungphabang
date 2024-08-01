import React, { useRef, useState ,useEffect } from "react";
import { Link } from "react-router-dom";

const InpageNavigation = ({ routes , defaultHidden = [ ], defaultActiveIndex = 0 , children }) => {

  const [inpageNavIndex, setInpageNavIndex] = useState(defaultActiveIndex);
  const activeTabLineRef = useRef();
  const activeTabRef = useRef();

//   TODO: set effect button slider 
  const changePageState = (btn, i) => {
    // console.log(btn,i);
    let { offsetWidth, offsetLeft } = btn;
    activeTabLineRef.current.style.width = offsetWidth + "px";
    activeTabLineRef.current.style.left = offsetLeft + "px";

    setInpageNavIndex(i);
  }
//   TODO: function focust in index 0 defaultActiveIndex  
  useEffect(() => {
    changePageState(activeTabRef.current, defaultActiveIndex)
  }, [])

  return (
    <>
      <div className="nvagation relative border-b bg-white border-grey flex flex-nowrap overflow-x-auto">
        {routes.map((route, i) => {
          return (
            // TODO: set ในรุบแบบ css โดยกานกำนดค่าต่าง 
            <Link
              to=""
              ref={ i === defaultActiveIndex ? activeTabRef : null }
              key={i}
              className={
                "p-4 px-5 capitalize " +
                (inpageNavIndex === i ? " text-black" : " text-dark-grey") + (defaultHidden.includes(route) ? " md:hidden" : "")
              }
              onClick={(e) => { changePageState(e.target, i) }}
            >
              {route}
            </Link>
          );
        })}
        <hr ref={activeTabLineRef} className="absolute bottom-0 duration-300 " />
      </div>

        {Array.isArray(children) ? children[inpageNavIndex] : children}
    </>
  );
};
export default InpageNavigation;
