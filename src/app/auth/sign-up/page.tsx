"use client";

import signUpAction from "@/app/auth/sign-up/sign-up.action";
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

export default function SignUp() {
  const schema = z.object({
    name: z.string().min(1, "Name is required"),
    country: z.string().min(1, "Country is required"),
    email: z.string().email("Invalid email").min(1, "Email is required"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
  });

  const defaultValues = {
    name: "",
    country: "Sri Lanka",
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
    defaultValues,
  });

  const onSubmit = (data: FormData) => {
    console.log(data); // call api with submitted data
    signUpAction(data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-xs">
        <Stack spacing={2} className="w-full max-w-xs">
          <TextField
            label="Name"
            fullWidth
            margin="normal"
            defaultValue={defaultValues.name}
            {...register("name")}
            error={!!errors.name}
            helperText={errors.name?.message}
          />
          <FormControl fullWidth margin="normal" error={!!errors.country}>
            <InputLabel>Country</InputLabel>
            <Select
              label="Country"
              {...register("country")}
              defaultValue={defaultValues.country}
              sx={{ my: 1 }}
            >
              <MenuItem value="Sri Lanka">Sri Lanka</MenuItem>
              <MenuItem value="USA">USA</MenuItem>
              {/* Add other countries as needed */}
            </Select>
            <FormHelperText>{errors.country?.message}</FormHelperText>
          </FormControl>
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            defaultValue={defaultValues.email}
            {...register("email")}
            error={!!errors.email}
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
            Sign Up
          </Button>
          <Link
            component={NextLink}
            href="/auth/sign-in"
            className="self-center"
          >
            Already have an account? Sign In
          </Link>
        </Stack>
      </form>
    </>
  );
}
