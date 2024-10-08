import { useEffect, useState } from "react";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import { Error } from "../components/Error";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import config from '../config';

const { backendUrl } = config;

export const Signup = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            navigate("/dashboard");
        }
    }, [navigate]);

    const signupRequest = async () => {
        setLoading(true);
        setError("");
        try {
            const response = await axios.post(`${backendUrl}/api/v1/user/signup`, {
                username,
                firstName,
                lastName,
                password,
            });
            const token = response.data.token;
            console.log(response.data)
            if(token){
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("name", firstName);
                localStorage.setItem("username", username);
                navigate("/dashboard");
            }else{
                setError("Email already exists / internal problem")
            }
        } catch (error) {
            setError("Email already exists / internal problem");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center bg-slate-400 h-screen">
            <div className="flex flex-col justify-center">
                <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                    <Heading label={"Sign Up"} />
                    <SubHeading label={"Enter your information to create an account"} />
                    <InputBox
                        onChange={(e) => {
                            setFirstName(e.target.value);
                            setError("");
                        }}
                        heading={"First Name"}
                        placeholder={"John"}
                    />
                    <InputBox
                        onChange={(e) => {
                            setLastName(e.target.value);
                            setError("");
                        }}
                        heading={"Last Name"}
                        placeholder={"Doe"}
                    />
                    <InputBox
                        onChange={(e) => {
                            setUsername(e.target.value);
                            setError("");
                        }}
                        heading={"Email"}
                        placeholder={"john@example.com"}
                    />
                    <InputBox
                        onChange={(e) => {
                            setPassword(e.target.value);
                            setError("");
                        }}
                        heading={"Password"}
                        placeholder={"At least 6 characters"}
                        inputType="password"
                    />
                    {error && <Error error={error} />}
                    <Button
                        onClick={signupRequest}
                        label={loading ? "Signing Up..." : "Sign Up"}
                    />
                    <BottomWarning label={"Already have an account? "} to={"/signin"} page={"Sign In"} />
                </div>
            </div>
        </div>
    );
};
