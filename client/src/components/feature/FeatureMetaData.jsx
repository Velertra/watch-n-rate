import { useState } from "react";
import FeatureCredits from "./FeatureCredits";

const FeatureMetaData = ({ feature }) => {
    const [currentTab, setCurrentTab] = useState('cast');

    const metaContent = () => {
        switch (currentTab) {
            case 'cast':
                return (
                    <ul id="f-cast">
                        <FeatureCredits feature={feature.cast} />
                    </ul>
                );
            case 'crew':
                return (
                    <ul id="f-crew">
                        <FeatureCredits feature={feature.crew} />
                    </ul>
                );
            case 'details':
                return <div>Details Content</div>;
            case 'genres':
                return <div>Genres Content</div>;
            case 'releases':
                return <div>Releases Content</div>;
            default:
                return null;
        }
    };

    return (
        <div id="feature-metadata">
                    <header>
                <div id="fm-header">
                    <ul id="fm-header-tabs">
                        <li onClick={() => setCurrentTab('cast')} className={currentTab === 'cast' ? 'active' : ''}>cast</li>
                        <li onClick={() => setCurrentTab('crew')} className={currentTab === 'crew' ? 'active' : ''}>crew</li>
                        <li onClick={() => setCurrentTab('details')} className={currentTab === 'details' ? 'active' : ''}>details</li>
                        <li onClick={() => setCurrentTab('genres')} className={currentTab === 'genres' ? 'active' : ''}>genres</li>
                        <li onClick={() => setCurrentTab('releases')} className={currentTab === 'releases' ? 'active' : ''}>releases</li>
                    </ul>
                </div>
            </header>
            <div id="fm-list">
                {metaContent()}
            </div>
            
                    {/* <ul id="f-cast">
                        <FeatureCredits
                            feature={feature.cast}
                        />
                    </ul>
                    <ul id="f-crew">
                        <FeatureCredits
                            feature={feature.crew}
                        />
                    </ul> */}
                    </div>
    );
}
 
export default FeatureMetaData;