import React, { useState } from "react";

export default function UseFetch<T>(url: string): any {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);

  //   --------------GET method--------------
  const GET = async () => {
    try {
      const response = await fetch(`${url}`);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`HTTP error! ${errorData.error.message}`);
      }

      const result = await response.json();
      setData(result);
    } catch (error: unknown) {
      setError((error as Error).message || "An unknown error occurred.");
    }
  };

  //   --------------GetByCall method--------------
  const GetByCall = async (page: number, limit: number) => {
    try {
      const response = await fetch(`${url}`);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`HTTP error! ${errorData.error.message}`);
      }

      const result = await response.json();
      setData(result);
    } catch (error: unknown) {
      setError((error as Error).message || "An unknown error occurred.");
    }
  };

  //   --------------POST method--------------
  const POST = async (body?: object) => {
    try {
      const response = await fetch(`${url}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(body),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || "Request failed");
      }
      const result = await response.json();
      setData(result);
      return result;
    } catch (error) {
      setError((error as Error).message || "An unknown error occurred.");
      throw error;
    }
  };

  return { data, error, GET, GetByCall, POST };
}
