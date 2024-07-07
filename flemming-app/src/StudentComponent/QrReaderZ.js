
import React , { useEffect, useState } from 'react'
import {
  BrowserQRCodeReader,
  NotFoundException,
  ChecksumException,
  FormatException
} from "@zxing/library";

function QrReaderZ({ setQrResult }) {

    const [selectedDeviceId, setSelectedDeviceId] = useState("");
    const [videoInputDevices, setVideoInputDevices] = useState([]);        

    const codeReader = new BrowserQRCodeReader();
    let sourceSelect = null

    useEffect(() => {
        codeReader
            .getVideoInputDevices()
            .then((device) => {
                setupDevices(device)
            })
            .catch((err) => {
                alert(err)
            })
    },[])

    function resetClick() {
        codeReader.reset();
        setQrResult("");
    }    

    function setupDevices(videoInputDevices) {
        sourceSelect = document.getElementById("sourceSelect");

        setSelectedDeviceId(videoInputDevices[0].deviceId);

        if (videoInputDevices.length >= 1) {
            setVideoInputDevices(videoInputDevices)
        }
    } 

    function decodeContinuously(selectedDeviceId) {
        codeReader.decodeFromInputVideoDeviceContinuously(
            selectedDeviceId,
            "video",
            (result, err) => {
                if (result) {
                    // properly decoded qr code
                    setQrResult(result.text);
                }

                if (err) {
                    //handleScan("");

                    if (err instanceof NotFoundException) {
                        console.log("No QR code found, try again !");
                    }

                    if (err instanceof ChecksumException) {
                        console.log("A code was found, but it's read value was not valid, scan qr with aspect ratio of qr screen");
                    }

                    if (err instanceof FormatException) {
                        console.log("A code was found, but it was in a invalid format, scan qr with aspect ratio of qr screen");
                    }
                }
            }
        );
    }    
    
    useEffect(
        deviceId => {
            decodeContinuously(selectedDeviceId);
        },
        [selectedDeviceId]
    );    

    return (
        <section className="container" id="demo-content" style={{ display:'flex' , flexDirection: 'column' , alignItems:'center' , justifyContent:'center' , position:'relative', top:'-55px' , width:'350px' }}>
            <div id="sourceSelectPanel">
                <label for="sourceSelect">Change video source:</label>
                <select
                    id="sourceSelect"
                    onChange={() => setSelectedDeviceId(sourceSelect.value)}
                > 
                        { 
                        videoInputDevices.map(element => (
                            <option value={element.deviceId}>{element.label}</option>
                        )) 
                        }
                </select>
            </div>

            <div>
                <video id="video" width="300" height="200" />
            </div>

            <button id="resetButton" onClick={() => resetClick()} style={{ position:'relative', left:'6px'}}>
                Reset
            </button>
        </section>
    )
}

export default QrReaderZ