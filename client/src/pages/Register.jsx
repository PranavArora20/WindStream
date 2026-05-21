import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "../Components/Button";
import Textbox from "../Components/Textbox";
import Loading from "../components/Loader";
import { useRegisterMutation } from "../redux/slices/api/authApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../redux/slices/authSlice";

const Register = () => {
  const { user } = useSelector((state) => state.auth);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [registerUser, { isLoading }] = useRegisterMutation();

  const submitHandler = async (data) => {
    try {
      const result = await registerUser({
        name: data.name,
        title: data.title,
        email: data.email,
        password: data.password,
        role: "Developer",
        isAdmin: false,
      }).unwrap();

      dispatch(setCredentials(result));
      toast.success("Account created successfully!");
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message || error.message);
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  return (
    <div className="w-full min-h-screen flex items-center justify-center flex-col lg:flex-row bg-[#f3f4f6]">
      <div className="w-full md:w-auto flex gap-0 md:gap-40 flex-col md:flex-row items-center justify-center">
        <div className="h-full w-full lg:w-2/3 flex flex-col items-center justify-center">
          <div className="w-full md:max-w-lg 2xl:max-w-3xl flex flex-col items-center justify-center gap-5 md:gap-y-10 2xl:-mt-20">
            <span className="flex gap-1 py-1 px-3 border rounded-full text-sm md:text-base bordergray-300 text-gray-600">
              Manage all your tasks in one place
            </span>
            <p className="flex flexx-col gap-0 md:gap-4 text-4xl md:text-6xl 2xl:text-7xl font-black text-center text-blue-700">
              <span>WindStream</span>
            </p>
            <span className="flex flex-col gap-0 md:gap-4 text-3xl md:text-4xl 2xl:text-5xl font-black text-center text-black-300">
              Task Manager
            </span>
          </div>
          <div className="cell">
            <div className="circle rotate-in-up-left"></div>
          </div>
        </div>

        <div className="w-full md:w-1/3 p-4 md:p-1 flex flex-col justify-center items-center">
          <form
            onSubmit={handleSubmit(submitHandler)}
            className="form-container w-full md:w-[400px] flex flex-col gap-y8 bg-white px-10 pt-14 pb-14"
          >
            <div>
              <p className="text-blue-600 text-3xl font-bold text-center">
                Create account
              </p>
              <p className="text-center text-base textgray-700">
                Join your team on WindStream.
              </p>
            </div>

            <div className="flex flex-col gap-y-5">
              <Textbox
                placeholder="John Doe"
                type="text"
                name="name"
                label="Full Name"
                className="w-full rounded-full"
                register={register("name", {
                  required: "Full name is required!",
                })}
                error={errors.name ? errors.name.message : ""}
              />
              <Textbox
                placeholder="e.g. Software Engineer"
                type="text"
                name="title"
                label="Job Title"
                className="w-full rounded-full"
                register={register("title", {
                  required: "Job title is required!",
                })}
                error={errors.title ? errors.title.message : ""}
              />
              <Textbox
                placeholder="email@example.com"
                type="email"
                name="email"
                label="Email Address"
                className="w-full rounded-full"
                register={register("email", {
                  required: "Email Address is required!",
                })}
                error={errors.email ? errors.email.message : ""}
              />
              <Textbox
                placeholder="Your password"
                type="password"
                name="password"
                label="Password"
                className="w-full rounded-full"
                register={register("password", {
                  required: "Password is required!",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                error={errors.password ? errors.password.message : ""}
              />
              <Textbox
                placeholder="Confirm password"
                type="password"
                name="confirmPassword"
                label="Confirm Password"
                className="w-full rounded-full"
                register={register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === watch("password") || "Passwords do not match",
                })}
                error={
                  errors.confirmPassword ? errors.confirmPassword.message : ""
                }
              />

              {isLoading ? (
                <Loading />
              ) : (
                <Button
                  type="submit"
                  label="Register"
                  className="w-full h-10 bg-blue-700 text-white rounded-full"
                />
              )}

              <p className="text-center text-sm text-gray-600">
                Already have an account?{" "}
                <Link
                  to="/log-in"
                  className="text-blue-600 font-semibold hover:underline"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
