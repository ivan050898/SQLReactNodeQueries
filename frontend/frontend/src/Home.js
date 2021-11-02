import React, { Component, Fragment } from 'react'
import M from 'materialize-css/dist/js/materialize.min.js';
import img from './homeimg.jpg';
import { faUserFriends,faFighterJet,faUserPlus } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook } from '@fortawesome/free-brands-svg-icons'

export default class Home extends Component {
    componentDidMount(){
        M.AutoInit();
    }
    render() {
        return (
            <Fragment>
                  <div id="index-banner" className="parallax-container" >
    <div className="parallax"><img src={img} alt="Unsplashed background img 1"/></div>
  </div>
  <div className="container">
    <div className="section">
      <div className="row">
        <div className="col s12 m4">
          <div className="icon-block">
            <h2 className="center black-text"><FontAwesomeIcon icon={faFighterJet} size="sm" /></h2>
            <h5 className="center">Velocidad</h5>

            <p className="light">Debido a las tecnologías utilizadas por el equipo de SQL Master nuestro Website nos permite servirte las consultas en un tiempo considerablemente bajo.</p>
          </div>
        </div>

        <div className="col s12 m4">
          <div className="icon-block">
            <h2 className="center black-text"><FontAwesomeIcon icon={faUserFriends} size="sm" /></h2>
            <h5 className="center">Amigable para el usuario</h5>

            <p className="light">Nuestro Website está construido con componentes amigables para ti, el usuario y con una paleta de colores moderna.</p>
          </div>
        </div>

        <div className="col s12 m4">
          <div className="icon-block">
            <h2 className="center black-text"><FontAwesomeIcon icon={faUserPlus}  /></h2>
            <h5 className="center">Siguenos en redes sociales</h5>
            <ul>
                <li className="center"><a  href="https://www.facebook.com/jimmy.montoyazarate"><FontAwesomeIcon icon={faFacebook} />  Gilberth Montoya</a></li>
                <br></br>
                <li className="center"><a href="https://www.facebook.com/profile.php?id=100002340352639"><FontAwesomeIcon icon={faFacebook} />  Iván Fernández</a></li>
            </ul>
          </div>
        </div>
      </div>

    </div>
  </div>
    </Fragment>
        )
    }
}
