import React, { useEffect, useState } from "react";
import UseFetch from "../hook/UseFetch";
import { IBus } from "../interface/bus";
import { ILine } from "../interface/line";

export default function LinesPage() {
  const { data, GET } = UseFetch("http://localhost:7979/lines");
  const [lines, setLines] = useState<ILine[]>([]);

  useEffect(() => {
    GET();
  }, []);

  useEffect(() => {
    if (data) setLines(data);
    else console.log("Not found Lines");
  }, [data]);

  return (
    <main>
      <div>
        <h1>All Lines🛣️</h1>
        {lines && lines.length > 0 ? (
          lines.map((line) => (
            <div key={line.name}>
              <p>
                <b>Name: </b> {line.name}
              </p>
              <p>
                <b>lineNumber: </b>
                {line.lineNumber}
                <p>
                  <b>Stations: </b> {line.stations}
                </p>
                <p>
                  <b>Departure Time:</b>
                  {line.schedule.map((time) => time.departureTime)}
                </p>
                <p>
                  <b>Arrival Time: </b>
                  {line.schedule.map((time) => time.arrivalTime)}
                </p>
                <p>
                  <b>Station: </b>
                  {line.schedule.map((time) => time.station)}
                </p>
              </p>
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
