"use server";

import { API_URL } from "@/constants/api";
import { redirect } from "next/navigation";
import * as z from "zod";
const schema = z.object({
    name: z.string().min(1, "Name is required"),
    country: z.string().min(1, "Country is required"),
    email: z.string().email("Invalid email").min(1, "Email is required"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
});

// Define types for form data
type FormData = z.infer<typeof schema>;
export default async function signUpAction(
    formData: FormData
) {
    console.log(JSON.stringify(formData));
    redirect("/auth/sign-up/sign-up-success");
}