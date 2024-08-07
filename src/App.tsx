import { Routes, Route } from "react-router-dom";
import Home from "./paginas/Home";
import VitrineRestaurantes from "./paginas/VitrineRestaurantes";
import AdministracaoRestaurantes from "./paginas/Admin/AdminRestaurantes/AdminRestaurantes";
import FormularioRestaurante from "./paginas/Admin/AdminRestaurantes/FormularioRestaurante";
import PaginaBaseAdmin from "./paginas/Admin/PaginaBaseAdmin";
import AdministracaoPratos from "./paginas/Admin/AdminPratos/AdminPratos";
import FormularioPratos from "./paginas/Admin/AdminPratos/FormularioPratos";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/restaurantes" element={<VitrineRestaurantes />} />

      <Route path="/admin" element={<PaginaBaseAdmin/>}>
        <Route
          path="/admin/restaurantes"
          element={<AdministracaoRestaurantes />}
        />
        <Route
          path="/admin/restaurantes/novo"
          element={<FormularioRestaurante />}
        />
        <Route
          path="/admin/restaurantes/:id"
          element={<FormularioRestaurante />}
        />
        <Route 
          path="/admin/pratos"
          element={<AdministracaoPratos />}
        />
        <Route
          path="/admin/pratos/novo"
          element={<FormularioPratos />}
        />
        <Route
          path="/admin/pratos/:id"
          element={<FormularioPratos />}
        />

      </Route>
    </Routes>
  );
}

export default App;
