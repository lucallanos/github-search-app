import React, { useState } from "react";
import "./App.css";
import axios from "axios";
// REACSTRAP
import { InputGroup, InputGroupAddon, Input, Button } from "reactstrap";
// COMPONENTS
import Header from "./components/Header/Header";
import CardUser from "./components/CardUser/CardUser";

function App() {
  const [inputText, setInputText] = useState("");
  const [userData, setUserData] = useState({});

  const onHandleChange = (e) => {
    setInputText(e.target.value);
  };

  const onHandleSubmit = (e) => {
    //Prevenir el comportamiento por defecto del form al hacer submit con preventDefault().
    e.preventDefault();
    //console.log(inputText);
    const userInput = inputText.toLocaleLowerCase().replace(/ /g, ""); //"Sanitizamos" la variable.
    if (userInput) {
      axios(`https://api.github.com/users/${userInput}`).then((res) =>
        setUserData(res.data)
      );
      setInputText("");
    } else {
      return;
    }
  };

  return (
    <div className="App">
      <Header />
      <div className="App-Form">
        <form onSubmit={onHandleSubmit}>
          <InputGroup>
            <Input
              placeholder="Buscar usuario"
              value={inputText}
              onChange={onHandleChange}
            />
            <InputGroupAddon addonType="prepend">
              <Button>Buscar</Button>
            </InputGroupAddon>
          </InputGroup>
        </form>
      </div>
      <div className="App--Container__Data">
        {/*Con el doble ampersan && decimos que si existe esa propiedad pinte nuestra CardUser, pero si no existe que devuelva null*/}
        {userData.id && <CardUser userData={userData} />}
      </div>
    </div>
  );
}

export default App;
