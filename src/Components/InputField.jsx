import { useActionState, useState, useEffect } from "react";
import validate from "../validation/validation.js";
import Button from "./Button";

function submitForm(prevState, formData) {
  const username = formData.get("username");
  const email = formData.get("email");
  const password = formData.get("password");

  const errors = {
    username: validate("username", username),
    email: validate("email", email),
    password: validate("password", password),
  };

  if (errors.username || errors.email || errors.password) {
    return { errors, success: "" };
  }

  return { errors: {}, success: "Registration completed successfully!" };
}

function InputField() {
  const [state, formAction] = useActionState(submitForm, {
    errors: {},
    success: "",
  });

  const [fieldErrors, setFieldErrors] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleBlur = (e) => {
    const { name, value } = e.target;

    const error = validate(name, value);

    setFieldErrors((prev) => ({
      ...prev,
      [name]: error || "",
    }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6">Register</h1>

        <form action={formAction}>
          <div className="mb-4">
            <label className="block mb-2 font-medium">Username</label>
            <input
              type="text"
              name="username"
              placeholder="Enter your Username"
              required
              onBlur={handleBlur}
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
            {(fieldErrors.username || state.errors.username) && (
              <p className="text-red-500">
                {fieldErrors.username || state.errors.username}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label className="block mb-2 font-medium">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your Email"
              required
              onBlur={handleBlur}
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
            {(fieldErrors.email || state.errors.email) && (
              <p className="text-red-500">
                {fieldErrors.email || state.errors.email}
              </p>
            )}
          </div>

          <div className="mb-6">
            <label className="block mb-2 font-medium">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              required
              minLength={8}
              onBlur={handleBlur}
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
            {(fieldErrors.password || state.errors.password) && (
              <p className="text-red-500">
                {fieldErrors.password || state.errors.password}
              </p>
            )}
          </div>

          <Button />
          {state.success && (
            <p className="text-green-600 text-center mt-4 font-medium">
              {state.success}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

export default InputField;
