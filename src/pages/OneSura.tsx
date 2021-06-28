import React from 'react';
import { useParams } from 'react-router-dom';
import ReactAudioPlayer from 'react-audio-player';
import axios from 'axios';
import { scrollIntoView, scrollTo } from 'scroll-js';

interface Params {
    id: string
}

function OneSura() {
    const [suraDataText, setSuraDataText] = React.useState<any>({});
    const [suraDataAudio, setSuraDataAudio] = React.useState<any>({});
    const [state, setState] = React.useState<boolean>(false);
    // const [pointer, setPointer] = React.useState<number>(0);
    let params: Params = useParams();
    const ayah = React.useRef(null);

    React.useEffect(() => {
        let relevant = true;

        axios.get(`http://api.alquran.cloud/v1/surah/${params.id}/ar.alafasy`)
        .then(res => {
            if(relevant) {
                setSuraDataAudio(res.data.data);    
            }
            axios.get(`https://api.alquran.cloud/v1/surah/${params.id}/uz.sodik`)
            .then(res => {
                if(relevant) {
                    setSuraDataText(res.data.data);
                    setState(true);    
                }
            })
            .catch(err => {
                console.log(err);
            })
        })
        .catch(err => {
            console.log(err);
        })
       
        return function() {
            relevant = false;
        }
    }, []);
 
    const handlePlay = () => {
        var pointer = 0;
        var audioCount = suraDataAudio.ayahs.length;
        var audioElement = document.getElementById("sura-auto-play") as HTMLAudioElement;
        
        function onload(){
            const element: any = document.body.getElementsByClassName('ayah')[pointer];
            element.classList.add("active-sura");
    
            scrollIntoView( element, document.body, { behavior: 'smooth' })
            .then(() => {
                console.log("scrolled to ", pointer + 1);
            });

            audioElement.addEventListener('pause', _ => onaudioPaused(element), true);
            audioElement.addEventListener('ended', onaudioEnded,false);
            audioElement.src = suraDataAudio.ayahs[pointer].audio;
            audioElement.play();
        }

        function onaudioPaused(element: HTMLElement) {
            element.classList.remove("active-sura");
            console.log('paused');
        }   

        function onaudioEnded(){  
            // console.log('ended')
            pointer += 1;
            // setPointer(pointer + 1);
            if (pointer > audioCount-1) {
                pointer = 0;
                // setPointer(0);
                return
            }
            onload();
        } 
        
        onload();
    }

    return (
        <div>
            <h1 className='arabic'>Suratul {suraDataText.name ? suraDataText.name : 'no info'}</h1>
            <button onClick={handlePlay}>Start</button>

            <ReactAudioPlayer id='sura-auto-play' controls />
            { state && suraDataText.ayahs.map((ayahTranslation: {number: number, text: string}, i: number) => {
                    return (
                        <div 
                            className="ayah"
                            key={`${new Date().toLocaleDateString()+i}`} 
                        >
                            <div 
                            style={{padding: "30px 10px", border: "3px solid lightgreen"}}
                            >
                                <p className="arabic" style={{textAlign: "right"}}>
                                    {suraDataAudio.ayahs[i].text}
                                </p>
                                <p className="arabic">
                                    {excludeTafsir(ayahTranslation.text)} 
                                </p>
                            </div>
                        </div>
                    )
            })}
        </div>
    )
}

export default OneSura;

function excludeTafsir(str: string) {
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
