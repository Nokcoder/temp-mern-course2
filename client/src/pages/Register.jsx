import React from "react";
import { Form, redirect, useNavigation, Link } from "react-router-dom";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { Logo, FormRow, SubmitBtn } from "../components";
import customFetch from "../utils/customFetch.js";
import { toast } from "react-toastify";

export const action = async ({ request }) => {
  const formData = await request.formData();
  // console.log(formData);
  const data = Object.fromEntries(formData);
  // console.log(data);
  try {
    await customFetch.post("/auth/register", data);
    toast.success("Registration successful");
    return redirect("/login");
  } catch (error) {
    // console.log(error);
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const Register = () => {
  // const navigation = useNavigation();
  // console.log(navigation);
  // const isSubmitting = navigation.state === "submitting";
  return (
    <Wrapper>
      <Form method="post" className="form">
        <Logo />
        <h4>Register</h4>
        {/* <div className="form-row">
          <label htmlFor="name" className="form-label">
            name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="form-input"
            required
          />
        </div> */}
        <FormRow type="text" name="name" defaultValue={"John"} />
        <FormRow
          type="text"
          name="lastName"
          labelText="last name"
          defaultValue={"Smith"}
        />
        <FormRow type="text" name="location" defaultValue={"Earth"} />
        <FormRow type="email" name="email" defaultValue={"john@gmail.com"} />
        <FormRow type="password" name="password" defaultValue={"secret123"} />
        {/* <button type="submit" className="btn btn-block" disabled={isSubmitting}>
          {isSubmitting ? "submitting..." : "submit"}
        </button> */}
        <SubmitBtn />
        <p>
          Already a member?{" "}
          <Link to="/login" className="member-btn">
            Login
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};

export default Register;
