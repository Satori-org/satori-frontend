import { useState, useEffect } from 'react';

export function useFullScreenChange() {
    const [isFullscreen, setFullscreen] = useState(false);

    function handleResize() {
        let doc = document as any;
        let isFull = doc.fullscreenElement || doc.mozFullScreenElement || doc.webkitFullscreenElement;
        setFullscreen(isFull)
    }
    useEffect(() => {
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        }
    }, []);

    return isFullscreen;
}
