"use client";
import React, { useEffect, useState } from "react";
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

const Read = () => {
  const [APIData, setAPIData] = useState<resultProps[]>([]);

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

        // Assuming the API returns an array directly
        setAPIData(jsonData);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    api();
  }, []);

  const handleEdit = () => {};

  const handleDelete = (id: number) => {};

  return (
    <>
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
          {APIData.length > 0 ? (
            APIData.map((data, index) => (
              <TableRow key={index}>
                <TableCell className="text-center">{data.id}</TableCell>
                <TableCell className="text-center">{data.firstName}</TableCell>
                <TableCell className="text-center">{data.lastName}</TableCell>
                <TableCell className="text-center">{data.email}</TableCell>
                <TableCell className="text-center">{data.dateAdded}</TableCell>
                <TableCell className="text-center">
                  <Button className="bg-blue-400 me-3">
                    <Pencil />
                  </Button>
                  <Button className="bg-red-400">
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

export default Read;
