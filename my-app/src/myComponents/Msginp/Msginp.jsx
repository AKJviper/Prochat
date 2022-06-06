import React from 'react';
import send from "../icons/send.png";
import './Msginp.css';
import ReactQuill from 'react-quill'
import "../../../node_modules/react-quill/dist/quill.snow.css"

const Msginp = ({ setMessage, sendMessage, message }) => {
    return (
        <div className='main'>
            <div className='richtext'>
                {/* <div className="uppericon">
                    <img name="richtext" className="icons" id="boldify" onClick="execCmd('bold');" src={bold} alt="."></img>
                    <img className='icons' id="italic" onClick={toggleClass} src={italic} alt="."></img>
                    <img className='icons' src={strikethrough} alt="."></img>
                    <div class="vl"></div>
                    <img className='icons' src={hyperlink} alt="."></img>
                    <div class="vl"></div>
                    <img className='icons' src={ollist} alt="."></img>
                    <img className='icons' src={ullist} alt="."></img>
                    <div class="vl"></div>
                    <img className='icons' src={quote} alt="."></img>
                    <div class="vl"></div>
                    <img className='icons' src={code} alt="."></img>
                    <img className='icons' src={codesnippet} alt="."></img>
                </div> */}
                {/* <form className="form">
                    <input
                        id="inp"
                        className={`input ${ctype}`}
                        type="text"
                        placeholder="Chat comes here..."
                        value={message}
                        onChange={({ target: { value } }) => setMessage(value)}
                        onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}
                    />
                    <button className="sendButton" onClick={e => sendMessage(e)}><img className='icons' src={send} alt="."></img></button>
                </form> */}
                {/* <div className="lowericon">
                    <img className='icons' src={add} alt="."></img>
                    <div class="vl"></div>
                    <img className='icons' src={emoji} alt="."></img>
                    <img className='icons' src={attherate} alt="."></img>
            
                </div> */}
                <ReactQuill
                    placeholder="Chat comes here..."
                    value={message}
                    onChange={(e) => setMessage(e)}
                    onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}
                    modules={Msginp.modules}
                    formats={Msginp.formats}
                />
                <button className="sendButton" onClick={e => sendMessage(e)}><img className='icons' src={send} alt="."></img></button>
            </div>
        </div>
    );
}
Msginp.modules = {
    toolbar: [['bold', 'italic','strike'],["link"],
    [{ list: "ordered" }, { list: "bullet" }],
        ["code-block"],
        ['blockquote'],
        ["image", "video"],
    ],
};
Msginp.formats = [
    'bold', 'italic', 'underline', 'strike', 'list', 'bullet', 'blockquote', "codeb-lock", "image", "video",
];
export default Msginp;