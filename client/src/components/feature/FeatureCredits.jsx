const FeatureCredits = ({ feature }) => {
    
    return (
        <>
            {feature.map((castMember, index) => (
                <li key={index}>
                    {castMember.name}
                </li>
            ))}
        </>
    );
}
 
export default FeatureCredits;