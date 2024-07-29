"use server";

import { API_URL } from "@/constants/api";
import { redirect } from "next/navigation";
import * as z from "zod";
const schema = z.object({
    email: z.string().email("Invalid email").min(1, "Email is required"),
    password: z.string().min(1, "Password is required"),
});

// Define types for form data
type FormData = z.infer<typeof schema>;
export default async function signInAction(
    formData: FormData
) {
    //console.log(JSON.stringify(formData));
    console.log(formData.email);

    if (formData.email === "m@m.com" && formData.password === "123") {
        redirect("/auth/sign-in/sign-in-success");
    } else {
        return { errorMessage: "Email or Password is incorrect" };
    }
}