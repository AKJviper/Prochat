import React , { useRef, useState, useEffect } from "react"
import onlineIcon from '../../myComponents/icons/onlineIcon.png';
import { CopyToClipboard } from "react-copy-to-clipboard"
import './Container.css';
import Peer from "simple-peer"
import phone from "../icons/contact.png"
import io from "socket.io-client"
import queryString from 'query-string';
const socket = io.connect('http://localhost:5000')
const Container = ({ users }) => {
  const [ me, setMe ] = useState('')
	const [ stream, setStream ] = useState()
	const [ receivingCall, setReceivingCall ] = useState(false)
	const [ caller, setCaller ] = useState("")
	const [ callerSignal, setCallerSignal ] = useState()
	const [ callAccepted, setCallAccepted ] = useState(false)
	const [callEnded, setCallEnded] = useState(false)
	const [ idToCall, setIdToCall ] = useState("")
  const [cname, setName] = useState("")
  const [onvideo, setOnvideo] = useState(false)
	const myVideo = useRef()
	const userVideo = useRef()
	const connectionRef= useRef()
	useEffect(() => {
		
		const { name, room } = queryString.parse(window.location.search);
		setName(name);
		socket.on("me", (id) => {
			setMe(id)
		})

		socket.on("callUser", (data) => {
			setReceivingCall(true)
			setCaller(data.from)
			setName(data.cname)
			setCallerSignal(data.signal)
		})
	}, [callEnded])

	const callUser = (id) => {
		if(idToCall)
		navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
			setStream(stream)
			myVideo.current.srcObject = stream
		})
		const peer = new Peer({
			initiator: true,
			trickle: false,
			stream: stream
		})
		peer.on("signal", (data) => {
			socket.emit("callUser", {
				userToCall: id,
				signalData: data,
				from: me,
				cname: cname
			})
		})
		peer.on("stream", (stream) => {
			
				userVideo.current.srcObject = stream
			
		})
		socket.on("callAccepted", (signal) => {
			setCallAccepted(true)
			peer.signal(signal)
		})

		connectionRef.current = peer
	}

	const answerCall = () => {
		
		setCallAccepted(true)
		if(me)
		navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
			setStream(stream)
			userVideo.current.srcObject = stream
		})
		const peer = new Peer({
			initiator: false,
			trickle: false,
			stream: stream
		})
		peer.on("signal", (data) => {
			socket.emit("answerCall", { signal: data, to: caller })
		})
		
		peer.on("stream", (stream) => {
			userVideo.current.srcObject = stream
		})

		peer.signal(callerSignal)
		connectionRef.current = peer
	}

	const leaveCall = () => {
		setCallEnded(true)
		setStream(!stream)
		connectionRef.current.destroy()
	}
  return (
    <div className="textContainer">
        <div className="video-container">
				<div className="video">
					{stream && <video playsInline muted ref={myVideo} autoPlay style={{ width: "50px",height:"50px" }} />}
				</div>
				<div className="video">
					{callAccepted && !callEnded ?
					<video playsInline ref={userVideo} autoPlay style={{ width: "300px"}} />:
					null}
				</div>
			</div>
      {
        users
          ? (
            <div>
              <h4>Active Room Members:</h4><hr></hr><CopyToClipboard text={me} >
					<button style={{marginBottom:"10px"}}>
						Copy Video call ID
					</button>
						  </CopyToClipboard>
						  <input
					id="filled-basic"
					label="ID to call"
							  variant="filled"
							  placeholder="Other User ID"
					value={idToCall}
					onChange={(e) => setIdToCall(e.target.value)}
				/>
				<div className="call-button" >
					{callAccepted && !callEnded ? (
						<button onClick={leaveCall}>
							End Call
						</button>
							  ) : (
									  <button style={{width:"100%"}} onClick={() => callUser(idToCall)} >
							<img className='icons' src={phone} alt="."></img></button>
					)}
				</div>
              <div>
				{receivingCall && !callAccepted ? (
						<div className="caller">
						<h1 >{cname} is calling...</h1>
						<button onClick={answerCall}>
							Answer
						</button>
					</div>
				) : null}
			</div>
						  <div className="activeContainer">
						  
                <h2>
                  {users.map(({ name }) => (
                    <div>
                      <div key={name}  className="activeItem">
                        {name}
                        <img alt="Online Icon" src={onlineIcon} />
                        </div>
                      <hr></hr>
                    </div>
                  ))}
                </h2>
                
              </div>
            </div>
          )
          : null
      }
    </div>
  );
}

export default Container;