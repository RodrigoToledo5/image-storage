// app/api/data/route.js
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../libs/firebase'

export async function GET() {
  const TAG = 'images'
  try {
    const querySnapshot = await getDocs(collection(db, TAG));
    const data = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch data' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
