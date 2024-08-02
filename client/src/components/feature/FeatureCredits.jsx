import { Link } from "react-router-dom";

const FeatureCredits = ({ feature }) => {
    
    return (
        <>
            {feature.map((castMember, index) => (
                <li key={index}>
                    <Link to={`/searchpeople/${castMember.id}`}>{castMember.name}</Link>
                </li>
            ))}
        </>
    );
}
 
export default FeatureCredits;