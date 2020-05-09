import React from 'react';
import Cell from './Cell'
import {connect} from 'react-redux';
function Main2(props : any) {
    const i = 1;
    function move(){
        props.move();
    }
    return (
        <div className="container pdt10">
            <div className="row">
                <div className="col">
                    <Cell cell={1} />
                </div>
                <div className="col">
                    <Cell cell={2}/>
                </div>
                <div className="col">
                    <Cell cell={3}/>
                </div>
            </div>
            <div className="row">
                <button className="btn btn-danger" onClick={move}>
                    ok
                </button>
            </div>
        </div>
  );
}
const mapStateToProps = (state : any) => {
    return {
      hourse: state.hourse,
    }
  }
const mapDispatchToProps = (dispatch : any) => {
    return {
        move : () =>{
            dispatch({type : 'MOVE'});
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Main2);