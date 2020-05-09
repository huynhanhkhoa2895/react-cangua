import Hourse from './Hourse'
import {teamA,teamB,teamC,teamD,oDiemMap} from './map'
import $ from 'jquery';
class HourseItem implements Hourse{
    id : string;
    i:number;
    j:number;
    team: string;
    position : number;
    status : boolean = false;
    odiem : boolean = false;
    finish : boolean = false;
    positionWin : number = 62;
    // STATUS FALSE : CÒN NẰM TRONG CHUỒNG
    constructor(id : string,i: number,j: number,position : number,team: string,status: boolean = false,odiem: boolean = false,finish: boolean = false){
        this.id = id;
        this.i = i;
        this.j = j;
        this.team = team;
        this.position = position;
        this.status = status;
        this.odiem = odiem;
        this.finish = finish;
    }
    move(i : number,j : number,ListCellHaveHourse? : any) : any{
        let hourse : Hourse = ListCellHaveHourse[JSON.stringify({[i] : j})]
        if(hourse == null){
            this.i = i;
            this.j = j;
            // this.position += xingau
            return {status : true}
        }else{
            if(hourse.team == this.team){
                alert("ô này có team mình")
                return {status : false};
            }else{
                this.i = i;
                this.j = j;
                // this.position += xingau
                return {status : true,kick : hourse}
            }
        }

    }
    kick(){
        this.i = 0
        this.j = 0;
        this.position = 0;
        this.status = false
    }
    map(_position : number){
        let map : any;
        switch(this.team){
            case "A" :
                map = teamA;
            break;
            case "B" :
                map = teamB
            break;
            case "C" :
                map = teamC
            break;
            case "D" :
                map = teamD
            break;
        }
        return map[_position];
    }
    getNextDestination(xingau :number,ListCellHaveHourse : any){
        
        if(this.status){
            let allPosition=Number(this.position) + Number(xingau);
            let check : any = allPosition <= 62 ? true : false;
            if(allPosition <= 62){
                for(let i = Number(this.position)+1;i < allPosition;i++){
                    if(check){
                        if(ListCellHaveHourse[this.map(i)] != null){
                            check = false;
                        }
                    }
    
                }
            }
            
            if(check) {
                if(this.odiem){
                    let position_in_o_diem = this.position+1;
                    let obj : any = oDiemMap;
                    if(xingau == 1 || xingau == 6){
                        return this.map(position_in_o_diem)
                    }else if(obj[xingau.toString()][this.team] != null){
                        return obj[xingau.toString()][this.team]
                    }else{
                        return null;
                    }
                }
                else return this.map(allPosition);
            }
            else return null
        }else{
            return this.map(1)
        }
       
    }
}
export default HourseItem