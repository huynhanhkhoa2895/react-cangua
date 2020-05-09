import React from 'react';
import './ODiChuyen.css';
import ODiChuyenItem from './ODiChuyenItem';
import {connect} from 'react-redux';
import CageItem from '../Cage/CageItem'
import Hourse from '../Model/Hourse';
function ODiChuyen(props : any) {
  function lacXiNgau(){
    if(props.chess.status){
      props.lacXiNgau();
    }else{
      alert("Chưa hết lượt mời bạn di chuyển quân cờ")
    }
  }
  function renderCageBox(){
    let xhtml :any = [];
    ["A","B","C","D"].forEach((team,key : any)=>{
        xhtml.push(
          <CageItem team={team} key={"team-"+team+key} />
        );
      }
    )
    return xhtml;
  }
  function hourseReadyMove(hourse : Hourse){
    props.readyToMove(hourse)
  }
  function renderItem(){
    let xhtml : any[] = [];
    for(let i=1;i<=15;i++){
      let xhtml_item = [];
      let count_item = 3;
      if(i === 7 || i === 8 || i === 9){
        count_item = 15;
      }
      for(let j=1;j<=count_item;j++){
        let item;
        if(i !== 1 && i !== 15 && j === 2 && count_item < 15){
          item = <ODiChuyenItem hourseReadyMove={hourseReadyMove} i={i} j={j} odiem={true} key={"odichuyen_"+i+"_"+j} />
        }else if(i === 7 || i === 8 || i === 9){
          if(i === 8){
            if(j == 1 || j== 15){
              item = <ODiChuyenItem hourseReadyMove={hourseReadyMove} i={i} j={j} key={"odichuyen_"+i+"_"+j}/>
            }else{
              item = <ODiChuyenItem hourseReadyMove={hourseReadyMove} i={i} j={j} odiem={true} key={"odichuyen_"+i+"_"+j}/>
            }
          }else{
            if(j == 8){
              item = <ODiChuyenItem hourseReadyMove={hourseReadyMove} i={i} j={j} odiem={true} key={"odichuyen_"+i+"_"+j}/>
            }else{
              item = <ODiChuyenItem hourseReadyMove={hourseReadyMove} i={i} j={j} key={"odichuyen_"+i+"_"+j}/>
            }
          }
        }else{
          item = <ODiChuyenItem hourseReadyMove={hourseReadyMove} i={i} j={j} key={"odichuyen_"+i+"_"+j}/>
        }
        xhtml_item.push(
          item
        );
      }
      xhtml.push(
        <div className="odichuyen-row" key={"odichuyen-row-"+i}>
          {xhtml_item}
        </div>
      );
    }
    return xhtml;
  }
  return (
    <>
      <div className="row">
        <div className="col">
          <button style={{marginTop : 10}} className="btn btn-success" onClick={lacXiNgau}>
            Lắc Xí Ngầu
          </button>
        </div>
        <div className="col text-right">
          <h3>Xí ngầu : {props.chess.xingau}</h3>
          <h3>Team : {props.chess.team}</h3>
        </div>
      </div>

      <div className="odichuyen">
        {renderCageBox()}
        {renderItem()}
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
      readyToMove : (hourse : Hourse) => {
        dispatch({type : 'READY_MOVE',hourse : hourse})
      }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ODiChuyen);
