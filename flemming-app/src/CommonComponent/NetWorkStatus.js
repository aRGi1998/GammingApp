import React, { useState, useEffect } from 'react';
import { Detector , Online , Offline } from 'react-detect-offline'

const NetworkStatus = () => {

    return (
        <>
            <Detector
                polling={{ interval: 500 , enabled: true, }}
                render={({ online }) => {
                    return !online ? (
                        <div style={{ color: 'white', textAlign: 'center', padding: '10px', background: 'blue' , fontWeight: 'bolder' , position:'fixed' , bottom:0 , left: 0, width:'100%' , zIndex:1000  }}>
                            You are offline. Please connect.
                        </div>
                    ): null
                }}
            />
        </>
    );
};

export default NetworkStatus;
