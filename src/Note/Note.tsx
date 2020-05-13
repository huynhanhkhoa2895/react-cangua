import React, { useEffect } from 'react';
import $ from 'jquery'
import {connect} from 'react-redux';

function Note(props : any) {
    useEffect(()=>{

    })
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
        <>
            <div className="note">
                <ul className="list-group">
                {renderNote()}
                </ul>
            </div>
        </>
    )
}
const mapStateToProps = (state : any) => {
    return {
      chess: state.chess,
      xingau: state.xingau,
      lastAction : state.lastAction
    }
  }
  export default connect(mapStateToProps, null)(Note);
