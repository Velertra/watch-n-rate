import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ScrollToTop = ({ children }) => {
    const navigate = useNavigate()

    useEffect(() => {
        //const unlisten = navigate(() => {
            window.scrollTo(0, 0);
        //});
        /* return () => {
            unlisten();
        } */
    }, []);
    
    return null;
}
 
export default ScrollToTop;