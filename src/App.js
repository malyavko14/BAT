import Login from "./Login.js";
import React, {useEffect, useState} from "react";
import {useAuth} from "./auth/index";
import MainPage from "./MainPage.js";


export default function App() {
  const [logged] = useAuth();

    const [condition, setCondition] = useState(true)

    useEffect(() => { fetch("/api/get_platform", {
        method:"GET",
    }).then(r => r.json()).then(value => {
        if (!["windows", "linux"].includes(value.platform)){
            setCondition(false);
        }
        console.log(value.agent);
        console.log(value.platform)})

    })

  return (
      <div style={{backgroundColor:"#808080"}}>
        {logged ? <MainPage condition={condition} /> : <Login />}
      </div>
  );
}

