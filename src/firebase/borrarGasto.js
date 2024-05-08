import {db} from './firebaseConfig';
import {doc, deleteDoc} from 'firebase/firestore';

const borrarGasto = async(id) => {
	await deleteDoc(doc(db, 'gastos', id));
}

export default borrarGasto;