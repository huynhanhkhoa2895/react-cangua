import React, { useEffect } from 'react';
import ODiChuyen from '../ODiChuyen/ODiChuyen'
import {connect} from 'react-redux';
import './Main.css';
import axios from 'axios';
import Note from '../Note/Note';
import Chat from '../Chat/Chat';
function Main(props : any) {
    useEffect(()=>{
      // axios.post("https://api.random.org/json-rpc/2/invoke",{
      //   "jsonrpc": "2.0",
      //   "method": "generateIntegers",
      //   "params": {
      //       "apiKey": "ae2ad27c-e888-4faf-8b58-92a721c07df6",
      //       "n": 1000,
      //       "min": 1,
      //       "max": 6,
      //       "replacement": true
      //   },
      //   "id": 42
      // })
        if(props.chess.finish){
          alert("VÁN CỜ ĐÃ KẾT THÚC")
        }
      }
    )

    return (
      <div className="container-fluid pdt10">
          <div className="row h100" style={{height : 870}}>
            <div className="col-md-2 h100">
              <div className="row" style={{height: "50%"}}>
                <div className="col-md-12 pd0">
                  <Chat />
                </div>
              </div>
              <div className="row" style={{height: "50%"}}>
                <div className="col-md-12 pd0">
                  <Note />
                </div>
              </div>
            </div>
            <div className="col-md-10">
              <div className="map">
                <div className="chess">
                  <ODiChuyen />
                </div>
              </div>
            </div>
          </div>
      </div>
    );
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
export default connect(mapStateToProps, mapDispatchToProps)(Main);
