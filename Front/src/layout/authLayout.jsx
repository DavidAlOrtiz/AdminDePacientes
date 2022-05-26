import {Outlet} from 'react-router-dom'

function AuthL() {
  return (
    <>
      
        <main className="container md:mx-7 md:grid md:grid-cols-2 items-center mt-14 p-5">
          <Outlet/>
        </main>
    </>
  )

}


export default AuthL;

