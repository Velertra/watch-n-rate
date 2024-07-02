import FeatureCredits from "./FeatureCredits";

const FeatureMetaData = ({ feature }) => {
    console.log(feature)
    return (
        <div id="feature-metadata">
                    <header>
                        <div id="fm-header">
                            <ul>
                                <li>cast</li>
                                <li>crew</li>
                                <li>details</li>
                                <li>genres</li>
                                <li>releases</li>
                            </ul>
                        </div>
                    </header>
                    <div id="f-cast">
                        <FeatureCredits
                            feature={feature.cast}
                        />
                    </div>
                    <div id="f-crew">
                        <FeatureCredits
                            feature={feature.crew}
                        />
                    </div>
                    </div>
    );
}
 
export default FeatureMetaData;