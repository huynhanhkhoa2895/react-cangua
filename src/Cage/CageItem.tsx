import React from 'react';
import './Cage.css';
import {connect} from 'react-redux';
import HourseChess from '../Hourse/HourseChess'
function CageItem(props : any) {
    function renderListHourse(){
        let xhtml :any = [];
        props.chess.HourseOnChess[props.team].forEach((hourse : any,k : any)=>{
            
                xhtml.push(
                    <div className="col-6 text-center" key={"CageItem_"+k}>
                        {
                            (hourse.status === false) ? <HourseChess hourse={hourse} /> : ""
                        }
                    </div>
                )
            

        })
        return xhtml;
    }
    return (
        <>
            <div className={"cage-box box-"+props.team}>
                <div style={{position : "absolute",left : "10px"}}>
                    <h1 style={{color : "green"}}>{props.team}</h1>
                </div>
                <div className="row">
                    {renderListHourse()}
                </div>
            </div>
        </>
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
export default connect(mapStateToProps, mapDispatchToProps)(CageItem);

