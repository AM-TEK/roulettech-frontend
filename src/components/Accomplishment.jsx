/* eslint-disable react/prop-types */
import "../styles/Accomplishment.css"

function Accomplishment({ accomplishment, onDelete }) {
    const formattedDate = new Date(accomplishment.created_at).toLocaleDateString("en-US")

    return (
        <div className="accomplishment-container">
          <p className="accomplishment-title">{accomplishment.category}</p>
          <p className="accomplishment-content">{accomplishment.content}</p>
          <p className="accomplishment-date">{formattedDate}</p>
          <button className="delete-button" onClick={() => onDelete(accomplishment.id)}>
              Delete
          </button>
        </div>
    );
}

export default Accomplishment