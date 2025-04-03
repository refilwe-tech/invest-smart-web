
import { LoginForm } from "../../forms";
import Logo from '../../../assets/logo.png';

export const LoginPage = () => {
  return (
    <section className="flex bg-blue-400 items-center h-full">
      <section className="w-full flex justify-center">
        <LoginForm />
      </section>
      <section className="hidden lg:w-1/2 md:flex bg-primary justify-center">
        <img
          src={Logo}
          alt="login"
          className="object-cover hidden lg:block"
        />
      </section>
    </section>
  );
};