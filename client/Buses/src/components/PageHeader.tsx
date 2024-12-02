import React from "react";

interface Props {
  titel: string;
  subtitel: string;
}
export default function PageHeader(props: Props) {
  return (
    <div>
      <h1>{props.titel}</h1>
      <h3>{props.subtitel}</h3>
    </div>
  );
}
