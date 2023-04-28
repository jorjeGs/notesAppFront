import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; //importando BrowserRouter (contenedor) para poder utilizar URL, y Rpute para las rutas
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

//importando componentes
import Navigation from './components/Navigation';
import NotesList from './components/NotesList';
import CreateNote from './components/CreateNote';
import Createuser from './components/Createuser';
import Edituser from './components/EditUser';

function App() {
  return (
    <BrowserRouter> {/* A comparacion del video, las routes se manejan de manera diferente, primero con browserRouter, Routes como contenedor y ya despues las rutas */}
      <Navigation /> {/* los componentes que no pertenecen a rutas deben de estar fuera de Routes */}
      <div className="container p-4"> {/* añade margen a los elementos */}
        <Routes>
          <Route path="/" exact Component={NotesList} />
          <Route path="/edit/:id" Component={CreateNote} />
          <Route path="/create" Component={CreateNote} />
          <Route path="/user" Component={Createuser} /> {/**agregado de id para la edicion de usuario */}
          <Route path="/edituser/:id" Component={Edituser} /> {/**agregado de id para la edicion de usuario AAAAAAAAAAAAAAAAAAAAA */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
