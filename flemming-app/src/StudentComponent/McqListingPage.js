// import React, { useState, useEffect } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import axios from 'axios';
// import ScannerListing from './ScannerListing';
// import FuListingPage from './FuListingPage';
// import Header from '../CommonComponent/Header';
// import Footer from '../CommonComponent/Footer';
// import Modal from 'react-modal';
// import { BeatLoader } from 'react-spinners';

// function McqListingPage() {
//     const [correctAnswer, setCorrectAnswer] = useState('');
//     const [selectedOption, setSelectedOption] = useState('');
//     const [data, setData] = useState({
//         tittle: '',
//         game_options: [],
//         options: [],
//         answer_value: '',
//         mode: ''
//     });
//     const [showModal, setShowModal] = useState(false);
//     const [modalContent, setModalContent] = useState({ message: '', linkUrl: '/game-list?taskId=1' });

//     const location = useLocation();
//     const url = new URLSearchParams(location.search);
//     const param = url.get('id');

//     const navigate = useNavigate();

//     const handleResult = async (result) => {
//         try {
//             const payload = {
//                 game_id: data.id,
//                 notes: 0,
//                 answer_value: result,
//                 status: ''
//             };
//             const response = await axios.post('https://api-flrming.dhoomaworksbench.site/user-game-update', payload, {
//                 headers: {
//                     Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`
//                 }
//             });

//             if (response.status === 200) {
//                 setModalContent({ message: 'Your Response Saved Successfully!', linkUrl: '/game-list?taskId=1' });
//                 setShowModal(true);
//             }
//         } catch (error) {
//             console.error('Error posting scan result:', error);
//             setModalContent({ message: error.message, linkUrl: '' });
//             setShowModal(true);
//         }
//     };

//     const handleChange = (e) => {
//         setSelectedOption(e.target.value);
//     };

//     function fetchDetails() {
//         const token = sessionStorage.getItem('accessToken');
//         const fetchUrl = `https://api-flrming.dhoomaworksbench.site/api/game/${param}/`;
//         axios.get(fetchUrl, {
//             headers: {
//                 Authorization: `Bearer ${token}`
//             }
//         })
//             .then(response => {
//                 setData(response.data);
//                 setCorrectAnswer(response.data?.answer_value);
//             })
//             .catch(error => {
//                 console.error('Error fetching game data:', error);
//                 alert('Failed to fetch game data.');
//             });
//     }

//     useEffect(() => {
//         fetchDetails();
//     }, []);

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         handleResult(selectedOption);
//     };

//     const capitalizeFirstLetter = (string) => {
//         return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
//     };

//     return (
//         <>
//             {data.mode === 'options' ? (
//                 <>
//                     <Header />
//                     <div className="container-fluid bg-gradient" style={{ overflow: 'hidden' }}>
//                         <div className="row justify-content-center align-items-center" style={{ minHeight: 'calc(100vh - 181px)' }}>
//                             <div className="col-md-8 d-flex justify-content-center">
//                                 <div className="card text-white p-4 rounded shadow-lg" style={{ height: '60vh', width: '100%', overflowY: 'auto', maxWidth: '600px' }}>
//                                     <div>
//                                         <form style={{ color: 'black' }} onSubmit={handleSubmit}>
//                                             <h3>Question: {capitalizeFirstLetter(data.tittle)}?</h3>
//                                             <h4>Choose the correct option from the list below!</h4>
//                                             {data.game_options.length <= 0 ? (<p>No options found</p>) : data.game_options.map((obj, index) => (
//                                                 <div key={index} className="firstlevel-button" style={{ display: 'flex', alignItems: 'center' }}>
//                                                     <div className="rounded-button" style={{ display: 'flex', alignItems: 'center', backgroundColor: '#1ABC9C', borderRadius: '20px', padding: '10px' }}>
//                                                         <input type="radio" name="options" value={capitalizeFirstLetter(obj?.tittle)} style={{ marginRight: '5px' }} onChange={handleChange} />
//                                                         {index + 1}
//                                                     </div>
//                                                     <div className="span" style={{ marginLeft: '10px' }}>
//                                                         <span>{capitalizeFirstLetter(obj.tittle)}</span>
//                                                     </div>
//                                                 </div>
//                                             ))}
//                                             <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
//                                                 <input type="submit" value="Next" className="submit-button" style={{ backgroundColor: '#3498db', color: '#fff', borderRadius: '20px', padding: '10px 20px', border: 'none', cursor: 'pointer' }} />
//                                             </div>
//                                         </form>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                     <Modal
//                         isOpen={showModal}
//                         onRequestClose={() => { setShowModal(false); navigate(modalContent.linkUrl) }}
//                         contentLabel="Result Modal"
//                         ariaHideApp={false}
//                         style={{
//                             overlay: {
//                                 backgroundColor: 'rgba(0, 0, 0, 0.75)'
//                             },
//                             content: {
//                                 color: 'black',
//                                 textAlign: 'center',
//                                 top: '50%',
//                                 left: '50%',
//                                 right: 'auto',
//                                 bottom: 'auto',
//                                 marginRight: '-50%',
//                                 transform: 'translate(-50%, -50%)'
//                             }
//                         }}
//                     >
//                         <h2>{modalContent.message}</h2>
//                         <button className="btn btn-primary mt-1" onClick={() => { setShowModal(false); navigate(modalContent.linkUrl) }}>Back</button>
//                     </Modal>
//                     <Footer />
//                 </>
//             ) : data.mode === 'qr' ? (
//                 <ScannerListing data={data} />
//             ) : data.mode === 'image' ? (
//                 <FuListingPage data={data} />
//             ) : <BeatLoader color="rgba(16, 18, 226, 2)" cssOverride={{ margin: '0 auto', position: 'relative', top: '50%' }} />}
//         </>
//     );
// }

