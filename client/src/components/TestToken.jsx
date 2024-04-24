const TestToken = () => {

    const handleSubmit = async () => {
      const token = JSON.parse(localStorage.getItem("user"));

    //try {
        const response = await fetch(`http://localhost:3000/favMovies/yello`, {
          method: 'POST',
          headers: {
          Authorization: `Bearer ${token.token}`
          },
          body: 'yello',

        });
  
        //const result = await response.json();
        
        //console.log(result);
      /* } catch (error) {
        //console.error('Error occurred:', error);
      } */
    }
    handleSubmit()

    return ( 
        <>
          <input></input>
        </>
     );
}
 
export default TestToken;