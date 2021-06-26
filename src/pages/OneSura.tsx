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
                console.log(res.data.data);
                setSuraDataAudio(res.data.data);    
            }
            axios.get(`https://api.alquran.cloud/v1/surah/${params.id}/uz.sodik`)
            .then(res => {
                if(relevant) {
                    console.log(res.data.data);
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

    const handleScroll = (i: number) => {
        let doc = document.getElementsByClassName("ayah")[i];
        scrollTo(doc, { top: 200, easing: 'ease-in-out' }).then(function () {
            // scrolled down 200 pixels, easing on beginning and end
            console.log("scrolled")
        })
    }
 
    const handlePlay = () => {
        var pointer = 0;
        var audioCount = suraDataAudio.ayahs.length;
        var audioElement = document.getElementById("sura-auto-play") as HTMLAudioElement;
        
        function onload(){
            var myElement: any = document.body.getElementsByClassName('ayah')[pointer];
           
            scrollIntoView(myElement, document.body, { behavior: 'smooth'}).then(
                function () {
                    console.log('scrolled to ayah - ' + pointer);
                }
            );
           
            scrollTo(document.body, { top: window.innerHeight / 2 }).then(function () {
                console.log("scrolling middle");
            });

            audioElement.addEventListener('pause', onaudioPaused, true);
            audioElement.addEventListener('ended',onaudioEnded,false);
            audioElement.src = suraDataAudio.ayahs[pointer].audio;
            audioElement.play();
        }
        
        function onaudioPaused(e: any) {
            console.log('paused');
            // audioElement.removeEventListener('ended', onaudioEnded);
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

            <ReactAudioPlayer id='sura-auto-play' />
            { state && suraDataText.ayahs.map((ayahTranslation: {number: number, text: string}, i: number) => {
                    return (
                    <div 
                    className={`ayah`}  
                    key={new Date().toLocaleDateString() + i} 
                    style={{padding: "30px 10px", border: "3px solid lightgreen"}}
                    >
                        <p className="arabic" style={{textAlign: "right"}}>
                        {suraDataAudio.ayahs[i].text}
                        </p>
                        <button onClick={() => handleScroll(i)}>Scroll</button>
                        <p className="arabic">
                          {excludeTafsir(ayahTranslation.text)} 
                        </p>
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
