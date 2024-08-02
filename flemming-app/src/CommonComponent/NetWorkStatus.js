import React, { useState, useEffect } from 'react';
import { Detector , Online , Offline } from 'react-detect-offline';


const NetworkStatus = () => {
    const [online, setOnline] = useState(true);
    const [isPolling, setIsPolling] = useState(true);

    useEffect(() => {
        let pollingInterval;
        let timeout;

        const checkNetworkStatus = async () => {
            if (!navigator.onLine) {
                setOnline(false);
            } else {
                setOnline(true);
            }
        };

        if (isPolling) {
            pollingInterval = setInterval(checkNetworkStatus, 500); 
        } else {
            timeout = setTimeout(async() => {
                await checkNetworkStatus();
                pollingInterval = setInterval(checkNetworkStatus, 500); 
            }, 30 * 60 * 1000); 
        }

        return () => {
            clearInterval(pollingInterval);
            clearTimeout(timeout);
        };
    }, [isPolling]);

    useEffect(() => {
        setTimeout(() => {
            setIsPolling(false);
        }, 5 * 60 * 1000);
    }, []);

    return (
        <>
            {!online && (
                <div style={{
                    color: 'white',
                    textAlign: 'center',
                    padding: '10px',
                    background: 'blue',
                    fontWeight: 'bolder',
                    position: 'fixed',
                    bottom: 0,
                    left: 0,
                    width: '100%',
                    zIndex: 1000
                }}>
                    You are offline. Please connect.
                </div>
            )}
        </>
    );
};

export default NetworkStatus;
