import {Switch, Route} from 'react-router-dom';

import Layout from './components/Layout/Layout';
import UserProfile from './components/Profile/UserProfile';
import AuthPage from './pages/AuthorizationPage';
import HomePage from './pages/HomePage';
import NewTaskPage from "./pages/NewTaskPage";

function App() {
    return (
        <Layout>
            <Switch>
                <Route path='/' exact>
                    <HomePage/>
                </Route>
                <Route path='/auth'>
                    <AuthPage/>
                </Route>
                <Route path='/profile'>
                    <UserProfile/>
                </Route>
                <Route path='/new-task'>
                    <NewTaskPage/>
                </Route>
            </Switch>
        </Layout>
    );
}

export default App;