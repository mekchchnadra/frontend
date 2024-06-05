import React, { useState, useEffect } from 'react';
import axiosInstance from "@/api/host";

interface Item {
    id: number;
    name: string;
}

const Foxian: React.FC = () => {
    const [items, setItems] = useState<Item[]>([]);
    const [newItemName, setNewItemName] = useState<string>('');
    const [editItemId, setEditItemId] = useState<number | null>(null);
    const [editedItemName, setEditedItemName] = useState<string>('');

    useEffect(() => {
        axiosInstance.get<Item[]>("api/v1/details/get-all-foxian-names")
            .then(response => {
                if (!response.data) {
                    throw new Error('No data received');
                }
                setItems(response.data);
            })
            .catch(error => console.error('Error fetching foxians:', error));
    }, []);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (newItemName.trim() !== '') {
            const newItem = { name: newItemName.trim() };

            axiosInstance.post<Item>("api/v1/user/submit-foxian", newItem)
                .then(response => {
                    if (!response.data) {
                        throw new Error('Network response was not ok');
                    }
                    setItems(prevState => [...prevState, response.data]);
                    setNewItemName('');
                    window.alert('Foxian added successfully');
                })
                .catch(error => {
                    console.error('Error adding foxian:', error);
                    window.alert('Error adding foxian');
                });
        }
    };

    const handleDeleteItem = (id: number) => {
        const updatedItems = items.filter(item => item.id !== id);
        setItems(updatedItems);
    };

    const handleEditItem = (id: number) => {
        const updatedItems = items.map(item => {
            if (item.id === id) {
                return { ...item, name: editedItemName };
            }
            return item;
        });
        setItems(updatedItems);
        setEditItemId(null); // Exit editing mode
    };

    return (
        <div>
            <h1>Foxian Management</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={newItemName}
                    onChange={e => setNewItemName(e.target.value)}
                    placeholder="Enter foxian name"
                />
                <button type="submit">Add Foxian</button>
            </form>
            <ul>
                {items.map(item => (
                    <li key={item.id}>
                        <div>
                            {editItemId === item.id ? (
                                <>
                                    <input
                                        type="text"
                                        value={editedItemName}
                                        onChange={e => setEditedItemName(e.target.value)}
                                        onBlur={() => handleEditItem(item.id)}
                                    />
                                    <button onClick={() => handleEditItem(item.id)}>Save</button>
                                </>
                            ) : (
                                <>
                                    {item.name}
                                    <button onClick={() => {
                                        setEditedItemName(item.name);
                                        setEditItemId(item.id);
                                    }}>Edit</button>
                                    <button onClick={() => handleDeleteItem(item.id)} style={{ marginLeft: '5px' }}>Delete</button>
                                </>
                            )}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Foxian;
