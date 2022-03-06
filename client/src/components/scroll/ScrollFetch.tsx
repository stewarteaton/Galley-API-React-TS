import React, { useEffect, useCallback, useRef } from 'react'

interface Props {
    setPage: React.Dispatch<React.SetStateAction<number>>;
}

const Loader: React.FC<Props>  = ( {setPage }:Props ) => {
    const loader = useRef<HTMLDivElement>(null);


    // When scrolled to bottom Set page # to next, triggering fetch for endless scroll
    const handleObserver = useCallback((entries) => {
        const target = entries[0];
        if (target.isIntersecting) {
        setPage((prev) => prev + 1); 
        }
    }, []);
    // 
    useEffect(() => {
        const option = {
        root: null,
        rootMargin: "20px",
        threshold: 0
        };
        const observer = new IntersectionObserver(handleObserver, option);
        if (loader.current) observer.observe(loader.current);
    }, [handleObserver]);
    return (
        <>
            {/* Div To identify when user has scrolled to bottom to trigger fetch */}
            <div ref={loader} />
        </>
    )
}

export default Loader;
