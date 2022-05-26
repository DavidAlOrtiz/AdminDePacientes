import AdminNav from "../componets/AdminNav"
const CambiarPassword = () => {
  return (
   <>
        <AdminNav></AdminNav>
        <h2 className="font-black text-center mt-10 text-3xl">Cambiar Password</h2>
        <p className="text-xl mt-5 mb-10 text-center">Modifica tu {""} 
            <span className="text-indigo-600 font-bold" >Password</span></p>
   </>
  )
}

export default CambiarPassword