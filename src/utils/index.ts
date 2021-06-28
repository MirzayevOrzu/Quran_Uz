
// {input: string} - ayah translation with tafsir
// {output: string} - tafsir excluded
export function excludeTafsir(str: string) {
    let end = false;
    let cordinates = [];
    let others = 0;
    let last: string = str[str.length - 1];
    let poss = [")", ";"]
    if(!poss.includes(last)) return str;

    for(let i = str.length -1; i >= 0; i--) { 
     let sym = str[i];
     if(!end && sym === ")") {
       cordinates.push(i);
       end = true;
     } else if (sym === ")") {
       others += 1;
     } else if (others && sym === "(") {
       others -= 1;
     } else if (sym === "(") {
       cordinates.push(i);
     }
    }
    return str.slice(0, cordinates[1] - 1);
  }