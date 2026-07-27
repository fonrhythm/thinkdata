import { collection, addDoc, query, where, getDocs, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { db } from './firebase';
import { Note } from '../types';

export const noteService = {
  async createNote(note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>) {
    const docRef = await addDoc(collection(db, 'notes'), {
      ...note,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return docRef.id;
  },

  async getNotesByDrama(userId: string, dramaId: string) {
    const q = query(
      collection(db, 'notes'),
      where('userId', '==', userId),
      where('dramaId', '==', dramaId)
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Note[];
  },

  async updateNote(noteId: string, data: Partial<Note>) {
    await updateDoc(doc(db, 'notes', noteId), {
      ...data,
      updatedAt: new Date(),
    });
  },

  async deleteNote(noteId: string) {
    await deleteDoc(doc(db, 'notes', noteId));
  },
};
