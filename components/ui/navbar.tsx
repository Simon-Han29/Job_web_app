"use client";
import {
    NavigationMenu,
    NavigationMenuList,
    NavigationMenuItem,
} from "./navigation-menu";
import { Button } from "./button";
import Link from "next/link";
import { useAuth } from "@/context/authContext";
const Navbar = () => {
    const { isLoggedIn, isLoadingState, logout } = useAuth();

    if (isLoadingState) {
        return <>Loading...</>;
    }
    return (
        <div>
            <NavigationMenu className="justify-between border min-w-full">
                <NavigationMenuList>
                    <NavigationMenuItem>
                        <Link href="/">Home</Link>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <Link href="/my_applications">My Applications</Link>
                    </NavigationMenuItem>
                </NavigationMenuList>
                <NavigationMenuList>
                    {isLoggedIn ? (
                        <div>
                            <NavigationMenuItem>
                                <Button onClick={logout}>Logout</Button>
                            </NavigationMenuItem>
                        </div>
                    ) : (
                        <div>
                            <NavigationMenuItem>
                                <Link href="/login">Login</Link>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <Link href="/signup">Signup</Link>
                            </NavigationMenuItem>
                        </div>
                    )}
                </NavigationMenuList>
            </NavigationMenu>
        </div>
    );
};

export default Navbar;
