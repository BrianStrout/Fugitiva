export async function getSheet(def){
    let calledId = def.id;
    let calledPage = def.page;
    let assembled =`https://opensheet.elk.sh/${calledId}/${calledPage}`;
    // console.log(assembled);
    let res = await fetch(assembled);
   
    return res.json();
}