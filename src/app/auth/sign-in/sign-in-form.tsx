"use client";

import signInAction from "@/app/auth/sign-in/sign-in.action";
import {
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  Link,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import NextLink from "next/link";
import { useFormState } from "react-dom";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect, useState } from "react";
import { useGlobalStore } from "@/providers/global-store.provider";

export default function SignInForm() {
  const globalStore = useGlobalStore((state) => ({
    email_AppManagement: state.email_AppManagement,
    setEmail_AppManagement: state.setEmail_AppManagement,
  }));

  const schema = z.object({
    email: z.string().email("Invalid email").min(1, "Email is required"),
    password: z.string().min(1, "Password is required"),
  });

  const defaultValues = {
    email: "",
    password: "",
  };

  // Define types for form data
  type FormData = z.infer<typeof schema>;
  // Destructure useForm from react-hook-form
  const {
    // register: function to register input elements
    register,
    // handleSubmit: function to handle form submission
    handleSubmit,
    // watch: function to watch values of form inputs
    watch,
    // formState: object containing information about form state
    formState: { errors, touchedFields }, // Destructure errors and touchedFields from formState
  } = useForm<FormData>({
    // Call useForm hook with generic type FormData
    // resolver: specify resolver for form validation using Zod
    resolver: zodResolver(schema), // Pass Zod schema to resolver
    // defaultValues: specify default values for form inputs
    //defaultValues,
  });
  const [result, setResult] = useState({ errorMessage: "" });
  const onSubmit: any = useCallback(async (data: FormData) => {
    setResult(await signInAction(data));
  }, []);

  // Callback version of watch.  It's your responsibility to unsubscribe when done.
  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      //   console.log(value, name, type);
      if (name === "email") {
        console.log(name);
        globalStore.setEmail_AppManagement(String(value.email));
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-xs">
        <Stack spacing={2} className="w-full max-w-xs">
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            defaultValue={String(globalStore.email_AppManagement)}
            InputLabelProps={{
              shrink: !!String(globalStore.email_AppManagement),
            }}
            {...register("email")}
            //error={!!errors.email}
            error={!!errors.email && touchedFields.email}
            helperText={errors.email?.message}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            defaultValue={defaultValues.password}
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
          />

          <Button type="submit" variant="contained" color="primary">
            Sign In
          </Button>
          <Link
            component={NextLink}
            href="/auth/sign-up"
            className="self-center"
          >
            Create new account
          </Link>
          {<p className="text-red">{result?.errorMessage}</p>}
        </Stack>
      </form>
    </>
  );
}
