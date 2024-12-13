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
import axios from "axios";

const Read = () => {
  const [APIData, setAPIData] = useState([]);
  useEffect(() => {
    axios
      .get(`https://675bc38f9ce247eb19374d66.mockapi.io/nco/fakeData`)
      .then((response) => {
        setAPIData(response.data);
      });
  }, []);

  return (
    <>
      <Table>
        <TableCaption>A list of your recent users.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">First Name</TableHead>
            <TableHead className="text-center">Last Name</TableHead>
            <TableHead className="text-center">Email</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {APIData.map((data: string, index: number) => {
            return (
              <TableRow key={index}>
                <TableCell className="text-center">{data.firstName}</TableCell>
                <TableCell className="text-center">{data.lastName}</TableCell>
                <TableCell className="text-center">{data.email}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
};

export default Read;
