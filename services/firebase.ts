// Mock Firebase using LocalStorage to fix compilation errors and allow offline usage when firebase module is missing or incompatible.

// Event bus for local updates
const listeners: Record<string, Function[]> = {};

const notify = (collectionName: string) => {
    if (listeners[collectionName]) {
        const data = getLocalData(collectionName);
        const snapshot = {
            docs: data.map(item => ({
                id: item.id,
                data: () => item,
                ref: { path: collectionName, id: item.id }
            }))
        };
        listeners[collectionName].forEach(cb => cb(snapshot));
    }
};

const getLocalData = (col: string): any[] => {
    try {
        return JSON.parse(localStorage.getItem(`fb_${col}`) || '[]');
    } catch { return []; }
};

const setLocalData = (col: string, data: any[]) => {
    localStorage.setItem(`fb_${col}`, JSON.stringify(data));
    notify(col);
};

export const db = {}; // Mock DB object

export const collection = (db: any, name: string) => {
    return { type: 'collection', path: name };
};

export const getDocs = async (ref: any) => {
    const data = getLocalData(ref.path);
    return {
        docs: data.map(item => ({
            id: item.id,
            data: () => item,
            ref: { path: ref.path, id: item.id }
        }))
    };
};

export const onSnapshot = (ref: any, callback: Function) => {
    const col = ref.path;
    if (!listeners[col]) listeners[col] = [];
    listeners[col].push(callback);
    
    // Initial call
    const data = getLocalData(col);
    callback({
        docs: data.map(item => ({
            id: item.id,
            data: () => item,
            ref: { path: col, id: item.id }
        }))
    });
    
    return () => {
        listeners[col] = listeners[col].filter(cb => cb !== callback);
    };
};

export const addDoc = async (ref: any, data: any) => {
    const col = ref.path;
    const items = getLocalData(col);
    const newItem = { id: String(Date.now()) + Math.random().toString(36).substr(2, 5), ...data };
    items.push(newItem);
    setLocalData(col, items);
    return { id: newItem.id };
};

export const updateDoc = async (ref: any, data: any) => {
    // ref is created via doc(db, col, id)
    const { path: col, id } = ref;
    const items = getLocalData(col);
    const idx = items.findIndex((i: any) => String(i.id) === String(id));
    if (idx !== -1) {
        items[idx] = { ...items[idx], ...data };
        setLocalData(col, items);
    }
};

export const deleteDoc = async (ref: any) => {
    const { path: col, id } = ref;
    const items = getLocalData(col);
    const newItems = items.filter((i: any) => String(i.id) !== String(id));
    setLocalData(col, newItems);
};

export const doc = (db: any, col: string, id: string) => {
    return { type: 'doc', path: col, id };
};

export const writeBatch = (db: any) => {
    const operations: Function[] = [];
    return {
        delete: (ref: any) => {
            operations.push(() => deleteDoc(ref));
        },
        commit: async () => {
            for (const op of operations) await op();
        }
    };
};