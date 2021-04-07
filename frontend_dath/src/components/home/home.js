import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import CallApi from "../../utils/apiCaller"
import Cookies from "universal-cookie";
import jwt_decode from "jwt-decode";

Home.propTypes = {
  
};

function Home(props) {

  const cookies = new Cookies();
  const token = cookies.get("token");
  const decoded = jwt_decode(token);
  const name = cookies.get("name")
  const [data, setData] = useState([])

  useEffect(() => {
    CallApi("GET", "/user/listAllFriend", null).then((response) =>{
      setData(response.data);
    });
  },[])

  const addFriend = (id) => {
    CallApi("POST", "/user/appenAddfr", {
      idFriend: id,
      idUser: decoded._id,
      status: "",
    });
  }

  const acpFriend = (id) => {
    CallApi("POST", "/user/appenAddfr", {
      idFriend: id,
      idUser: decoded._id,
      status: "choxacnhan",
    });
  };

  return (
    <div>
      <p>xin chao: {name}</p>
      {data.map((dt, index) => (
        <p key={index}>
          {dt.name}{" "}
          <button onClick={() => addFriend(dt._id)}>add friend</button>
        </p>
      ))}

      <br></br><hr></hr>
        <p>dong y</p>
      {data.map((dt, index) => (
        <p key={index}>
          {dt.name}{" "}
          <button onClick={() => acpFriend(dt._id)}>Dong y</button>
        </p>
      ))}
    </div>
  );
}

export default Home;