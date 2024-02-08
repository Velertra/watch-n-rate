function SpaceReplace( title ){
    //console.log(title.length)

    const newTest = Array.from(title).map(letter => letter == " " ? letter = "%20" : letter).join("");
    return newTest
}
 
export default SpaceReplace;