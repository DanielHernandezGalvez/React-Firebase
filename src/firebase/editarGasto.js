import {db} from './firebaseConfig';
import {doc, updateDoc} from 'firebase/firestore';

const editarGasto = async({id, categoria, descripcion, cantidad, fecha}) => {
	const documento = doc(db, 'gastos', id);
	return await updateDoc(documento, {
		categoria: categoria,
		descripcion: descripcion,
		cantidad: Number(cantidad),
		fecha: fecha
	});
}

export default editarGasto;