const GetUser = () => {
    const { userName } = useParams();
    const [user, setUser] = useState();
    

    useEffect(() => {
      const token = JSON.parse(localStorage.getItem("user"));

        async function getUser(){
          const response = await fetch(`http://localhost:3000/getUserProfile/${userName}`, {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token.token}`
            },
          });

          if(!response){
            console.error(Error)
            return
          }

          let userInfo = await response.json();
          setUser(() => userInfo);
        }

        return async() => {
          getUser();
        } 

    }, [])
    
}
 
export default GetUser;