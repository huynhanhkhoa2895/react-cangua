import React from 'react';
import './ODiChuyen.css';
import ODiChuyenItem from './ODiChuyenItem';
import {connect} from 'react-redux';
import CageItem from '../Cage/CageItem'
import Hourse from '../Model/Hourse';
import axios from 'axios';

function ODiChuyen(props : any) {
  function lacXiNgau(){
    if(props.chess.status){
      axios.post("https://api.random.org/json-rpc/2/invoke",{
        "jsonrpc": "2.0",
        "method": "generateIntegers",
        "params": {
            "apiKey": "ae2ad27c-e888-4faf-8b58-92a721c07df6",
            "n": 1000,
            "min": 1,
            "max": 6,
            "replacement": true
        },
        "id": 42
      }).then(function (response) {
        let xingau = response.data.result.random.data;
        props.lacXiNgau(xingau);
      })
      .catch(function (error) {
        console.log(error);
      });
      
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
  function auto(){
    axios.post("https://api.random.org/json-rpc/2/invoke",{
      "jsonrpc": "2.0",
      "method": "generateIntegers",
      "params": {
          "apiKey": "ae2ad27c-e888-4faf-8b58-92a721c07df6",
          "n": 10000,
          "min": 1,
          "max": 6,
          "replacement": true
      },
      "id": 42
    }).then(function (response) {
      let xingau = response.data.result.random.data;
      props.auto(xingau);
    })
    // props.auto([6,6,6,3]);
  }
  return (
    <>
      <div className="row">
        <div className="col-2">
          <div className="row">
            <div className="col-12">
              <button style={{marginTop : 10}} className="btn btn-success" onClick={lacXiNgau}>
                Lắc Xí Ngầu
              </button>
            </div>
            <div className="col-12">
              <button style={{marginTop : 10}} className="btn btn-success" onClick={auto}>
                Choi auto
              </button>
            </div>
          </div>
          <div className="row">
            <div className="col-12 pd0 xingau-info">
              <h3>Xí ngầu : {props.chess.xingau}</h3>
              <h3>Team : {props.chess.team}</h3>
            </div>
          </div>
        </div>
        <div className="col-10">
          <div className="odichuyen">
            {renderCageBox()}
            {renderItem()}
          </div>
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
      lacXiNgau : (xingau : number) =>{
        dispatch({type : 'LAC_XI_NGAU',xingau : xingau});
      },
      auto : (xingau : any) =>{
        dispatch({type : 'PLAY_AUTO',xingau : xingau});
      },
      readyToMove : (hourse : Hourse) => {
        dispatch({type : 'READY_MOVE',hourse : hourse})
      }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ODiChuyen);
