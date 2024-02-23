import React from "react";
import ReactDOM from "react-dom/client";
import { RouterView } from "oh-router-react";
import { Spin } from "antd";
import { router } from "./router";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterView
      router={router}
      splash={
        <div
          style={{
            height: "100vh",
            width: "100vw",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Spin size="large" />
        </div>
      }
    />
  </React.StrictMode>
);
