interface Hourse{
    id : string;
    i : number;
    j : number;
    team : string;
    status : boolean;
    position : number;
    odiem : boolean;
    positionWin : number;
    finish : boolean;
    move(i: number,j: number) : void;
    kick() : void;
    getNextDestination(xingau : number,ListCellHaveHourse : any) : void; 
}
export default Hourse;