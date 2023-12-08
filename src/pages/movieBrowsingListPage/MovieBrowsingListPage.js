import React, { useState } from 'react';
import './MovieBrowsingListPage.css'

const MovieBrowsingListPage = () => {

    return (
        <div className="new-list-creator-container">
            <h1 className="new-list-creator-header">Create a new list</h1>
            <button className="panel-create-list-button" onClick={handleCreateCollection}>Create a list</button>
            {/* Вывод элементов */}
            <ul>
                {collection.map(item => (
                    <li key={item.id}>{item.name} - Дата создания: {item.dateCreated} - Лайки: {item.likes}</li>
                ))}
            </ul>
        </div>
    );
};

export default MovieBrowsingListPage;
