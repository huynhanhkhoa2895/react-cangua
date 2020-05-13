import Hourse from './Hourse';
import {oXuatPhat} from './map'
import HourseList from './HourseList';
import ChessItem from './ChessItem';
import Chess from './Chess';
class HourseListItem{
    list : HourseList;
    toiLuot : boolean = false;
    constructor(){
        this.list = {"A" : [],"B" : [],"C" : [],"D" : []}
    }
    addHourse(hourse : Hourse){
        let team = hourse.team;
        return this.list[team].push(hourse)
    }
    updateChess(){
        return this.list;
    }
    getListHourse(team : string){
        return this.list[team];
    }
    getListHourseRaQuan(team : string){
        let list2 : any= [];
        this.list[team].forEach((hourse : Hourse)=>{
            if(hourse.status == true){
                list2.push(hourse);
            }
        })
        return list2;
    }
    setHourseRaQuan(team : string,chess : ChessItem){
        let _hourse : Hourse | any = null;
        let check = true;
        let checkCanMove = true;
        let _oXuatPhat : any = oXuatPhat;
        let ListCellHaveHourse = chess.ListCellHaveHourse;
        this.list[team].forEach((hourse : Hourse)=>{
            if(!hourse.status && check){
                if(ListCellHaveHourse[_oXuatPhat[team]] != null){
                    let hourse_in_chess : Hourse = ListCellHaveHourse[_oXuatPhat[team]]
                    
                    if(hourse_in_chess.team == hourse.team){
                        checkCanMove = false;
                    }
                }
                if(checkCanMove){
                    Object.keys(JSON.parse(_oXuatPhat[team])).forEach((key : any)=>{
                        hourse.i= Number(key);                    
                        hourse.j = JSON.parse(_oXuatPhat[team])[key];
                    })
                    check = false;
                    hourse.position = 1;
                    _hourse = hourse;
                    hourse.status = true;
                    chess.setListCellHaveHourse(hourse,_oXuatPhat[team],0)
                }
            }
        })
        return _hourse;
    }
    isQuaLuot(team : string) : boolean{
        let check = true;
        this.list[team].forEach((hourse : Hourse)=>{
            // Nếu vẫn chưa có quân nào ra thì qua lượt
            if(hourse.status){
                check = false;
            }
        })
        return check
    }
    isTeamNotAnyHourse(team : string){
        let check = true;
        this.list[team].forEach((hourse : Hourse)=>{
            // Nếu vẫn chưa có quân nào ra thì qua lượt
            if(hourse.status){
                check = false;
            }
        })
        return check
    }
    isNext(team : string) : boolean{
        let isNext = true 
        this.list[team].forEach((hourse : any)=>{
            if(hourse.status){
                isNext = false;
            }
        })
        return isNext;
    }
    kick(_hourse : Hourse){

        this.list[_hourse.team].forEach((hourse : Hourse)=>{
            if(hourse.id == _hourse.id){
                hourse.i = 0
                hourse.j = 0;
                hourse.position = 0;
                hourse.status = false
            }
        })

    }
    setHourseWhenMove(hourse : Hourse,status : any,xingau : number,chess : any){
        let check = true;
        let isHaveFinish = false;
        let checkChessFinish = true
        this.list[hourse.team].forEach((_hourse : Hourse)=>{
            if(check){
                if(_hourse.id == hourse.id){
                    let position : number;
                    if(hourse.odiem)position = hourse.position += 1;
                    else position = hourse.position += xingau;
                    if(hourse.status == false) hourse.position = 1;
                    else hourse.position = position; 
                    hourse.status = status;
                    if(position > 56){
                        hourse.odiem = true;
                    }
                    if(position == hourse.positionWin){
                        isHaveFinish = true
                        hourse.finish = true;
                    }
                }
            }
        })
        if(isHaveFinish){
            this.list[hourse.team].forEach((_hourse : Hourse)=>{
                if(_hourse.id != hourse.id){
                    _hourse.positionWin -= 1;
                }
                if(!_hourse.finish){
                    checkChessFinish = false;
                }
            })
            if(checkChessFinish)chess.setFinishChess(true)
        }
    }

}
export default HourseListItem