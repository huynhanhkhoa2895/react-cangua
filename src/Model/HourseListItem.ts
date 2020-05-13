import Hourse from './Hourse';
import {oXuatPhat} from './map'
import HourseList from './HourseList';
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
    setHourseRaQuan(team : string){
        let _hourse : Hourse | any = null;
        let check = true;
        let _oXuatPhat : any = oXuatPhat;
        this.list[team].forEach((hourse : Hourse)=>{
            if(!hourse.status && check){
                _hourse = hourse;
                // hourse.status = true;
                // hourse.move(1,1);
                check = false;                
                // Object.keys(JSON.parse(_oXuatPhat[team])).forEach((key : any)=>{
                //     hourse.i= Number(key);                    
                //     hourse.j = JSON.parse(_oXuatPhat[team])[key];
                // })
                
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