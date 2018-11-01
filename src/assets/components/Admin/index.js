export { default as App } from './App';
// lazy loading components
export const Dashboard = () =>
  import(/* webpackChunkName: "admin.dashboard" */ './Dashboard');
export const Users = () =>
  import(/* webpackChunkName: "admin.users" */ './Users');
