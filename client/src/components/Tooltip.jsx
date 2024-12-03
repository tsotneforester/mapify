import { useState } from 'react';
import './Tooltip.css'; // Import your CSS file for styling

const Tooltip = ({ text, tooltipText }) => {
  const [visible, setVisible] = useState(false);

  return (
    <div className="tooltip-container">
      <span onMouseEnter={() => setVisible(true)} onMouseLeave={() => setVisible(false)}>
        {text}
      </span>
      {visible && <div className="tooltip">{tooltipText}</div>}
    </div>
  );
};

export default Tooltip;
