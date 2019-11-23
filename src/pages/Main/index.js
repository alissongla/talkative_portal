import React, { Component } from 'react';
import {Switch, Route} from 'react-router-dom';

import Toolbar from '../../components/Toolbar/Toolbar';
import SideDrawer from '../../components/SideDrawer/SideDrawer';
import Backdrop from '../../components/Backdrop/Backdrop';

//Imports de rotas
import Welcome from '../Welcome/Welcome';
import Aula from '../Classes/CadClasses';
import Texto from '../Text/CadText';
import Modulo from '../Module/CadModules';
import Exercise from '../Exercise/CadExercises';

//Reactstrap
import {
  Container
} from "reactstrap";

import './styles.css';

class Main extends Component {
  state = {
    sideDrawerOpen: false
  };
  drawerToggleClickHandler = () => {
    this.setState((prevState) => {
      return {sideDrawerOpen: !prevState.sideDrawerOpen};
    })
  }

  backdropClickHandler = () => {
    this.setState({sideDrawerOpen: false})
  }
  render() {
    let backdrop;

    if(this.state.sideDrawerOpen){
      backdrop = <Backdrop click={this.backdropClickHandler}/>;
    }
    return(
      <div className="App">
        <Toolbar drawerClickHandler={this.drawerToggleClickHandler}/>
        <SideDrawer show={this.state.sideDrawerOpen}/>
        {backdrop}
        <main className='main__page'>
          <Container>
            <Switch>
              
              <Route exact path='/app' component={Welcome}/>
              <Route path='/app/class' component={Aula}/>
              <Route path='/app/module' component={Modulo}/>
              <Route path='/app/text' component={Texto}/>
              <Route path='/app/exercise' component={Exercise}/>
            </Switch>
          </Container>
        </main>
      </div>
    )
  }
}

export default Main