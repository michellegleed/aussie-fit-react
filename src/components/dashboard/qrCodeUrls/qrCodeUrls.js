import React, { useEffect } from 'react';
import CloseButton from '../../buttons/closeButton/closeButton';

import CloseIcon from '../../icons/close';

function QRCodeUrls(props) {

    const { groupID, closeModal } = props;

    useEffect(() => {
        const el = document.createElement('textarea');
        el.value = `https://aussiefit.herokuapp.com/group/${groupID}`;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
    }, []);

    return (
        <div className="modal">
            <div className="modal-content small-modal">
                {/* <div className="card-buttons">
                    <button id="close-button" onClick={() => closeModal()}>
                        <CloseIcon />
                    </button>
                </div> */}
                <CloseButton clickHandler={() => closeModal()} />
                <h4>Url copied to clipboard! Go to <a className="underlined-link" href="https://www.qrcode-monkey.com/" target="blank">www.qrcode-monkey.com</a> to create the QR code.</h4>
            </div>
        </div >
    )
}

export default QRCodeUrls;