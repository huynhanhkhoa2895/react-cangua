import HourseListItem from '../Model/HourseListItem';
import HourseItem from '../Model/HourseItem'
import Chess from '../Model/Chess';
import ChessItem from '../Model/ChessItem';
import ActionType from '../Model/ActionType';
import NoteList from '../Model/NoteList'
let hourseList = new HourseListItem;
let team = ["A","B","C","D"];
team.forEach((team) => {
    for(let i=0;i<4;i++){
        let id = team+""+i;
        let hourse
        // if(i==0 && team == "A"){
        //     hourse = new HourseItem(id,1,2,56,team,true)
        // }else if(i==1 && team == "A"){
        //     hourse = new HourseItem(id,1,3,55,team,true)
        // }else if(i==2 && team == "A"){
        //     hourse = new HourseItem(id,2,3,54,team,true)
        // }else if(i==3 && team == "A"){
        //     hourse = new HourseItem(id,3,3,53,team,true)
        // }else{
        //     hourse = new HourseItem(id,0,0,0,team)
        // }
        hourse = new HourseItem(id,0,0,0,team)
        hourseList.addHourse(hourse)
    }
});
var note = new NoteList();
var luot = 0;
var stt = 1;
let chessItem = new ChessItem(0,team[luot],true,hourseList.updateChess());
let hourse : any;
const chess = (chess : Chess = chessItem, action : ActionType = {type : 'MOVE',destination : {}}) => {
	switch(action.type){
        case "UNSELECT_CELL":
            chessItem.setReadyToMove(null);
            chessItem.setPositionMustGo(null);
            
            return {...chessItem.updateChess()};
        case "MOVE":
            hourse = action.hourse;
            let destination = action.destination;
            var old_destination = JSON.stringify({[hourse.i] : hourse.j})
            let hourseMove = hourse.move(destination.i,destination.j,chessItem.ListCellHaveHourse)
            if(hourseMove.status){
                chessItem.setReadyToMove(null)
                chessItem.setStatus(true);
                chessItem.setPositionMustGo(null);
                chessItem.setListCellHaveHourse(hourse,JSON.stringify({[destination.i] : destination.j}),old_destination);
                if(hourseMove.kick != null){
                    hourseList.kick(hourseMove.kick);
                    hourseList.updateChess()
                }
                note.addMoveNote((stt-1),JSON.parse(old_destination),{[destination.i] : destination.j},hourse,hourseMove.kick)
                hourseList.setHourseWhenMove(hourse,true,chessItem.xingau,chessItem)
            }
            chessItem.updateNoteList(note)
            return {...chessItem.updateChess()}
        case "READY_MOVE":
            hourse = action.hourse;
            let nextDestination = hourse.getNextDestination(chessItem.xingau,chessItem.ListCellHaveHourse);
            if(nextDestination != null){
                chessItem.setReadyToMove(action.hourse)
                chessItem.setPositionMustGo(JSON.parse(nextDestination))
            }
            if(nextDestination == null){
                alert("Con này không còn đường để đi")
            }
            return {...chessItem.updateChess()}
        case "LAC_XI_NGAU":   
            // this.getCart()
            // let oldPosition =  hourse.hourse.cell,newPosition = 0;
            // newPosition = oldPosition+=1;
            // hourse.hourse.cell = newPosition;
            let xingau = lacXiNgau()
            let currentTeam = team[luot];
            note.createStep(stt,currentTeam,xingau)            
            // CHESS STATUS FALSE : PHẢI DI CHUYỂN QUÂN CỜ, TRUE : PHẢI LẮC XÍ NGẦU
            chessItem.setXiNgau(xingau)
            if(hourseList.isTeamNotAnyHourse(currentTeam)){
                if(xingau == 1 || xingau == 6){
                    chessItem.setStatus(false);
                }else{
                    chessItem.setStatus(true);
                    quaTeam()
                }
            }else{
                if(chessItem.checkHourseCanMoveInTeam(currentTeam)) chessItem.setStatus(false);
                else chessItem.setStatus(true);
                if(xingau != 1 && xingau != 6) {
                    quaTeam()                
                }
            }

            chessItem.setReadyToMove(null)
            chessItem.setPositionMustGo(null);
            chessItem.setTeam(currentTeam);
            chessItem.setHourseOnChess(hourseList.updateChess())
            chessItem.updateNoteList(note);
            stt++;
            let new_chess = chessItem.updateChess();
            return {...new_chess}
        default:
            // let hourse1 = new HourseItem("A0",1,2,56,"A",true)
            // let hourse2 = new HourseItem("A1",1,3,55,"A",true)
            // let hourse3 = new HourseItem("A2",2,3,54,"A",true)
            // let hourse4 = new HourseItem("A3",3,3,53,"A",true)
            // chessItem.setListCellHaveHourse(hourse1,JSON.stringify({1 : 2}),0);
            // chessItem.setListCellHaveHourse(hourse2,JSON.stringify({1 : 3}),0);
            // chessItem.setListCellHaveHourse(hourse3,JSON.stringify({2 : 3}),0);
            // chessItem.setListCellHaveHourse(hourse4,JSON.stringify({3 : 3}),0);

            // console.log(chessItem.updateChess())
			return {...chessItem.updateChess()};
	}
}
function lacXiNgau(){
    return Math.floor(Math.random() * 6) + 1;
}
function getXiNgau(){

}
function quaTeam(){
    luot = luot += 1;
    if(luot >= 4){
        luot = 0;
    }
}
export default chess;