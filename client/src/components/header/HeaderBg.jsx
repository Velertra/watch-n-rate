const HeaderBg = ({ featureImg }) => {
    return (
        <>
            <div id="header-img-container">
                <img id="header-img" src={"http://image.tmdb.org/t/p/original" + featureImg }></img>
                <div id="head-img-overlay"></div>
            </div>
            <div id="header-content-container"></div>
        </>
    );
}
 
export default HeaderBg;