// export default McqListingPage;



import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import ScannerListing from './ScannerListing';
import FuListingPage from './FuListingPage';
import Header from '../CommonComponent/Header';
import Footer from '../CommonComponent/Footer';
import Modal from 'react-modal';
import { BeatLoader } from 'react-spinners';

function McqListingPage() {
    const [correctAnswer, setCorrectAnswer] = useState('');
    const [selectedOption, setSelectedOption] = useState('');
    const [data, setData] = useState({
        tittle: '',
        game_options: [],
        options: [],
        answer_value: '',
        mode: ''
    });
    const [showModal, setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState({ message: '', linkUrl: '/game-list?taskId=1' });

    const location = useLocation();
    const url = new URLSearchParams(location.search);
    const param = url.get('id');

    const navigate = useNavigate();

    const handleResult = async (result) => {
        try {
            const payload = {
                game_id: data.id,
                notes: 0,
                answer_value: result,
                status: ''
            };
            const response = await axios.post('https://api-flrming.dhoomaworksbench.site/user-game-update', payload, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`
                }
            });

            if (response.status === 200) {
                setModalContent({ message: 'Your Response Saved Successfully!', linkUrl: '/game-list?taskId=1' });
                setShowModal(true);

                // Call the additional API here
                const studentId = sessionStorage.getItem('studentId');
                const scoreResponse = await axios.get(`https://api-flrming.dhoomaworksbench.site/game-scorebord-list?student=${studentId}`, {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`
                    }
                });

                const scoreData = scoreResponse.data.data.results[0];
                console.log('Scoreboard Response:', scoreData);
                console.log('scoreData.total_games:', scoreData.total_games);
                console.log('scoreData.success_games:', scoreData.success_games);
                // if (scoreData.total_games === scoreData.success_games) {
                //     navigate('/levels');
                // } 
                if (scoreData.success_games >= scoreData.total_games) {
                    navigate('/levels');
                }
            }
        } catch (error) {
            console.error('Error posting scan result:', error);
            setModalContent({ message: error.message, linkUrl: '' });
            setShowModal(true);
        }
    };

    const handleChange = (e) => {
        setSelectedOption(e.target.value);
    };

    function fetchDetails() {
        const token = sessionStorage.getItem('accessToken');
        const fetchUrl = `https://api-flrming.dhoomaworksbench.site/api/game/${param}/`;
        axios.get(fetchUrl, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                setData(response.data);
                setCorrectAnswer(response.data?.answer_value);
            })
            .catch(error => {
                console.error('Error fetching game data:', error);
                alert('Failed to fetch game data.');
            });
    }

    useEffect(() => {
        fetchDetails();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        handleResult(selectedOption);
    };

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    };

    return (
        <>
            {data.mode === 'options' ? (
                <>
                    <Header />
                    <div className="container-fluid bg-gradient" style={{ overflow: 'hidden' }}>
                        <div className="row justify-content-center align-items-center" style={{ minHeight: 'calc(100vh - 181px)' }}>
                            <div className="col-md-8 d-flex justify-content-center">
                                <div className="card text-white p-4 rounded shadow-lg" style={{ height: '60vh', width: '100%', overflowY: 'auto', maxWidth: '600px' }}>
                                    <div>
                                        <form style={{ color: 'black' }} onSubmit={handleSubmit}>
                                            <h3>Question: {capitalizeFirstLetter(data.tittle)}?</h3>
                                            <h4>Choose the correct option from the list below!</h4>
                                            {data.game_options.length <= 0 ? (<p>No options found</p>) : data.game_options.map((obj, index) => (
                                                <div key={index} className="firstlevel-button" style={{ display: 'flex', alignItems: 'center' }}>
                                                    <div className="rounded-button" style={{ display: 'flex', alignItems: 'center', backgroundColor: '#1ABC9C', borderRadius: '20px', padding: '10px' }}>
                                                        <input type="radio" name="options" value={capitalizeFirstLetter(obj?.tittle)} style={{ marginRight: '5px' }} onChange={handleChange} />
                                                        {index + 1}
                                                    </div>
                                                    <div className="span" style={{ marginLeft: '10px' }}>
                                                        <span>{capitalizeFirstLetter(obj.tittle)}</span>
                                                    </div>
                                                </div>
                                            ))}
                                            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                                                <input type="submit" value="Next" className="submit-button" style={{ backgroundColor: '#3498db', color: '#fff', borderRadius: '20px', padding: '10px 20px', border: 'none', cursor: 'pointer' }} />
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Modal
                        isOpen={showModal}
                        onRequestClose={() => { setShowModal(false); navigate(modalContent.linkUrl) }}
                        contentLabel="Result Modal"
                        ariaHideApp={false}
                        style={{
                            overlay: {
                                backgroundColor: 'rgba(0, 0, 0, 0.75)'
                            },
                            content: {
                                color: 'black',
                                textAlign: 'center',
                                top: '50%',
                                left: '50%',
                                right: 'auto',
                                bottom: 'auto',
                                marginRight: '-50%',
                                transform: 'translate(-50%, -50%)'
                            }
                        }}
                    >
                        <h2>{modalContent.message}</h2>
                        <button className="btn btn-primary mt-1" onClick={() => { setShowModal(false); navigate(modalContent.linkUrl) }}>Back</button>
                    </Modal>
                    <Footer />
                </>
            ) : data.mode === 'qr' ? (
                <ScannerListing data={data} />
            ) : data.mode === 'image' ? (
                <FuListingPage data={data} />
            ) : <BeatLoader color="rgba(16, 18, 226, 2)" cssOverride={{ margin: '0 auto', position: 'relative', top: '50%' }} />}
        </>
    );
}

export default McqListingPage;
