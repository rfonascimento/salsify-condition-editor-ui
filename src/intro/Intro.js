import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useCallback, useEffect, useRef, useState } from 'react';
import './Intro.css';
const Intro = ({ handleOnEnter }) => {
    const intervalRef = useRef(null);
    const counterRef = useRef(3);
    const [isEnterBtnDisabled, setIsEnterButtonDisabled] = useState(false);
    const [btnText, setBtnText] = useState("Let's go!");
    const handleDrumroll = useCallback(() => {
        setIsEnterButtonDisabled(true);
        counterRef.current = 3;
        intervalRef.current = window.setInterval(() => {
            if (counterRef.current > 0) {
                setBtnText(`Get ready in ... ${counterRef.current}`);
                counterRef.current -= 1;
            }
            else {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
                handleOnEnter();
            }
        }, 1000);
    }, [handleOnEnter]);
    useEffect(() => {
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, []);
    return (_jsx("div", { className: "m-0 p-0 overflow-hidden oklch-bg", children: _jsxs("div", { className: "relative h-screen w-full flex items-center justify-center text-white text-center px-6", children: [_jsx("svg", { className: "absolute top-0 left-0 w-full h-full", viewBox: "0 0 900 600", preserveAspectRatio: "none", children: _jsx("path", { fill: "#ffffff22", className: "morphing-path" }) }), _jsxs("div", { className: "z-10 max-w-xl", children: [_jsx("h1", { className: "text-6xl font-bold mb-6 drop-shadow-lg", children: "Salsify" }), _jsx("h2", { className: "text-4xl font-bold mb-6 drop-shadow-lg", children: "Condition Editor UI" }), _jsx("p", { className: "text-xl mb-8", children: "Coding Exercise by Ricardo Nascimento" }), _jsx("button", { onClick: handleDrumroll, className: "btn btn-primaryfont-semibold px-12 py-6 rounded-xl shadow-lg transition", disabled: isEnterBtnDisabled, children: btnText })] })] }) }));
};
export default Intro;
