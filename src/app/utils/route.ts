import { Application } from 'express';
import userRoutes from '../modules/user/user.route'

const routes = [
  {
    path: "/api/users",
    handler: userRoutes,
  },
];

const setRoutes = (app: Application) => {
  routes.forEach((route) => {
    app.use(route.path, route.handler);
  });
};

export default setRoutes