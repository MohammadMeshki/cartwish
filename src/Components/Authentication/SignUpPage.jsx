import "./SignUpPage.css";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import signUp, { getUser } from "../../services/userServices";
import { Navigate } from "react-router-dom";

const shcema = z
  .object({
    name: z
      .string()
      .min(3, { message: "Name should be at least 3 characters" }),
    email: z.string().email({ message: "Please enter a valid email" }).min(3),
    password: z
      .string()
      .min(6, { message: "Passwrod should be at least 6 characters" }),
    confirmPassword: z.string(),
    address: z
      .string()
      .min(15, { message: "Address must be at least 15 characters" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Confim Password dose not match the password",
    path: ["confirmPassword"],
  });

const SignUpPage = () => {
  const [formError, setFormError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(shcema) });

  const submition = async (formData) => {
    try {
      await signUp(formData, profileImg);

      window.location = "/";
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setFormError(error.response);
      }
    }
  };

  const [profileImg, setProfileImg] = useState(null);

  if (getUser()) {
    return <Navigate to="/" />;
  }

  return (
    <section className="align-center container">
      <form
        className="align-center signup-form"
        onSubmit={handleSubmit(submition)}
      >
        <h2 className="signup-heading">SignUp Form</h2>
        <div className="align-center form-img">
          <img
            src={profileImg ? URL.createObjectURL(profileImg) : ""}
            alt="user image"
            className="user-img"
          />
          <label htmlFor="file-ip-1" className="img-label">
            Upload File
          </label>
          <input
            type="file"
            onChange={(e) => setProfileImg(e.target.files)}
            id="file-ip-1"
            className="img-input"
          />
        </div>
        <div className="user-info">
          <div className="user-name-signup">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              className="form-input"
              placeholder="Enter your name"
              {...register("name")}
            />
            {errors.name && (
              <em className="form-error">{errors.name.message}</em>
            )}
          </div>
          <div className="user-email-signup">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              className="form-input"
              placeholder="Enter your email address"
              {...register("email")}
            />
            {errors.email && (
              <em className="form-error">{errors.email.message}</em>
            )}
          </div>
          <div className="user-password-signup">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              className="form-input"
              placeholder="Enter your password"
              {...register("password")}
            />
            {errors.password && (
              <em className="form-error">{errors.password.message}</em>
            )}
          </div>
          <div className="user-confirm-password">
            <label htmlFor="confirm-password">Comfirm Password</label>
            <input
              type="password"
              id="confirm-password"
              className="form-input"
              placeholder="Enter Confirm Passwrod"
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && (
              <em className="form-error">{errors.confirmPassword.message}</em>
            )}
          </div>
          <div className="user-address">
            <label htmlFor="address">Delivery Address</label>
            <textarea
              id="address"
              className="form-input"
              placeholder="Enter delivery address"
              {...register("address")}
            />
            {errors.address && (
              <em className="form-error">{errors.address.message}</em>
            )}
          </div>
        </div>

        {formError && <em className="form-error">{formError}</em>}

        <button type="submit" className="submit-btn">
          Sumbit
        </button>
      </form>
    </section>
  );
};

export default SignUpPage;
