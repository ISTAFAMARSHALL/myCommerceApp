import React from 'react'
import { useEffect , useState} from "react";
// import {useContext} from "react";
// import { UserContext } from "../context/user";

function ProductList () {

  // const {currentUser} = useContext(UserContext);
  const [products, setProducts] = useState([]);
  const [errors, setErrors] = useState([]);

  // let filtered_school = currentUser.auth_level == "admin" && currentUser.teachers[0].school.length<=0 ?  ("") : (currentUser.auth_level == "teacher" || "admin" ? (currentUser.teachers[0].school.id) : (currentUser.students[0].school.id))
  
  useEffect(() => {
    fetch("/products")
    .then((response) => {
    if (response.ok) {
    response.json().then((data) => {
        setProducts(data);
    });
    } else {
    response.json().then((e) => setErrors(e.errors));
    }});
  }, []);

  return products.length === 0 ? (<h1>You have no assigned Schools</h1>) : (
    <div>
        
      {/* <h1>This Districts Schools</h1>

      {schools.map((s) => (
      <ul key={s.id}>
            {s.name}
            <br></br>
            {s.address}
            <br></br>
      </ul>
      ))} */}

      <div>
        { errors.length <= 0 ? ("") : (
        errors.map((err) => (
        <li key={err}>{err}</li>
        )))}
      </div>

    </div>

  )
}

export default ProductList;