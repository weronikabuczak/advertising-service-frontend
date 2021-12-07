import {Switch, Route, Redirect} from 'react-router-dom';

import Layout from './components/Layout/Layout';
import UserProfile from './components/Profile/UserProfile';
import AuthPage from './pages/AuthorizationPage';
import HomePage from './pages/HomePage';
import NewTaskPage from "./pages/NewTaskPage";
import {useContext} from "react";
import AuthContext from "./store/auth-context";
import TaskAdded from "./components/NewTask/TaskAdded";

function App() {
    const authContext = useContext(AuthContext);
    return (
        <Layout>
            <Switch>
                <Route path='/' exact>
                    {!authContext.isLoggedIn && <Redirect to='/auth'/>}
                    <HomePage/>
                </Route>
                {!authContext.isLoggedIn && (
                    <Route path='/auth'>
                        <AuthPage/>
                    </Route>
                )}
                <Route path='/profile'>
                    {authContext.isLoggedIn && <UserProfile/>}
                    {!authContext.isLoggedIn && <Redirect to='/auth'/>}
                </Route>
                <Route path='/newTask'>
                    {authContext.isLoggedIn && <NewTaskPage/>}
                    {!authContext.isLoggedIn && <Redirect to='/auth'/>}
                </Route>
                <Route path='/taskAdded'>
                    {authContext.isLoggedIn && <TaskAdded/>}
                    {!authContext.isLoggedIn && <Redirect to='/auth'/>}
                </Route>
                <Route path='*'>
                    <Redirect to='/'/>
                </Route>
            </Switch>
        </Layout>
    );
}

export default App;