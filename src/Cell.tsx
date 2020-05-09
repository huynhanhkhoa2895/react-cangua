import React from 'react';
import {connect} from 'react-redux';
function Cell (props : any) {
    function renderXhtml(hourse : any){
        let dash = null;
        if(props.cell == hourse.hourse.cell){
            dash = <span style={{background : "red",height : 40,width : 40,display : "block"}}></span>
        }
        let xhtml : any =
        <div style={{height : 40,width : 40, border : "1px solid #444", margin : "auto"}}>
            {dash}
        </div>;
        return xhtml;
    }
    return (
        <>
            {renderXhtml(props.hourse)}
        </>
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
export default connect(mapStateToProps, mapDispatchToProps)(Cell);
