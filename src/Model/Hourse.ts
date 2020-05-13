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
    setI(i : number): void;
    setJ(j : number): void;
    setStatus(status : boolean) : void;
    move(i: number,j: number) : void;
    kick() : void;
    getNextDestination(xingau : number,ListCellHaveHourse : any) : void; 
}
export default Hourse;