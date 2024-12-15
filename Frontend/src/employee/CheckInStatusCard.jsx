import React from 'react';
import './CheckInStatusCard.css'; // Import the CSS file for styling

const CheckInStatusCard = ({ status, checkedIn, checkedOut }) => {
  return (
    <div className={`status-card ${checkedIn ? 'checked-in' : checkedOut ? 'checked-out' : ''}`}>
      <div className="status-card-content">
        {checkedIn && <h3 className="status-message">You are Checked In</h3>}
        {checkedOut && <h3 className="status-message">You are Checked Out</h3>}
        <p className="status-update">{status}</p>
      </div>
    </div>
  );
}; 

export default CheckInStatusCard;
