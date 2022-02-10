import { useState, useEffect } from 'react';

export default function useWidthChange() {
    const [width, setWidth] = useState(window.innerWidth);

    const handleResize = () => {
        setWidth(window.innerWidth);
    };
    useEffect(() => {
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        }
    }, []);

    return {width, isH5: width < 900};
}
