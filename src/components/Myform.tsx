"use client";
import React, { use, useEffect, useState } from "react";
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
  dateAdded: string;
};
const Myform = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [id, setId] = useState(1);
  const [isUpdate, setIsUpdate] = useState(false);
  const [dateT, setDateT] = useState(new Date());
  const [APIData, setAPIData] = useState<resultProps[]>([]);
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
    setFirstName(dt[0].firstName);
    setLastName(dt[0].lastName);
    setEmail(dt[0].email);
    setIsUpdate(true);
  };

  const handleDelete = (id: number) => {
    if (id > 0) {
      if (window.confirm("Are you sure you want to delete this data?")) {
        const fetchApi = async () => {
          try {
            const response: any = await fetch(
              "https://675bc38f9ce247eb19374d66.mockapi.io/nco/fakeData/" + id,
              {
                method: "DELETE",
              }
            )
              .then((res) => res.text())
              .then((res) => console.log(res));
            setAPIData(response);
          } catch (error) {
            console.error("Failed to delete data:", error);
          }
        };
        fetchApi();
        const dateAdded = new Date();
        toast("Data has been deleted", {
          description: "Added at: " + dateAdded,
          action: {
            label: "Thanks",
            onClick: () => console.log("Undo"),
          },
        });
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
            APIData.map((data, index) => (
              <TableRow key={index}>
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
