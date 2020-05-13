import Chess from "./Chess";
import HourseList from "./HourseList";
import Hourse from "./Hourse";
import NoteList from "./NoteList";
import {oXuatPhat} from "./map"
class ChessItem implements Chess{
    xingau : number;
    team : string;
    status : boolean;
    HourseOnChess : HourseList;
    HourseReadyMove? : Hourse | null;
    PositionMustGo? : any = null;
    ListCellHaveHourse? : any = {};    
    finish : boolean = false;
    note : NoteList | any = {};
    auto : boolean = false;
    constructor(xingau : number,team : string,status : boolean = true,HourseOnChess : HourseList){
        this.xingau = xingau;
        this.team = team;
        this.HourseOnChess = HourseOnChess;
        this.status = status
        this.finish = false
        this.note = {}
    }
    setHourseOnChess(HourseOnChess : HourseList){
        return this.HourseOnChess = HourseOnChess
    }
    setXiNgau(xingau : number){
        return this.xingau = xingau;
    }
    setTeam(team : string){
        return this.team = team;
    }
    setStatus(status : boolean){
        return this.status = status;
    }
    setReadyToMove(hourse : Hourse | any){
        return this.HourseReadyMove = hourse
    }
    getReadyToMove(){
        return this.HourseReadyMove;
    }
    getStatus(){
        return this.status;
    }
    setPositionMustGo(PositionMustGo : any){
        if(PositionMustGo != null){
            let i,j;
            Object.keys(PositionMustGo).forEach((e)=>{
                i = Number(e);
                j = PositionMustGo[e];
            })
            return this.PositionMustGo = {i : i,j : j}
        }else{
            return this.PositionMustGo = null;
        }
        // this.PositionMustGo = PositionMustGo;
    }
    getPositionMustGo(){
        return this.PositionMustGo;
    }
    setListCellHaveHourse(hourse : Hourse,cell : any,old_cell : any){
        delete this.ListCellHaveHourse[old_cell];
        this.ListCellHaveHourse[cell] = hourse;
        return this.ListCellHaveHourse;
    }
    checkHourseCanMoveInTeam(team : string) :boolean{
        let check = false
        this.HourseOnChess[team].forEach((hourse : Hourse,k : any)=>{
            if(hourse.status){
                if(hourse.getNextDestination(this.xingau,this.ListCellHaveHourse) != null){

                    check = true
                }
            }
        })
        if(!check){
            if(this.xingau == 1 || this.xingau == 6){
                let first_cell : {[key : string] : any} = oXuatPhat;
                let hourse_in_cell = this.ListCellHaveHourse[first_cell[team]]
                if(hourse_in_cell != null){
                    if(hourse_in_cell.team == team){
                        check = false
                    }
                }
            }
        }

        return check;
    }
    checkHourseCanMoveInTeamAuto(team : string) : any{
        let check = false
        let _hourse : Hourse | any = null;
        this.HourseOnChess[team].forEach((hourse : Hourse,k : any)=>{
            if(hourse.status){
                if(hourse.getNextDestination(this.xingau,this.ListCellHaveHourse) != null){
                    check = true;
                    _hourse = hourse
                }
            }
        })
        if(!check){
            if(this.xingau == 1 || this.xingau == 6){
                let first_cell : {[key : string] : any} = oXuatPhat;
                let hourse_in_cell = this.ListCellHaveHourse[first_cell[team]]
                if(hourse_in_cell != null){
                    if(hourse_in_cell.team == team){
                        check = false
                    }
                }
            }
        }

        return {status : check,hourse : _hourse};
    }
    setFinishChess(finish : boolean){
        this.finish = finish;
    }
    updateChess(){
        return {
            xingau : this.xingau,
            team : this.team,
            status : this.status,
            HourseOnChess : this.HourseOnChess,            
            HourseReadyMove : this.HourseReadyMove,
            PositionMustGo : this.PositionMustGo,
            ListCellHaveHourse : this.ListCellHaveHourse,
            finish : this.finish,
            note : this.note
        }
    }
    updateNoteList(note : NoteList){
        return this.note = note.getListNote()
    }
    setAuto(auto : boolean){
        this.auto = auto;
    }
}
export default ChessItem;