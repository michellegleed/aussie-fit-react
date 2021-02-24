import React, { useEffect } from 'react';

function QRCodeUrls(props) {

    const { groupID, closeModal } = props;

    useEffect(() => {
        const el = document.createElement('textarea');
        el.value = `http://localhost:3000/group/${groupID}`;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
    }, []);

    return (
        <div className="modal-form">
            <div id="qr-code-modal">
                <div className="card-buttons">
                    <button id="close-button" onClick={() => closeModal()}>
                        <CloseIcon />
                    </button>
                </div>
                <h4>Url copied to clipboard! Go to www.... to create the QR code.</h4>
            </div>
        </div>
    )
}

export default QRCodeUrls;