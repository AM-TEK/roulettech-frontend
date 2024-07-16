import { useState, useEffect } from "react"
import api from "../api"
import Accomplishment from "../components/Accomplishment";
export default function Home() {
  const [accomplishments, setAccomplishments] = useState([]);
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    getAccomplishments();
  }, []);
  const getAccomplishments = async () => {
    api
      .get("/api/accomplishments/")
      .then((res) => res.data)
      .then((data) => setAccomplishments(data))
      .catch((err) => console.log(err));
  };

  const deleteAccomplishment = async (id) => {
    api.delete(`/api/accomplishments/delete/${id}/`)
      .then((res) => {
        if (res.status === 204) {
          alert("Accomplishment deleted");
        } else {
          alert("Something went wrong");
        }
        getAccomplishments();
      }).catch((err) => console.log(err));
  };

  const addAccomplishment = async (event) => {
    event.preventDefault();
    api.post("/api/accomplishments/", { category, content }).then((res) => {
      if (res.status === 201) {
        alert("Accomplishment added");
      } else {
        alert("Something went wrong");
      }
      getAccomplishments();
    }).catch((err) => console.log(err));
  };

  return (
    <div>
      <div>
        <h2>Accomplishments</h2>
        {accomplishments.map((accomplishment) => (
          <Accomplishment 
            accomplishment={accomplishment} 
            onDelete={deleteAccomplishment} 
            key={accomplishment.id} 
          />
        ))}
      </div>
      <h2>Add an Accomplishment</h2>
      <form onSubmit={addAccomplishment}>
        <label htmlFor="category">Category:</label>
        <br />
        <input
          type="text"
          id="category"
          name="category"
          required
          onChange={(e) => setCategory(e.target.value)}
          value={category}
        />
        <label htmlFor="content">Content:</label>
        <br />
        <textarea
          id="content"
          name="content"
          required
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <br />
        <input type="submit" value="Submit"></input>
      </form>
  </div>
  )
}
