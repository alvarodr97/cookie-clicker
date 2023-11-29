import { FormHome } from "../components/FormHome"
import { useDB } from "../hooks/useDB";

export const Home = () => {

  const { status, isLoading, ranking } = useDB();


  // const [users, setUsers] = useState<User[]|[]>([]);
  
  // const handleGetUsers = async () => {
  //   const users = await getStoreData<User>(Stores.Users);
  //   setUsers(users);
  // };

  // useEffect(() => {
  //   handleGetUsers();
  // }, [])
  if (isLoading) return <div>Cargando...</div>

  if (!isLoading && !status) return <div>El servidor no responde</div>

  const getRankingIndex = (index: number) => {
    const color = ["bg-[#D6AF36]", "bg-[#D7D7D7]", "bg-[#A77044]"]
    return color[index];
  }

  return (
    <div className="flex flex-col md:flex-row gap-y-10 gap-x-0 md:gap-x-10 md:gap-y-0">
      <div className="p-6">
      <FormHome />

      </div>
      <div className="p-6 border border-yellow-600 rounded-md">
        <h2 className="pb-1 font-semibold text-center">Ranking</h2>
        <div>
          {
            !ranking
              ? <p>No hay usuarios registrados</p>
              : (
                <table className="border-separate border-spacing-x-4" style={{borderCollapse:"collapse"}}>
                  <thead>
                    <tr>
                      <td className="underline pr-5">Usuario</td>
                      <td className="underline">Nivel</td>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Mostrar solo los 10 primeros de la clasificación */}
                  {
                    ranking.sort((a, b) => b.nivel - a.nivel ).slice(0,10).map((x, index) => (
                      <tr key={x.name} className={`${index < 3 ? getRankingIndex(index) : 'bg-transparent'}`}>
                        <td className="px-2">{x.name}</td>
                        <td>{x.nivel}</td>
                      </tr>
                    ))
                  }
                  </tbody>
                </table>
              )
          }
        </div>
      </div>

    </div>
    
  )
}
