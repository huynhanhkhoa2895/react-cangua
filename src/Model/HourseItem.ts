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
        let stt = 1;
        if(this.status){
            let allPosition=Number(this.position) + Number(xingau);
            let check : any = true;
            if(this.odiem){
                let position_in_o_diem = this.position+1;
                let obj : any = oDiemMap;
                if((xingau == 1 || xingau == 6) && ListCellHaveHourse[this.map(position_in_o_diem)] == null){
                    return this.map(position_in_o_diem)
                }else if(obj[xingau.toString()][this.team] != null && obj[xingau.toString()][this.team] == this.map(position_in_o_diem) && (ListCellHaveHourse[this.map(position_in_o_diem)] == null)){
                    console.log()
                    return obj[xingau.toString()][this.team]
                }else{
                    return null;
                }
            }else{
                if(allPosition <= 62){
                    for(let i = Number(this.position)+1;i <= allPosition;i++){
                        if(check){
                            let hourse_in_cell = ListCellHaveHourse[this.map(i)]
                            if(hourse_in_cell != null){      
                                if(hourse_in_cell.team == this.team){
                                    check = false
                                }else{
                                    if(stt == xingau)check = true;
                                    else check = false
                                }
                                
                            }
                        }
                        stt++;
                    }
                }
                if(check) {
                    return this.map(allPosition);
                }else {
                    return null
                }
            }
        }else{
            return this.map(1)
        }
       
    }
}
export default HourseItem