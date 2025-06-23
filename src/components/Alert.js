import React, { useRef, useEffect } from 'react'


export default function Alert(props) {
    const modalRef = useRef(null);

    useEffect(() => {
        if (props.show) {
            const modal = new window.bootstrap.Modal(modalRef.current);
            modal.show();
        }
    }, [props.show]);
    return (
        <div>


            {/* <!-- Modal --> */}
            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true" ref={modalRef}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            {/* <h1 className="modal-title fs-5" id="staticBackdropLabel">Modal title</h1> */}
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">
                            {props.message}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={props.oncancel} data-bs-dismiss="modal">No</button>
                            <button type="button" className="btn btn-primary" onClick={props.onsave} data-bs-dismiss="modal" >Yes</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
