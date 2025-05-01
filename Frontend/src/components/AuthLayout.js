import { Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <div className="auth-page">
      <Outlet />
    </div>
  );
};

export default AuthLayout;
