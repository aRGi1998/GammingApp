import React , { useState , useEffect } from 'react';
import { useNavigate , useLocation } from 'react-router-dom';
import axios from 'axios';
import ScannerListing from './ScannerListing';
import FuListingPage from './FuListingPage';
import Header from '../CommonComponent/Header';
import Footer from '../CommonComponent/Footer';

function McqListingPage() {
    const [correctAnswer,setCorrectAnswer] = useState('')
    const [selectedOption, setSelectedOption] = useState('');
    const [ data , setData ] = useState({
        tittle: '',
        options: [],
        answer_value: '',
        mode: ''
    }) 
    
    const location = useLocation();
    const url = new URLSearchParams(location.search)
    const param = url.get('id')

    const navigate = useNavigate();

    const handleChange = (e) => {
        setSelectedOption(e.target.value)
    };
    
    function fetchDetails(){
            const token = sessionStorage.getItem('accessToken');
            const fetchUrl = `https://api-flrming.dhoomaworksbench.site/api/game/${param}/`;    
            axios.get(fetchUrl, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(response => {
                    console.log(response.data || response.data[0])
                    setData(response.data);
                    setCorrectAnswer(response.data?.answer_value) 
                })
                .catch(error => {
                    console.error('Error fetching game data:', error);
                    alert('Failed to fetch game data.');
                });        
    }      

    useEffect(() => {        
        fetchDetails()
        console.log("response",data)
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(selectedOption)
        console.log(correctAnswer)
    };  

    // const handleSubmit = () => {
    //     navigate('/levels');
    // }
    console.log("from listing",data)
    return (
        <>
            { data.mode === 'options' ? (
                <>
                    <Header/>
                    <div className="container-fluid bg-gradient" style={{ overflow: 'hidden' }}>
                        <div className="row justify-content-center align-items-center" style={{ minHeight: 'calc(100vh - 181px)' }}>
                            <div className="col-md-8 d-flex justify-content-center">
                                <div className="card text-white p-4 rounded shadow-lg" style={{ height: '60vh', width: '100%', overflowY: 'auto', maxWidth: '600px' }}>
                                    <div>
                                        <form style={{color:'black'}} onSubmit={handleSubmit}>
                                            <h3>Question: {data.tittle}?</h3>
                                            <h4> Choose the correct option from the list below!"</h4>
                                            {data.options.length <= 0 ? (<p>no options found</p>) : data.options.map((index,option) => (

                                                <div key={index} className="firstlevel-button" style={{ display: 'flex', alignItems: 'center' }}>
                                                    <div className="rounded-button" style={{ display: 'flex', alignItems: 'center', backgroundColor: '#1ABC9C', borderRadius: '20px', padding: '10px' }}>
                                                        <input type="radio" name="options" value={option} style={{ marginRight: '5px' }} onChange={handleChange}/>
                                                        {index}
                                                    </div>
                                                    <div className="span" style={{ marginLeft: '10px' }}>
                                                        <span>George street</span>
                                                    </div>
                                                </div>
                                            ))}
                                            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                                                <input type='submit' value="Next"  className="submit-button" style={{ backgroundColor: '#3498db', color: '#fff', borderRadius: '20px', padding: '10px 20px', border: 'none', cursor: 'pointer' }}/>
                                            </div>
                                        </form>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Footer/>
                </>
            ): data.mode === 'qr' ? (
                <ScannerListing data={data}/>
            ): data.mode === 'image' ? ( 
                <FuListingPage data={data}/>
             ): <p style={{ fontWeight: 'bold' , fontSize: '24px'}}>loading...</p> }
        </>
    );
}

export default McqListingPage;
