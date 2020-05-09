import React, { useEffect } from 'react';
import ODiChuyen from '../ODiChuyen/ODiChuyen'
import $ from 'jquery'
import {connect} from 'react-redux';
import './Main.css';
import axios from 'axios';
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
    function renderNote(){
      let notes = props.chess.note;
      let xhml : any = [];
      Object.keys(notes).forEach((luot : any,k : any)=>{
        let note = notes[luot]
        xhml.push(
          <li className="list-note" key={k+"note"}>
            <p><b style={{fontSize : "16px"}}>Lượt {luot}</b></p>
            <p>Team: {note.team}</p>
            <p>Số xí ngầu: {note.xingau}</p>
            {
              (!$.isEmptyObject(note.move)) ?
                <>
                  <p>
                    <strong>Hourse {note.hourse.id}</strong>
                  </p>
                  <p>
                    Move from {JSON.stringify(note.move.from)} to {JSON.stringify(note.move.to)}
                  </p>
                  {
                    (note.move.kick != null) ?
                    <p>Kick hourse {note.move.kick.id}</p>
                    :
                    ""
                  }
                </>
                :
                ""
            }
          </li>
        )
      })
      return xhml;
    }
    return (
      <div className="container pdt10">
          <div className="note">
            <ul className="list-group">
              {renderNote()}
            </ul>
          </div>
          <div className="map">
            <ODiChuyen />
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
