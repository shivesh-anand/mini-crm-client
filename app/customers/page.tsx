"use client";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Customers() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/customers`
      );
      setCustomers(response.data);
    };
    fetchCustomers();
  }, []);

  return (
    <div>
      <h1>Customers</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Total Spending</th>
            <th>Visits</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer._id}>
              <td>{customer.name}</td>
              <td>{customer.email}</td>
              <td>{customer.totalSpending}</td>
              <td>{customer.visits}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
