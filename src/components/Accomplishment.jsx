/* eslint-disable react/prop-types */
import "../styles/Accomplishment.css"

function Accomplishment({ accomplishment, onDelete }) {
    const formattedDate = new Date(accomplishment.created_at).toLocaleDateString("en-US")

    const handleDelete = () => {
      if (window.confirm('Are you sure you want to delete this accomplishment?')) {
        onDelete(accomplishment.id)
      }
    }

    return (
        <div className="accomplishment-container">
          <p className="accomplishment-title">{accomplishment.category}</p>
          <p className="accomplishment-content">{accomplishment.content}</p>
          <p className="accomplishment-date">{formattedDate}</p>
          <button className="delete-button" onClick={handleDelete}>
              Delete
          </button>
        </div>
    );
}

export default Accomplishment