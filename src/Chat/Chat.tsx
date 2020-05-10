import React, { useEffect } from 'react';
import {connect} from 'react-redux';
import io from "socket.io-client";
var socket : any;
function Chat(props : any) {
    const ENDPOINT = '127.0.0.1:8080';
    useEffect(() => {    
        socket = io(ENDPOINT);
        socket.emit('hi', { }, (error : any) => {
            console.log("Đã say hi")
        });
      }, [ENDPOINT]);
    function emitToServer(){
        let data = {
            hi : "Khoa"
        }
        socket.emit('emit', data, (error : any) => {
            console.log("Đã say hi")
        });
    }
    return(
        <div className="chat">
            <button onClick={emitToServer}>Hi</button>
        </div>
    )
}
const mapStateToProps = (state : any) => {
    return {
      chess: state.chess,
      xingau: state.xingau,
      lastAction : state.lastAction
    }
  }
  const mapDispatchToProps = (dispatch : any) => {
    return {
        move : () =>{
          dispatch({type : 'MOVE'});
        },
        lacXiNgau : () =>{
          dispatch({type : 'LAC_XI_NGAU'});
        },
    }
  }
export default connect(mapStateToProps, mapDispatchToProps)(Chat);

