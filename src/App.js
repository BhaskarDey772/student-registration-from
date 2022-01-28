import axios from "axios";
import React, { useState } from "react";
import "./App.css";
import Dropdown from "./Dropdown";

const App = () => {
  const [state, setState] = useState({
    name: "",
    isparent: "",
    timezone: "( UTC - 5 ) Eastern Standard Time",
    country_code: "+91",
    phone: "",
    email: "",
    grade: "A",
  });
  const [disable, setDisable] = useState(true);
  const [active, setActive] = useState(false);
  const [data, setData] = useState();
  const handleInputs = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(
        "https://her-shreersc-express-server.herokuapp.com/v1/admin/registerStudent",
        state
      )
      .then((res) => {
        setData(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const isEmpty = () => {
    if (
      state.name !== "" &&
      state.isparent !== "" &&
      state.phone !== "" &&
      state.phone.length >= 10 &&
      state.email !== "" &&
      state.grade !== ""
    ) {
      setDisable(false);
    } else {
      setDisable(true);
    }
  };

  const classes = (data) => {
    if (data?.data === "success") {
      return "success";
    } else {
      return "fail";
    }
  };

  return (
    <div
      className="container"
      onClick={() => {
        active && setActive(false);
      }}
    >
      <div className="blank"></div>

      <form onSubmit={handleSubmit}>
        <p className="title">Register a new Student</p>
        <p className="subtitle">Personal Details</p>

        <input
          type="text"
          name="name"
          pattern="[a-z,A-Z]"
          value={state.name}
          onChange={handleInputs}
          onKeyUp={isEmpty}
          className="name"
          required
          placeholder="Enter Student Name"
        />

        <input
          type="date"
          name="isparent"
          value={state.isparent}
          onChange={handleInputs}
          onKeyUp={isEmpty}
          className="dob"
          required
          placeholder="Enter Student DOB"
        />

        <div className="input">
          <select
            name="timezone"
            onChange={handleInputs}
            value={state.timezone}
            onKeyUp={isEmpty}
            className="time"
            required
          >
            <option value="(UTC - 5 ) Eastern Standard Time">
              (UTC - 5 ) Eastern Standard Time
            </option>
            <option value="UTC Western European Time">
              UTC Western European Time
            </option>
            <option value="(UTC + 5:30 ) Indian Standard Time ">
              (UTC + 5:30 ) Indian Standard Time{" "}
            </option>
          </select>
        </div>

        <div className="contact  ">
          <Dropdown
            active={active}
            state={state}
            setState={setState}
            setActive={setActive}
          />
          <input
            type="number"
            name="phone"
            value={state.phone}
            onChange={handleInputs}
            onKeyUp={isEmpty}
            className="phone"
            placeholder="Whats App Mobile Number"
            required
          />
        </div>

        <input
          type="email"
          name="email"
          value={state.email}
          onChange={handleInputs}
          onKeyUp={isEmpty}
          className="email"
          placeholder="E-Mail"
          required
        />

        <div className="input">
          <select
            name="grade"
            onChange={handleInputs}
            value={state.grade}
            onKeyUp={isEmpty}
            className="class"
            required
          >
            <option value="A">Grade A</option>
            <option value="B">Grade B</option>
            <option value="C">Grade C</option>
            <option value="D">Grade D</option>
            <option value="E">Grade E</option>
            <option value="F">Grade F</option>
          </select>
        </div>

        <button
          type="submit"
          className="btn"
          disabled={disable}
          style={
            disable || data?.data === "success"
              ? { cursor: "not-allowed", opacity: "0.5" }
              : { cursor: "pointer" }
          }
        >
          {data?.data === "success" ? data?.data : "Register New Student"}
        </button>
      </form>
      <div className="next">
        <div className={classes(data)}>{data?.data}</div>
      </div>
    </div>
  );
};

export default App;
