import {Switch, Route, Redirect} from 'react-router-dom';

import Layout from './components/Layout/Layout';
import UserProfile from './components/Profile/UserProfile';
import AuthPage from './pages/AuthorizationPage';
import HomePage from './pages/HomePage';
import NewTaskPage from "./pages/NewTaskPage";
import TaskAdded from "./components/NewTask/TaskAdded";
import UserTasks from "./components/Profile/UserTasks/UserTasks";
import {useSelector} from "react-redux";
import {isUserLoggedIn} from "./store/auth";

function App() {
    const isLoggedIn = useSelector(isUserLoggedIn);
    console.log(isLoggedIn)
    return (
        <Layout>
            <Switch>
                <Route path='/' exact>
                    {!isLoggedIn && <Redirect to='/auth'/>}
                    <HomePage/>
                </Route>
                {!isLoggedIn && (
                    <Route path='/auth'>
                        <AuthPage/>
                    </Route>
                )}
                <Route path='/profile'>
                    {isLoggedIn && <UserProfile/>}
                    {!isLoggedIn && <Redirect to='/auth'/>}
                </Route>
                <Route path='/newTask'>
                    {isLoggedIn && <NewTaskPage/>}
                    {!isLoggedIn && <Redirect to='/auth'/>}
                </Route>
                <Route path='/taskAdded'>
                    {isLoggedIn && <TaskAdded/>}
                    {!isLoggedIn && <Redirect to='/auth'/>}
                </Route>
                <Route path='/userTasks'>
                    {isLoggedIn && <UserTasks/>}
                    {!isLoggedIn && <Redirect to='/auth'/>}
                </Route>
                <Route path='*'>
                    <Redirect to='/'/>
                </Route>
            </Switch>
        </Layout>
    );
}

export default App;