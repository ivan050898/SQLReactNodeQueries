import React from 'react';
import { Link } from 'react-router-dom';
const Navbar = () => {
  return (
    <React.Fragment>
      <ul id='dropdown1' className='dropdown-content' style={{ hover: 'true' }}>
        <li>
          <Link to='/clientes'>Clientes</Link>
        </li>
        <li className='divider'></li>
        <li>
          <Link to='/Proveedores'>Proveedores</Link>
        </li>
        <li className='divider'></li>
        <li>
          <Link to='/Inventario'>Inventario</Link>
        </li>
        <li className='divider'></li>
        <li>
        <Link to='/Ventas'>Ventas</Link>
        </li>
      </ul>
      <ul id='dropdown2' className='dropdown-content' style={{ hover: 'true' }}>
        <li>
          <a href='/VentasProveedor'>Montos de los proveedores</a>
        </li>
        <li className='divider'></li>
        <li>
          <a href='/VentasCliente'>Montos de los Clientes</a>
        </li>
        <li className='divider'></li>
        <li>
          <a href='/TopProductos'>Top 10 Productos</a>
        </li>
        <li className='divider'></li>
        <li>
          <a href='/TopClientes'>Top 10 Clientes</a>
        </li>
        <li className='divider'></li>
        <li>
          <a href='/TopProveedores'>Top 10 Proveedores</a>
        </li>
      </ul>
      <nav className='teal lighten-2'>
        <div className='nav-wrapper'>
          <a href='#!' className='brand-logo center'>
            SQL Master
          </a>
          <ul className='left hide-on-med-and-down'>
            <li style={{ paddingRight: '30px' }}>
              <Link to='/Home'>
                <i className='material-icons right'>home</i>
              </Link>
            </li>
            <li style={{ paddingRight: '30px' }}>
              <a
                className='dropdown-trigger btn'
                href='#!'
                data-target='dropdown1'
                style={{ hover: 'true' }}
              >
                Módulos<i className='material-icons right'>arrow_drop_down</i>
              </a>
            </li>
            <li style={{ paddingRight: '30px' }}>
              <a
                className='dropdown-trigger btn'
                href='#!'
                data-target='dropdown2'
                style={{ hover: 'true' }}
              >
                Estadísticas
                <i className='material-icons right'>arrow_drop_down</i>
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </React.Fragment>
  );
};
export default Navbar;
