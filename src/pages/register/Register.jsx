import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";

import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import Loader from "../../components/loader/Loader";


export function Register() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const registerBtn = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const userDetails = {
      firstName: firstname,
      lastName: lastname,
      email: email,
      password: Password,
      phoneNumber: Phone,
    };
    // console.log(userDetails);
    try {
      const response = await axios.post(
        "https://docman-ctvx.onrender.com/users",
        userDetails
      );

      if (response.status === 201) {
        navigate("/signin");
        alert("Account successfully created! ");
      } else {
        console.log("Register failed");
      }
    } catch (error) {
      // Handle any network or request errors.
      console.error("Registration error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center mt-10">
      {isLoading ? (
        <Loader />
      ) : (
        <Card color="transparent" shadow={false}>
          <Typography variant="h4" color="blue-gray">
            Sign Up
          </Typography>
          <Typography color="gray" className="mt-1 font-normal">
            Enter your details to register.
          </Typography>
          <form
            className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
            onSubmit={registerBtn}
          >
            <div className="mb-4 flex flex-col gap-6">
              <Input
                size="lg"
                label="First Name"
                onChange={(e) => setFirstname(e.target.value)}
              />
              <Input
                size="lg"
                label="Last Name"
                onChange={(e) => setLastname(e.target.value)}
              />
              <Input
                size="lg"
                label="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                size="lg"
                label="Phone Number"
                onChange={(e) => setPhone(e.target.value)}
              />
              <Input
                type="password"
                size="lg"
                label="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Checkbox
              label={
                <Typography
                  variant="small"
                  color="gray"
                  className="flex items-center font-normal"
                >
                  I agree the
                  <a
                    href="#"
                    className="font-medium transition-colors hover:text-gray-900"
                  >
                    &nbsp;Terms and Conditions
                  </a>
                </Typography>
              }
              containerProps={{ className: "-ml-2.5" }}
            />
            <Button className="mt-6" fullWidth type="submit">
              Register
            </Button>
            <Typography color="gray" className="mt-4 text-center font-normal">
              Already have an account?{" "}
              <Link to={"/signin"} className="font-medium text-gray-900">
                {" "}
                Sign In{" "}
              </Link>
            </Typography>
          </form>
        </Card>
      )}
    </div>
  );
}
