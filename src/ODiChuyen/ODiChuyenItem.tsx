import React,{useState,useEffect} from 'react';
import './ODiChuyen.css';
import Hourse from '../Model/Hourse';
import HourseList from '../Model/HourseList';
import {connect} from 'react-redux';
import HourseItem from '../Model/HourseItem';
import HourseChess from '../Hourse/HourseChess'
import usePrevious from '../hook/usePrevious';
import $ from 'jquery'
function ODiChuyenItem(props : any) {
    const [cellHouse,setCellHourse] = useState<any>();
    const [cellActive,setCellActive] = useState(false);
    const [oDiemValue,setODiemValue] = useState<any>(null);
    const {chess} = props
    let prevProps = usePrevious({chess});
    function setOdiem(){
        let xhtml : any;
        if(props.odiem){
            if((props.i == 7 && props.j == 8) || (props.i == 8 && props.j == 7) || (props.i == 8 && props.j == 9) || (props.i == 9 && props.j == 8)){
                xhtml=<span>6</span>
            }else if((props.i == 6 && props.j == 2) || (props.i == 8 && props.j == 6) || (props.i == 8 && props.j == 10) || (props.i == 10 && props.j == 2)){
                xhtml=<span>5</span>
            }else if((props.i == 5 && props.j == 2) || (props.i == 8 && props.j == 5) || (props.i == 8 && props.j == 11) || (props.i == 11 && props.j == 2)){
                xhtml=<span>4</span>
            }else if((props.i == 4 && props.j == 2) || (props.i == 8 && props.j == 4) || (props.i == 8 && props.j == 12) || (props.i == 12 && props.j == 2)){
                xhtml=<span>3</span>
            }else if((props.i == 3 && props.j == 2) || (props.i == 8 && props.j == 3) || (props.i == 8 && props.j == 13) || (props.i == 13 && props.j == 2)){
                xhtml=<span>2</span>
            }else if((props.i == 2 && props.j == 2) || (props.i == 8 && props.j == 2) || (props.i == 8 && props.j == 14) || (props.i == 14 && props.j == 2)){
                xhtml=<span>1</span>
            }
        }
        if(cellHouse == null) return xhtml;
        else return [];
    }
    useEffect(() => {
        if(prevProps != null){
            let oldChess = prevProps.chess
            if(JSON.stringify(oldChess) !== JSON.stringify(chess)) {
                if(props.lastAction.type === "READY_MOVE"){
                    if(props.i == props.chess.PositionMustGo.i && props.j == props.chess.PositionMustGo.j)
                    setCellActive(true)
                }
                if(props.lastAction.type === "MOVE"){
                    setCellActive(false)
                    setCellHourse(null)
                }

                setHourseInToCell(chess.HourseOnChess)
                // let hourse = new HourseItem("A0",1,1,"A");
                // if(props.i == hourse.i && props.j == hourse.j){
                //     setCellHourse(null)
                // }
                
                // console.log(chess)
                // process here
            }
        }   

    }, [chess])
    function getInfoCell(){  
        // kiểm tra ô này có quân nào chuẩn bị di chuyển chưa
        if(props.chess.HourseReadyMove != null){ 
            if(props.chess.status) alert("Bạn đã hết lượt mời bạn lắc tiếp")
            else{
                if(JSON.stringify(props.chess.PositionMustGo) === JSON.stringify({i : props.i,j : props.j})){
                    props.move(props.chess.HourseReadyMove,{i : props.i,j : props.j});
                }else{
                    if(cellHouse == null){
                        alert("ô chọn không hợp lý")
                    }else{
                        if(props.chess.HourseReadyMove.id == cellHouse.id){
                            props.unSelectCell()
                        }
                    }                    
                }

            }
        }
    }
    function setHourseInToCell(hourses : any){
        let hasDone = false;
        Object.keys(hourses).forEach((team)=>{
            if(hasDone) return false;
            hourses[team].forEach((hourse : Hourse)=>{
                if(hasDone) return false;
                if(hourse.i == props.i && hourse.j == props.j && !hasDone){
                    setCellHourse(hourse)
                    hasDone = true;
                }
            })
        })
    }
    function renderHourse(hourses : HourseList){
        let xhtml;
        let hasDone = false;
        // console.log(hourses)
        Object.keys(hourses).forEach((team)=>{
            if(hasDone) return false;
            // // hourses.list[1];
            hourses[team].forEach((hourse : Hourse)=>{
                if(hasDone) return false;
                if(hourse.i == props.i && hourse.j == props.j && !hasDone){
                    // setCellHourse(hourse)
                    // testMemo(props)
                    xhtml =
                    <HourseChess hourse={hourse} />;
                    hasDone = true;
                }
            })
        })
        return xhtml;
    }
    return(
        <>
            <div className={"odichuyen-item "+((props.odiem ? " odiem " : " ")+((cellActive) ? " activePointer " : " "))+((props.i == 8 && props.j == 8) ? " opacity0 " : "")} onClick={getInfoCell}>
                {setOdiem()}
                {renderHourse(props.chess.HourseOnChess)}
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
        move : (hourse : Hourse,destination : any) =>{
            dispatch({type : 'MOVE',hourse : hourse,destination : destination});
        },
        checkHourse : (hourse : Hourse) => {
            dispatch({type : 'CHECK_HOURSE',hourse : hourse});
        },
        unSelectCell : () => {
            dispatch({type : 'UNSELECT_CELL'});
        }
        // readyMove : () => {
        //     dispatch({type : 'READY_MOVE'});
        // }
    }
  }
export default connect(mapStateToProps, mapDispatchToProps)(ODiChuyenItem);
