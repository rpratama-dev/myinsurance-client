import { Provider } from 'react-redux';
import './styles/tailwind.output.css';
import store from './store/index';
import { GuardProvider, GuardedRoute } from 'react-router-guards';
import Navbar from './components/navbar';
import PageLogin from './pages/PageLogin';
import PageHome from './pages/PageHome';
// import PageNotFound from './pages/404';

const getIsLoggedIn = () => {
  const token = localStorage.getItem('access_token');
  return token ? true : false;
};

const requireLogin = (to, from, next) => {
  // console.log(to.match.path, 'to router guard');
  if (to.meta.auth) {
    if (to.match.path === '/login' && getIsLoggedIn()) {
      next.redirect('/');
    } else {
      if (getIsLoggedIn()) {
        next();
      }
      next.redirect('/login');
    }
  } else {
    next();
  }
};

function App() {
  return (
    <>
      <Provider store={store}>
        <GuardProvider guards={[requireLogin]}>
          <Navbar />
          {/* <GuardedRoute path="/" exact component={PageHome} meta={{ auth: true }} /> */}
          <GuardedRoute path="/login" exact component={PageLogin} meta={{ auth: true }} />
          <GuardedRoute path="/" exact component={PageHome} meta={{ auth: true }} />
          {/* <GuardedRoute path="*" component={PageNotFound} meta={{ auth: false }} /> */}
        </GuardProvider>
      </Provider>
    </>
  );
}

export default App;
