import React from "react";

import { Card } from "primereact/card";

export default function BasicCard({ minWidth, width, maxWidth, comp }) {
  return (
    <div style={{ display: "flex", justifyContent: "center", height: "24rem", width: `${width}`, maxWidth: `${maxWidth}`, minWidth: `${minWidth}` }}>
      <Card
        pt={{
          root: {
            style: {
              display: "flex",
              alignItems: "center",
              minWidth: "350px",
              width: "100%",
              maxWidth: "700px",
              justifyContent: "center",

              outline: "2px solid rgba(0,0,0,0.1)",
            },
          },
          body: {
            style: {
              display: "flex",
              width: "100%",
              minWidth: "300px",
              alignItems: "center",
              padding: "10px",
              margin: "0",
            },
          },
          content: {
            style: {
              display: "flex",
              width: "100%",
              borderRadius: "50px",
            },
          },
        }}
        className={`flex border-round-2xl shadow-6 `}
      >
        {comp}
      </Card>
    </div>
  );
}
