export function keyCombi(e: any): boolean {
    if(e.keyCode == 16 && e.keyCode == 67){
       //Shift + C
        return true;
    }
    return false;
}

// export function KeyPress(e: any) {
    
//     var evtobj = window.event? event : e

//     console.log (e.keyCode)

//     if (evtobj.keyCode == 18 && evtobj.keyCode == 68 && evtobj.keyCode == 65) {
//       alert("GG!");
//     }
//     e.preventDefault()
// }