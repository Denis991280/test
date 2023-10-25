import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Async from "./assets/components/Async";
import Axios from "./assets/components/Axios";

function App() {

  const [items, setItems] = useState(null);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
            .then(res=>res.json())
            .then(json=>setItems(json))
  }, []);

  return (
    <>
    {/* <Async /> */}
    <Axios />
    {/* <div className="products">

    {
      !items ? <h1>Loading...</h1> :
      items.map((element) => {
      return (
        <div className="cards"> 
          <h1>{element.title}</h1>
          <img src={element.image} alt={element.title} />
          <p>{element.description}</p>
        </div>
      )
    })}

  </div> */}
  </>
  )
}

export default App;
