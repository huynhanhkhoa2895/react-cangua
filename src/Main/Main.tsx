import React, { useEffect } from 'react';
import ODiChuyen from '../ODiChuyen/ODiChuyen'
import $ from 'jquery'
import {connect} from 'react-redux';
import './Main.css';
function Main(props : any) {
    useEffect(()=>{
      
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
      <div className="container-fluid pdt10">
          <div className="row h100">
            <div className="col-md-2 h100">
              <div className="note">
                <ul className="list-group">
                  {renderNote()}
                </ul>
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
      
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Main);
