"use server";
import { prisma } from "@/app/lib/db";
import { Prisma } from "@prisma/client";
import { z } from "zod";

const registerUserSchema = z.object({
  name: z
    .string()
    .nonempty({ message: "Name is required" })
    .min(3, { message: "Name should be atleast 3 characters" })
    .max(255, { message: "Name should be less than 255 characters" }),
  email: z
    .string()
    .email({ message: "Invalid email" })
    .nonempty("Email is required"),
  dob: z.string().nonempty("Date of birth is required"),
  mobile: z
    .string()
    .nonempty("Mobile number is required")
    .min(10, "Mobile number should be atleast 10 characters")
    .max(10, "Mobile number should be less than 10 characters"),
  password: z
    .string()
    .nonempty("Password is required")
    .min(6, "Password should be atleast 6 characters")
    .max(255, "Password should be less than 255 characters"),
  gender: z.string().nonempty({ message: "Gender is required" }),
  confirmPassword: z
    .string()
    .nonempty({ message: "Confirm password is required" }),
});

export type registerState = {
  status: "success" | "error" | undefined;
  errors?: {
    [key: string]: string[];
  };

  message?: string | null;
};

export async function RegisterUser(prevSate: any, formData: FormData) {
  console.log("Hey devraju  form data is here:", formData);

  const parsedData = registerUserSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    dob: formData.get("dob"),
    mobile: formData.get("mobile"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
    gender: formData.get("gender"),
  });

  if (!parsedData.success) {
    const state: registerState = {
      status: "error",
      message: "Oops there is some issue with the fields",
      errors: parsedData.error.flatten().fieldErrors,
    };
    return state;
  }

  if (parsedData.data.password !== parsedData.data.confirmPassword) {
    const state: registerState = {
      status: "error",
      message: "Password and confirm password should be same",
    };
    return state;
  }
  try{

  await prisma.table.create({
    data:{
        name: parsedData.data.name,
        email: parsedData.data.email,
        dob: parsedData.data.dob,
        mobno: parsedData.data.mobile,
        gender: parsedData.data.gender,
        password: parsedData.data.password
    }
  })

  const state: registerState = {
    status: "success",
    message: "User registered successfully",
  }
}catch(error){
    if(error instanceof Prisma.PrismaClientKnownRequestError){
        if(error.code==="P2002"){
            const state: registerState = {
                status: "error",
                message:"Email already exists",
            }
            return state;
        }
    }

    const state: registerState = {
        status: "error",
        message: "Something went wrong, internal server error",
    }
    return state;
}
}
