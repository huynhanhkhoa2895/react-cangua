import Hourse from "./Hourse";

class NoteList{
    list :any = {} ;
    constructor(list = {}){
        this.list = list
    }
    addNote(note : any){
        return this.list.push(note);
    }
    createStep(luot : any,team : string,xingau : any){
        this.list[luot] = {};
        this.list[luot] = {
            team : team,
            xingau : xingau,
            move : {},
            hourse : null
        }
    }
    addMoveNote(luot : any,from : any,to : any,hourse : Hourse,kick : any = null){
        this.list[luot]['move'] = {
            from : from,
            to : to,
            kick : kick
        }
        this.list[luot]['hourse'] = hourse
    }
    getListNote(){
        return this.list
    }
}
export default NoteList