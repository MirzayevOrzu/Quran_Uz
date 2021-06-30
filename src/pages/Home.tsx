import React from 'react';
// import NavBar from '../components/NavBar';
import { selectListOfSuras } from '../features/listOfSurasSlice';
import { selectCurReciter, selectReciters, setCurrentReciter } from '../features/reciterSlice';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import AyahCard from '../components/AyahCard';
// mui components
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';


function Home() {
    const dispatch = useAppDispatch();
    const listOfSuras: any[] = useAppSelector(selectListOfSuras);
    const reciters = useAppSelector(selectReciters);

    React.useEffect(() => {
        // getListOfSuras(); 
        // console.log(listOfSuras);
    }, [])

    return (
        <Container maxWidth="md">
            <h1>Home Component</h1>

            <Grid
                container
                spacing={2}
            >
                {
                    listOfSuras.length > 0 && listOfSuras.map((data, index) => {
                        return (
                            <Grid item xs={12} sm={6} md={4}>
                                <AyahCard
                                    data={data}
                                />
                            </Grid>
                        )
                    })
                }
            </Grid>
            {
                reciters.map(reciter => (
                    <div key={reciter.identifier} onClick={() => dispatch(setCurrentReciter(reciter.identifier))}>
                        {reciter.englishName}
                    </div>
                ))
            }
        </Container>
    )
}

export default Home;