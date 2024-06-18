import React from 'react';
import { useNavigate } from 'react-router-dom';
import frametrophy from '../assests/Frame2.png';
import rectangleImage from '../assests/Rectangle 11.png'

function HomePage() {
  const navigate = useNavigate();
  const handleSubmit = () => {
    navigate('/levels');
  }
  return (
    <>
      <div className="container-fluid bg-gradient" style={{ overflow: 'hidden' }}>
        <div className="container mt-5">
          <div style={{ position: 'relative' }}>
            <img className="image-style" src={rectangleImage} alt="Rectangle" style={{ zIndex: '1' }} />
            <div style={{ position: 'absolute', bottom: '25px', left: '70px', color: 'white', zIndex: '5', fontWeight: 'bold' }}>Sutherland Campus</div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px', marginLeft:'60px' }}>
            <div style={{ position: 'relative' }}>
              {/* <img src={Substract} alt="Small Image" style={{ position: 'absolute', right: '20px', top: '13px', width: '20px', height: '20px', borderRadius: '50%', backgroundColor: 'yellow', padding: '5px' }} /> */}
              <button onClick={handleSubmit} className="submit-button" style={{ backgroundColor: '#3498db', width: '250px', color: '#fff', borderRadius: '20px', padding: '10px 20px', border: 'none', cursor: 'pointer', fontWeight: 'bold', zIndex: '2' }}>Start Play</button>
            </div>
          </div>
          <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', marginBottom: '60px' , marginLeft:'30px'}}>
            <button className="square-button" style={{ width: '100px', height: '100px', backgroundColor: 'white', padding: '10px', border: 'none', cursor: 'pointer', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', borderRadius: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <img src={frametrophy} alt="Right Image" style={{ width: '50px', height: '50px', marginBottom: '5px' }} />
              <span style={{ color: 'black', textAlign: 'center' }}> <a style={{ color: 'black', textAlign: 'center' }} href="/status">Status</a></span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;
