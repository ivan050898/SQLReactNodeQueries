import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route ,Redirect} from 'react-router-dom';
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize';
import './App.css';
import Navbar from './Navbar';
import ClientesPage from './ClientesPage';
import ProveedoresPage from './ProveedoresPage';
import VentasPage from './VentasPage';
import Proveedor from './Proveedor';
import Cliente from './Cliente';
import Producto from './Producto';
import Factura from './Factura';
import VentasProveedor from './VentasProveedor'
import VentasCliente from './VentasCliente'
import TopProductos from './TopProductos'
import TopClientes from './TopClientes'
import TopProveedores from './TopProveedores'
import InventarioPage from './InventarioPage';
import Home from './Home'
function App() {
  //inicializa el js de materialize
  useEffect(() => {
    M.AutoInit();
  });
  return (
    <Router>
      <div className='App'>
        <Navbar></Navbar>
        <div className='container'>
          <Switch>
            <Route exact path='/Clientes' component={ClientesPage}></Route>
            <Route
              exact
              path='/Proveedores'
              component={ProveedoresPage}
            ></Route>
            <Route exact path="/"><Redirect to="/home" /></Route>
            <Route exact path='/Inventario' component={InventarioPage}></Route>
            <Route exact path='/Ventas' component={VentasPage}></Route>

            <Route exact path='/about'></Route>
            <Route exact path='/Cliente/' component={Cliente}></Route>
            <Route exact path='/Proveedor/' component={Proveedor}></Route>
            <Route exact path='/Producto/' component={Producto}></Route>
            <Route exact path='/Factura/' component={Factura}></Route>
            <Route exact path='/VentasProveedor/' component={VentasProveedor}></Route>
            <Route exact path='/VentasCliente/' component={VentasCliente}></Route>
            <Route exact path='/TopProductos/' component={TopProductos}></Route>
            <Route exact path='/TopClientes/' component={TopClientes}></Route>
            <Route exact path='/TopProveedores/' component={TopProveedores}></Route>


          </Switch>
        </div>
        <Switch>
            <Route exact path='/Home/' component={Home}></Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
