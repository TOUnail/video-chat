import React, {useContext, useState} from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { SocketContext } from '../SocketContext';

import styles from "./Option.module.css"

const Options = ({children}) => {
    const {me, callAccepted, name, setName, callUser} = useContext(SocketContext);
    const [idToCall, setIdToCall] = useState("");
    // console.log(callAccepted)
    return (
        <>
        {!callAccepted &&
        <div className="is-expanded">
                <div className="field">
                    <label htmlFor="name" className="label">Name</label>
                    <input id="name" className="input" value={name} onChange={e=>setName(e.target.value)} />
                </div>
                <div className="field">
                    <label htmlFor="recipient" className="label">Recipient ID</label>
                    <input value={idToCall} id="recipient" className="input" onChange={e=>setIdToCall(e.target.value)} />
                </div>
                
                <button className="button is-success is-large is-fullwidth" disabled={name.length === 0 || idToCall.length === 0} onClick={()=>callUser(idToCall)}>
                    <svg className="mr-2" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M3.51089 2L7.15002 2.13169C7.91653 2.15942 8.59676 2.64346 8.89053 3.3702L9.96656 6.03213C10.217 6.65159 10.1496 7.35837 9.78693 7.91634L8.40831 10.0375C9.22454 11.2096 11.4447 13.9558 13.7955 15.5633L15.5484 14.4845C15.9939 14.2103 16.5273 14.1289 17.0314 14.2581L20.5161 15.1517C21.4429 15.3894 22.0674 16.2782 21.9942 17.2552L21.7705 20.2385C21.6919 21.2854 20.8351 22.1069 19.818 21.9887C6.39245 20.4276 -1.48056 1.99997 3.51089 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Call
                </button>
                <div className="field mt-6">
                    <label htmlFor="yourId" className="label">Your ID</label>
                    <div className="control">
                        <div className="field has-addons">
                            {/* <div className="control">
                                <button>

                                </button>
                            </div> */}
                            <div className="control is-expanded">
                                <input disabled={name.length===0} id="yourId" onFocus={(e)=>e.target.select()} readOnly placeholder={me} defaultValue={name.length===0? "" : me} className={`input ${styles.idInput}`} type="text" />
                            </div>
                            <div className="control">
                                <CopyToClipboard text={me}>
                                <button disabled={name.length===0} className="button is-info">
                                    <svg className="mr-2" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <rect x="9" y="9" width="13" height="13" rx="2" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M5 15H4C2.89543 15 2 14.1046 2 13V4C2 2.89543 2.89543 2 4 2H13C14.1046 2 15 2.89543 15 4V5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                    Copy
                                </button>
                                </CopyToClipboard>
                            </div>
                        </div>
                    </div>
                    
                    {name.length===0 &&
                            <p className="help is-danger">Please enter your name.</p>
                            }
                </div>
            {children}
            </div>
    }
    </>
    )
}

export default Options
