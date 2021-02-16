import React, { useEffect } from 'react';

function QRCodeUrls(props) {

    const { groupID } = props;

    useEffect(() => {
        const el = document.createElement('textarea');
        el.value = `http://localhost:3000/group/${groupID}`;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
    }, []);

    return (
        <div>
            <h4>Url copied to clipboard! Go to www.... to create the QR code.</h4>
        </div>
    )
}

export default QRCodeUrls;