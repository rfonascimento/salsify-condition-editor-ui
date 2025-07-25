import { type FC, useCallback, useEffect, useRef, useState } from 'react';

import './Intro.css';

const Intro: FC<{
  handleOnEnter: () => void;
}> = ({ handleOnEnter }) => {
  const intervalRef = useRef<number | null>(null);
  const counterRef = useRef(3);
  const [isEnterBtnDisabled, setIsEnterButtonDisabled] =
    useState<boolean>(false);
  const [btnText, setBtnText] = useState<string>("Let's go!");

  const handleDrumroll = useCallback(() => {
    setIsEnterButtonDisabled(true);

    counterRef.current = 3;

    intervalRef.current = window.setInterval(() => {
      if (counterRef.current > 0) {
        setBtnText(`Get ready in ... ${counterRef.current}`);
        counterRef.current -= 1;
      } else {
        clearInterval(intervalRef.current!);
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

  return (
    <div className="m-0 p-0 overflow-hidden oklch-bg">
      <div className="relative h-screen w-full flex items-center justify-center text-white text-center px-6">
        <svg
          className="absolute top-0 left-0 w-full h-full"
          viewBox="0 0 900 600"
          preserveAspectRatio="none"
        >
          <path fill="#ffffff22" className="morphing-path"></path>
        </svg>

        <div className="z-10 max-w-xl">
          <h1 className="text-6xl font-bold mb-6 drop-shadow-lg">Salsify</h1>
          <h2 className="text-4xl font-bold mb-6 drop-shadow-lg">
            Condition Editor UI
          </h2>
          <p className="text-xl mb-8">Coding Exercise by Ricardo Nascimento</p>
          <button
            onClick={handleDrumroll}
            className="btn btn-primaryfont-semibold px-12 py-6 rounded-xl shadow-lg transition"
            disabled={isEnterBtnDisabled}
          >
            {btnText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Intro;
