import { useState } from 'react';
import "./style.css";
import { useNavigate } from 'react-router-dom';
function FrontComp() {

  const navigate = useNavigate();

  const [page, setpage] = useState(true)

  function handlenavigate() {
    setpage(true);
    if (page === true) {
      navigate("/mail");
    }
  }
  return (
    <div className="container">
      <div className='front-box'>
        <h1 className='hedaer-box'>Bulk Mailer</h1>
        <p>We are happy to help you here...!</p>
        <button className='open-btn' onClick={handlenavigate}>Go to Mailer</button>
      </div>
    </div>
  )
}

export default FrontComp;