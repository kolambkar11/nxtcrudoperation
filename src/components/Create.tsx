"use client";
import React, { use, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { z } from "zod";
import axios from "axios";
const mySchema = z.string();
console.log(mySchema);

const Create = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const postData = () => {
    axios.post(`https://675bc38f9ce247eb19374d66.mockapi.io/nco/fakeData`, {
      firstName,
      lastName,
      email,
    });

    console.log(firstName);
    console.log(lastName);
    console.log(email);
  };

  return (
    <>
      <div className="text-center">
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
          <Button type="button" onClick={postData}>
            Add Data
          </Button>
        </form>
      </div>
    </>
  );
};

export default Create;
