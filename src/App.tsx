import { IonApp, IonRouterOutlet, IonSplitPane, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';
import Menu from './components/Menu';
import Page from './pages/Page';
import Login from './pages/login/Login';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';
import Home from './pages/home/Home';
import './index.css'
import BotaoSair from './components/BotaoSair';
import FuncionariosList from './pages/funcionarios/list/funcionarios-list';
import UsuariosList from './pages/usuarios/list/usuarios-list';
import FiliaisList from './pages/filiais/list/filiais-list';
import FuncionariosForm from './pages/funcionarios/form/funcionarios-form';

setupIonicReact();

const App: React.FC = () => {
  return (
    <IonApp>
      <IonReactRouter> 
          <IonSplitPane contentId="main">
            <Menu />

            <BotaoSair></BotaoSair>
            <IonRouterOutlet id="main">
              <Route path="/" exact={true}>
                <Redirect to={localStorage.getItem('email') ? '/home' : '/login'} />
              </Route>
              <Route path="/folder/:name" exact={true}>
                <Page />
              </Route>
              <Route path="/funcionarios/list">
                <FuncionariosList></FuncionariosList>
              </Route>
              <Route path="/funcionarios/form">
                <FuncionariosForm></FuncionariosForm>
              </Route>
              <Route path="/funcionarios/form-edit/:id">
                <FuncionariosForm></FuncionariosForm>
              </Route>
              <Route path="/usuarios/list">
                <UsuariosList></UsuariosList>
              </Route>
              <Route path="/filiais/list">
                <FiliaisList></FiliaisList>
              </Route>
              <Route path="/home" exact={true}>
                <Home />
              </Route>
              <Route path="/login" exact={true}>
                <Login />
              </Route>
            </IonRouterOutlet>
          </IonSplitPane> 
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
