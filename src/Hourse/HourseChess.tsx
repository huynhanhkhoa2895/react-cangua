import React,{useState,useEffect} from 'react';
import './Hourse.css';
import {connect} from 'react-redux';
import usePrevious from '../hook/usePrevious';

import Hourse from '../Model/Hourse'
function HourseChess(props :any) {
    const {chess} = props
    const prevProps = usePrevious({chess});
    useEffect(() => {
        // console.log(prevProps)
        if(prevProps != null){
            let oldChess = prevProps.chess
            if(JSON.stringify(oldChess) !== JSON.stringify(chess)) {
                // if(cellActive){
                //     if(props.lastAction.type === "MOVE"){
                //         setCellActive(false)
                //     }
                //     if(props.lastAction.type === "READY_MOVE"){
                //         console.log(props)
                //     }
                // }
                // let hourse = new HourseItem("A0",1,1,"A");
                // if(props.i == hourse.i && props.j == hourse.j){
                //     setCellHourse(null)
                // }
                
                // console.log(chess)
                // process here
            }
        }   

    }, [chess])
    function getHourse(){
        if(props.chess.xingau == 0){
            alert("Bạn đã hết lượt mời bạn lắc xí ngầu")
        }else{
            if(!props.chess.status){
                if(props.hourse.team == props.chess.team){ // kt đúng team không     
                    let canMove = true;                
                    if(!props.hourse.status){                // kt đã ra khỏi chuồng chua
                        if(props.chess.xingau == 1 || props.chess.xingau == 6){
                            canMove = true;
                        }else{
                            canMove = false;
                        }
                        // nếu chua ra chuồng phải test xí ngầu
                    }
                    if(props.hourse.finish){
                        alert("Con ngựa này đã hoàn thành cuộc chơi")
                        canMove = false;
                    }
                    if(canMove){
                        // setCellActive(!cellActive);
                        if(props.chess.HourseReadyMove == null){
                            props.readyToMove(props.hourse)
                        }else{
                            if(props.chess.HourseReadyMove.id == props.hourse.id){
                                props.unSelectHourse()
                            }else{
                                props.unSelectHourse(props.hourse)
                                props.readyToMove(props.hourse) 
                            }

                        }
                        
                    }else{
                        if(!props.hourse.finish)alert("Hiện tại quân này không có đường nào đi")
                    }
                }else{
                    if(props.chess.HourseReadyMove == null) alert("Đây không phải lượt của team này")
                }
            }else{
                alert("Bạn đã hết lượt mời bạn lắc xí ngầu")
            }
        }
    }
    return(
        <div className={"hourse-box "+((props.chess.HourseReadyMove != null) ? ((props.chess.HourseReadyMove.id == props.hourse.id) ? "active" : "") : "")} onClick={getHourse}>
            <div className="hourse-image">
                <img src={"/img/hourse"+props.hourse.team+".png"} />
            </div>
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
        readyToMove : (hourse : Hourse) => {
            dispatch({type : 'READY_MOVE',hourse : hourse})
        },
        unSelectHourse : (hourse : Hourse) => {
            dispatch({type : 'UNSELECT_CELL',hourse : hourse});
        }
    }
  }
  export default connect(mapStateToProps, mapDispatchToProps)(HourseChess);