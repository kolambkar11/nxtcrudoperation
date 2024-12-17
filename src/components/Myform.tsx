"use client";

import { useEffect, useState } from "react";
import { Input } from "./ui/input";
import axios from "axios";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "./ui/button";
import { Pencil, Trash2 } from "lucide-react";

type resultProps = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  dateAdded: string | number;
};
const Myform = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [id, setId] = useState(1);
  const [isUpdate, setIsUpdate] = useState(false);
  const [APIData, setAPIData] = useState<resultProps[]>([]);

  const postData = async () => {
    const newDate = new Date();
    try {
      const response = await axios.post(
        `https://675bc38f9ce247eb19374d66.mockapi.io/nco/fakeData`,
        {
          id: id, // Use current state of id
          firstName,
          lastName,
          email,
          dateAdded: newDate.toISOString(), // Format date properly
        }
      );
      toast.success("Data has been added!");
      setId(id + 1); // Increment id after successful post
      setAPIData((prev) => [...prev, response.data]); // Update UI locally
      setFirstName("");
      setLastName("");
      setEmail("");
    } catch (error) {
      toast.error("Failed to add data");
      console.error(error);
    }
  };

  useEffect(() => {
    const api = async () => {
      try {
        const response = await fetch(
          "https://675bc38f9ce247eb19374d66.mockapi.io/nco/fakeData",
          {
            method: "GET",
          }
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const jsonData = await response.json();
        setAPIData(jsonData);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    api();
  }, []);

  const handleEdit = (id: number) => {
    const dt = APIData.filter((item) => item.id === id);
    console.log(dt);
    setId(dt[0].id);
    setFirstName(dt[0].firstName);
    setLastName(dt[0].lastName);
    setEmail(dt[0].email);
    setIsUpdate(true);
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.put(
        `https://675bc38f9ce247eb19374d66.mockapi.io/nco/fakeData/${id}`,
        {
          id,
          firstName,
          lastName,
          email,
          dateAdded: new Date().toISOString(), // Update with current date
        }
      );
      toast.success("Data has been updated!");
      setAPIData((prev) =>
        prev.map((item) => (item.id === id ? response.data : item))
      ); // Update UI locally
      setIsUpdate(false);
      setFirstName("");
      setLastName("");
      setEmail("");
    } catch (error) {
      toast.error("Failed to update data");
      console.error(error);
    }
  };

  const handleDelete = async (id: number): Promise<void> => {
    if (window.confirm("Are you sure you want to delete this data?")) {
      try {
        await axios.delete(
          `https://675bc38f9ce247eb19374d66.mockapi.io/nco/fakeData/${id}`
        );
        toast.success("Data has been deleted!");
        setAPIData((prev) => prev.filter((item) => item.id !== id)); // Update UI locally
      } catch (error) {
        toast.error("Failed to delete data");
        console.error(error);
      }
    }
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
                onClick={handleUpdate}
              >
                Update Data
              </Button>
            </>
          )}
        </form>
      </div>

      <Table>
        <TableCaption>A list of your recent users.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">ID</TableHead>
            <TableHead className="text-center">First Name</TableHead>
            <TableHead className="text-center">Last Name</TableHead>
            <TableHead className="text-center">Email</TableHead>
            <TableHead className="text-center">Date Added</TableHead>
            <TableHead className="text-center">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {APIData ? (
            APIData.map((data) => (
              <TableRow key={data.id}>
                <TableCell className="text-center">{data.id}</TableCell>
                <TableCell className="text-center">{data.firstName}</TableCell>
                <TableCell className="text-center">{data.lastName}</TableCell>
                <TableCell className="text-center">{data.email}</TableCell>
                <TableCell className="text-center">{data.dateAdded}</TableCell>
                <TableCell className="text-center">
                  <Button
                    className="bg-blue-400 me-3"
                    onClick={() => {
                      handleEdit(data.id);
                    }}
                  >
                    <Pencil />
                  </Button>
                  <Button
                    className="bg-red-400"
                    onClick={() => {
                      handleDelete(data.id);
                    }}
                  >
                    <Trash2 />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={3} className="text-center">
                Loading...
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
};

export default Myform;
