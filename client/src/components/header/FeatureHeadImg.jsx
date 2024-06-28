const HeaderBg = ({ featureImg }) => {
    return (
        <>
            <div id="feature-img-container">
                <div id="feature-img">
                    {featureImg && <img id="header-img" src={"http://image.tmdb.org/t/p/original" + featureImg }></img>}
                </div>
                <div id="head-img-overlay"></div>
            </div>
            <div id="header-content-container"></div>
        </>
    );
}
 
export default HeaderBg;