export { default as App } from './App';
/* prettier-ignore */
export const Dashboard = () => import(/* webpackChunkName: "dashboard" */ './Dashboard');
export const Users = () => import(/* webpackChunkName: "users" */ './Users');
