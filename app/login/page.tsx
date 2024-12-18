"use client";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/authContext";
import { UserDataType } from "@/types/authTypes";
const Login = () => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [incorrectCredentialsErr, setIncorrectCredentialsErr] =
        useState<boolean>(false);

    const { login } = useAuth();
    const router = useRouter();
    function handleUsernameChange(e: React.ChangeEvent<HTMLInputElement>) {
        setUsername(e.target.value.trim());
        setIncorrectCredentialsErr(false);
    }

    function handlePasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
        setPassword(e.target.value.trim());
    }

    function handleLogin() {
        fetch(`/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: username,
                password: password,
            }),
        })
            .then((res) => {
                if (res.status === 201) {
                    return res.json();
                } else if (res.status === 401) {
                    setIncorrectCredentialsErr(true);
                    Promise.reject("401: Incorrect credentials");
                } else {
                    console.log("SERVER ERROR: 500");
                    Promise.reject("500: Server error");
                }
            })
            .then((data: UserDataType) => {
                login(data.token);
                router.push("/");
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return (
        <div className="flex flex-col h-screen">
            <div className="flex justify-center items-center flex-1">
                <Card className="w-[20rem]">
                    <CardHeader>
                        <CardTitle>Login</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="mb-[1rem]">
                            <Input
                                placeholder="Username"
                                id="username"
                                onChange={handleUsernameChange}
                            />
                        </div>
                        <Input
                            placeholder="Password"
                            type="password"
                            id="password"
                            onChange={handlePasswordChange}
                        />
                        {incorrectCredentialsErr ? (
                            <p className="text-red-600">
                                Username and password combination does not match
                                any entry on the database
                            </p>
                        ) : (
                            <></>
                        )}
                    </CardContent>
                    <CardFooter className="justify-center">
                        <Button
                            className="rounded-[2rem] px-[1.5rem]"
                            onClick={handleLogin}
                        >
                            Login
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
};

export default Login;
