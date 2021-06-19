import React from 'react';
// import NavBar from '../components/NavBar';
import {selectListOfSuras} from '../features/Quran/listOfSurasSlice';
import {  useAppSelector } from '../app/hooks';
import { Link } from 'react-router-dom';

interface SuraType {
    number: number;
    name: string;
    englishName: string;
    englishNameTranslation: string;
    numberOfAyahs: number,
    revelationType: "Meccan" | "Medinan"
}

function Home() {
    const listOfSuras: any[] = useAppSelector(selectListOfSuras);

    React.useEffect(() => {
        // getListOfSuras(); 
        // console.log(listOfSuras);
    }, [])

    return (
        <div>
            {/* <NavBar /> */}
            <h1>Home Component</h1>
            {
                listOfSuras.length > 0 && listOfSuras.map((Sura, index) => {
                    return (
                        <div key={Sura.name_simple} >
                            <Link to={`/sura/${Sura.id}`}>
                                <h2 className='arabic'>{Sura.name_arabic} - {Sura.name_simple}</h2>
                            </Link>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Home;