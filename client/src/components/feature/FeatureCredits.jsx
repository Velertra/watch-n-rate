const FeatureCredits = ({ feature }) => {
    
    return (
        <>
            <div>{feature.map((castMember, index) => (
                <div key={index}>
                    {castMember.name}
                </div>
            ))}</div>
        </>
    );
}
 
export default FeatureCredits;