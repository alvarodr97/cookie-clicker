import { FormHome } from "../components/FormHome"

export const Home = () => {
  // const [users, setUsers] = useState<User[]|[]>([]);
  
  // const handleGetUsers = async () => {
  //   const users = await getStoreData<User>(Stores.Users);
  //   setUsers(users);
  // };

  return (
    <div>
        <p>Introduce tu nombre</p>
        <FormHome />

        {/* TODO: Añadir aqui el ranking */}







        {/* <button onClick={handleGetUsers}>Get Users</button> */}

      {/* {
        users?.length > 0 && (
          <div>
            {
              users?.map((user) => (
                <p key={user.name}>{user.name}</p>
              ))
            }
          </div>
        )
      } */}




    </div>
    
  )
}
