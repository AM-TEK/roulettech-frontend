import { useState, useEffect } from "react"
import api from "../api"
import Accomplishment from "../components/Accomplishment";
import "../styles/Home.css";
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
      .then(() => {
        alert("Accomplishment deleted");
        getAccomplishments();
      }).catch((err) => {
        console.log(err);
        alert("Something went wrong");
      });
  };

  const addAccomplishment = async (event) => {
    event.preventDefault();
    const payload = { category, content };
    console.log('Payload:', payload);
    
    api.post("/api/accomplishments/", payload)
      .then((res) => {
        if (res.status === 201) {
          alert("Accomplishment added");
          // Clear the input fields
          setCategory("");
          setContent("");
          // Refresh the accomplishments list
          getAccomplishments();
        } else {
          alert("Something went wrong");
        }
      })
      .catch((err) => {
        console.log(err);
        alert("An error occurred while adding the accomplishment");
      });
  };

  return (
    <div className="home-container">
      <h1>Accomplishments App</h1>
      <h2>In order to progress towards your goals it can be helpful to track your accomplishments - big or small!</h2>
      
      <div className="accomplishments-container">
        <h3>Your Accomplishments:</h3>
        {accomplishments.map((accomplishment) => (
          <Accomplishment
            accomplishment={accomplishment}
            onDelete={deleteAccomplishment}
            key={accomplishment.id}
          />
        ))}
      </div>

      <div className="form-container">
        <h3>Add an accomplishment:</h3>
        <form onSubmit={addAccomplishment}>
          <label htmlFor="category">Category:</label>
          <input
            type="text"
            id="category"
            name="category"
            required
            onChange={(e) => setCategory(e.target.value)}
            value={category}
          />
          
          <label htmlFor="content">Content:</label>
          <textarea
            id="content"
            name="content"
            required
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Describe your accomplishment here..."
          ></textarea>
          
          <input type="submit" value="Submit"></input>
        </form>
      </div>
    </div>
  )
}
