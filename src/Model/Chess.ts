import HourseList from './HourseList'
import Hourse from './Hourse'
import NoteList from './NoteList'
interface Chess{
    xingau : number,
    team : string,
    HourseOnChess : HourseList;
    status : boolean;
    finish : boolean;
    note : NoteList;
    HourseReadyMove?: Hourse | null,
    PositionMustGo? : any,
    ListCellHaveHourse? : any,
    setHourseOnChess(HourseOnChess : HourseList) : void;
    setXiNgau(xingau : number) : void;
    setStatus(status : boolean) : void;
    setTeam(team : string): void;
    setPositionMustGo(PositionMustGo : any): void;
    setReadyToMove(hourse : Hourse | any) : void;
    setListCellHaveHourse(hourse : Hourse | any, cell : any,old_cell : any) : void;
    checkHourseCanMoveInTeam(team : string) : boolean;
    getPositionMustGo() : void;
    updateChess(): void;
    getStatus(): boolean;
    setFinishChess(finish : boolean) : void;
}
export default Chess