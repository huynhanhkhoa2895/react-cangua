import { useEffect,useRef } from 'react';

function usePrevious(value : any) {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    });
    return (ref.current == null) ? {chess : {}} : ref.current;
}
export default usePrevious;
