import React, { useEffect, useState } from "react";
import UseFetch from "../hook/UseFetch";
import { IBus } from "../interface/bus";

export default function BusesPage() {
  const { data, GET } = UseFetch("http://localhost:7979/buses");
  const [bus, setBus] = useState<IBus[]>([]);

  useEffect(() => {
    GET();
  }, []);

  useEffect(() => {
    if (data) setBus(data);
    else console.log("Not found Users");
  }, [data]);

  return (
    <main>
      <div>
        <h1>All Buses 🚌</h1>
        {bus && bus.length > 0 ? (
          bus.map((Bus) => (
            <div key={Bus.licensePlate}>
              <b>LicensePlate: </b>
              {Bus.licensePlate}
              <p>
                <b>Model: </b>
                {Bus.busModel}
              </p>
              <p>
                <b>Capacity: </b>
                {Bus.capacity}
              </p>
              <p>
                <b>Status: </b>
                {Bus.status}
              </p>
              <p></p>
              <br />
            </div>
          ))
        ) : (
          <p>No user</p>
        )}
      </div>
    </main>
  );
}
