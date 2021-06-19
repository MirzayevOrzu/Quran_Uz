// not in use for anywhere for now 
import { getDataSuccess} from '../features/Quran/listOfSurasSlice';
import { store } from '../app/store';
import { chapters } from './staticData';

export default function getListOfSuras() {
    store.dispatch(getDataSuccess(chapters))
}


