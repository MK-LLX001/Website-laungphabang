import React, { useRef, useState ,useEffect } from "react";
import { Link } from "react-router-dom";

const ProductNavigation = ({ routes, defaultActiveIndex = 0, children }) => {

    const activeTabLineRef = useRef();
    const [inpageNavIndex, setInpageNavIndex] = useState(defaultActiveIndex);
    const activeTabRef = useRef();

    const changePageState = (btn, i) => {
        let { offsetWidth, offsetLeft } = btn;
        activeTabLineRef.current.style.width = offsetWidth + "px";
        activeTabLineRef.current.style.left = offsetLeft + "px";
        setInpageNavIndex(i);
    }

    useEffect(() => {
        changePageState(activeTabRef.current, defaultActiveIndex);
    }, []);

    return (
        <>
            <div className="nvagation relative mb-8 border-b-2 bg-white border-grey flex flex-nowrap overflow-x-auto">
                {routes.map((route, i) => (
                    <Link
                        to="#"
                        ref={i === defaultActiveIndex ? activeTabRef : null}
                        key={i}
                        className={"p-4 px-5 capitalize " + (inpageNavIndex == i ? "text-black" : "text-dark-grey")}
                        onClick={(e) => { changePageState(e.target, i) }}
                    >
                        {route}
                    </Link>
                ))}
                <hr ref={activeTabLineRef} className="absolute bottom-0 duration-300 border-dark-grey" />
            </div>
            {Array.isArray(children) ? children[inpageNavIndex] : children}
        </>
    );
};

export default ProductNavigation;
