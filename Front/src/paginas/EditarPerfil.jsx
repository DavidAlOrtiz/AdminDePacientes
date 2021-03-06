import AdminNav from "../componets/AdminNav"

const EditarPerfil = () => {
  return (
    <>
        <AdminNav></AdminNav>
        <h2 className="font-black text-center mt-10 text-3xl">Edita tu perfil</h2>
        <p className="text-xl mt-5 mb-10 text-center">Modifica tu {""} 
            <span className="text-indigo-600 font-bold" >Informacion aqui</span></p>

        <div className="flex justify-center">
          <div className="w-full md:w-1/2 bg-white shadow rounded-lg p-5">
            <form>
              <div className="my-3">
                <label className="uppercase font-bold text-gray-600">Nombre</label>
                <input type="text" 
                  className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                  name="nombre"
                ></input>
              </div>
              <div className="my-3">
                <label className="uppercase font-bold text-gray-600">Sitio web</label>
                <input type="text" 
                  className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                  name="web"
                ></input>
              </div>
              <div className="my-3">
                <label className="uppercase font-bold text-gray-600">Telefono</label>
                <input type="text" 
                  className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                  name="telefono"
                ></input>
              </div>
              <div className="my-3">
                <label className="uppercase font-bold text-gray-600">email</label>
                <input type="text" 
                  className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                  name="email"
                ></input>
              </div>
              <input
                 type="submit"
                 value="Guardar Cambios"
                  className="bg-indigo-700 px-10 py-3 font-bold text-white rounded-lg uppercase w-full mt-5"
              >
              
              </input>
            </form>
          </div>
        </div>
        
    </>
  )
}

export default EditarPerfil