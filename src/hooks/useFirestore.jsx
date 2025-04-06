import { useEffect, useState } from 'react';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../components/firebase/config';

const useFirestore = (collectionName, condition) => {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    // Kiểm tra nếu condition không tồn tại hoặc thiếu giá trị so sánh
    if (!condition || !condition.compareValue || 
       (Array.isArray(condition.compareValue) && condition.compareValue.length === 0)) {
      setDocuments([]);
      return;
    }

    // Tạo query Firestore
    const q = query(
      collection(db, collectionName),
      where(condition.fieldName, condition.operator, condition.compareValue)
    );

    // Lắng nghe dữ liệu từ Firestore
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setDocuments(data);
    });

    return () => unsubscribe();
  }, [collectionName, condition]);

  return documents;
};

export default useFirestore;
