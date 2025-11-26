import './TechnologyCard.css';
import { Link } from 'react-router-dom';


function TechnologyCard({ name, state, onStateChange, id }) {
    return (
        <div className="Tech-card">
            <div className="Tech-card-row">
                <Link to={`/technology/${id}`} className="Tech-card-name-link">
                    <div className="Tech-card-name">{name}</div>
                </Link>
                <button
                    className={`Tech-card-button state-${state}`}
                    onClick={onStateChange}
                >
                    {state}
                </button>
            </div>
        </div>
    )
}

export default TechnologyCard;