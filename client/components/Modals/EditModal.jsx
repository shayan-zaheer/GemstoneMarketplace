"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupFormSchema } from "../Schemas/signupFormSchema";
import FormInput from "../Form/FormInput";
import { useEffect, useState } from "react";
import { Edit } from "lucide-react";
import { useSelector } from "react-redux";
import FormButton from "../FormButton";
import axios from "axios";
import toast from "react-hot-toast";

export function EditModal({ user }) {
  const loggedinUser = useSelector((store) => store.user.user);
  const [open, setOpen] = useState(false);
  const [preview, setPreview] = useState(loggedinUser?.profileImage || "");
  const [selectedFile, setSelectedFile] = useState(null);
  const form = useForm({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      residenceAddress: "",
      contact: "",
      cnic: "",
      walletAddress: "",
    },
  });

  useEffect(() => {
    if (loggedinUser) {
      form.reset({
        name: loggedinUser.name || "",
        email: loggedinUser.email || "",
        password: "",
        residenceAddress: loggedinUser.residenceAddress || " ",
        contact: loggedinUser.contact || "",
        cnic: loggedinUser.cnic,
        walletAddress: loggedinUser.walletAddress,
      });
    }
  }, [loggedinUser, open]);

  const onSubmit = async (data) => {
    try {
        const formData = new FormData();
        Object.keys(data).forEach((key) => {
            formData.append(key, data[key]);
        });

        if (selectedFile) {
            formData.append("profileImage", selectedFile);
        } 

        const result = await axios.patch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${loggedinUser?.userId}`,
            formData,
            {
                withCredentials: true,
            }
        );

        if(result.data?.status == "success"){
          toast.success(result.data?.message)
        }
    } catch (err) {
        console.error("❌ Error updating user:", err);
        toast.error(err.message);
    }
};



  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {loggedinUser?.userId === user?.userId && (
          <Edit className="text-primary cursor-pointer" />
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[450px] max-sm:w-11/12 sm:h-[500px] max-sm:h-[500px] overflow-x-auto bg-card text-gray-800 border- border-gray-200 shadow-xl">
        <DialogHeader>
          <DialogTitle className="text-xl text-primary">Edit profile</DialogTitle>
          <DialogDescription className="text-gray-700">
            Update your profile information below and save changes.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 ">
            <FormInput
              control={form.control}
              name="name"
              label="Full Name"
              placeholder="Enter Your Full Name"
              type="text"
            />
            <FormInput
              control={form.control}
              name="email"
              label="Email"
              placeholder="Enter Your Email"
              type="email"
            />
            <FormInput
              control={form.control}
              name="password"
              label="Password"
              placeholder="Enter Your Password"
              type="password"
            />

            <div className="flex flex-col">
              <label>Profile Image</label>
              {preview && (
                <a
                  href={preview}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-20 h-20 mx-auto my-2 rounded-full border border-gray-500 shadow-md overflow-hidden"
                >
                  <img
                    src={preview}
                    alt="Profile Preview"
                    className="w-full h-full object-cover"
                  />
                </a>
              )}
              <div className="w-full">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                  id="profileImage"
                />
                <label
                  htmlFor="profileImage"
                  className="block w-full !text-sm text-ellipsis truncate btn-primary p-2 rounded-md cursor-pointer text-center"
                >
                  {selectedFile
                    ? selectedFile.name
                    : "Upload Your New Image If You Want To Change"}
                </label>
              </div>
            </div>

            <FormInput
              control={form.control}
              name="residenceAddress"
              label="Residence Address"
              placeholder="Enter Your Residence Address"
              type="text"
            />
            <FormInput
              control={form.control}
              name="contact"
              label="Contact Number"
              placeholder="Enter Your Contact Number"
              type="text"
            />
            <FormInput
              control={form.control}
              name="cnic"
              label="CNIC"
              placeholder="Enter Your CNIC"
              type="text"
              disabled
            />

            <FormInput
              control={form.control}
              name="walletAddress"
              label="Wallet Address"
              placeholder="Your Wallet Address"
              type="text"
              disabled
            />
            <DialogFooter>
              <FormButton text="Save Changes" type="submit">
                Save changes
              </FormButton>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
