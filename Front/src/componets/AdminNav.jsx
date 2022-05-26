import { Link } from "react-router-dom";

const AdminNav = () => {
  return (
    <>
      <nav className="flex gap-3">
        <Link to="/admin/perfil" className="font-bold uppercase text-gray-500">
          Perfil
        </Link>
        <Link
          to="/admin/cambiar-pasword"
          className="font-bold uppercase text-gray-500"
        >
          Cambiar Pasword
        </Link>
      </nav>
    </>
  );
};

export default AdminNav;
