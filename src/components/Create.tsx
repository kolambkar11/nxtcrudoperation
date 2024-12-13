"use client";
import React, { use, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import axios from "axios";
import { toast } from "sonner";

const Create = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [id, setId] = useState(1);
  const [isUpdate, setIsUpdate] = useState(false);
  const [dateT, setDateT] = useState(new Date());
  const postData = () => {
    const dateAdded = new Date();

    setDateT(dateT);
    toast("Data has been added", {
      description: "Added at: " + dateAdded,
      action: {
        label: "Thanks",
        onClick: () => console.log("Undo"),
      },
    });
    axios.post(`https://675bc38f9ce247eb19374d66.mockapi.io/nco/fakeData`, {
      id: id + 1,
      firstName,
      lastName,
      email,
      dateAdded: dateT,
    });
  };

  return (
    <>
      <div className="text-center mb-4">
        <form>
          <div className="flex justify-between items-center gap-4">
            <Input
              placeholder="First Name"
              className="my-5"
              onChange={(e) => setFirstName(e.target.value)}
              value={firstName}
            />
            <Input
              placeholder="Last Name"
              className="my-5"
              onChange={(e) => setLastName(e.target.value)}
              value={lastName}
            />
            <Input
              placeholder="Email"
              className="my-5"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
          {isUpdate === false ? (
            <>
              <Button
                type="button"
                onClick={postData}
                className="me-3 bg-blue-400 text-dark hover:text-white"
              >
                Add Data
              </Button>
            </>
          ) : (
            <>
              <Button
                className="bg-green-400 text-black hover:text-white"
                type="button"
              >
                Update Data
              </Button>
            </>
          )}
        </form>
      </div>
    </>
  );
};

export default Create;
