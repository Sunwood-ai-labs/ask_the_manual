/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState } from 'react';
import { RagStore } from '../types';
import Spinner from './Spinner';
import PlusIcon from './icons/PlusIcon';
import TrashIcon from './icons/TrashIcon';
import RefreshIcon from './icons/RefreshIcon';

interface RagStoreListProps {
    stores: RagStore[];
    selectedStore: RagStore | null;
    isLoading: boolean;
    onCreate: (displayName: string) => void;
    onSelect: (store: RagStore) => void;
    onDelete: (storeName: string) => void;
    onRefresh: () => void;
}

const RagStoreList: React.FC<RagStoreListProps> = ({ stores, selectedStore, isLoading, onCreate, onSelect, onDelete, onRefresh }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newStoreName, setNewStoreName] = useState('');

    const handleCreateClick = () => {
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        setNewStoreName('');
    };

    const handleConfirmCreate = (e: React.FormEvent) => {
        e.preventDefault();
        if (newStoreName.trim()) {
            onCreate(newStoreName.trim());
            handleModalClose();
        }
    };


    return (
        <div className="flex flex-col h-full">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">RAG Stores</h2>
                <div className="flex items-center space-x-2">
                     <button
                        onClick={onRefresh}
                        className="p-2 bg-gem-mist hover:bg-gem-mist/70 rounded-full text-white transition-colors disabled:bg-gem-mist"
                        disabled={isLoading}
                        aria-label="Refresh RAG stores"
                        title="Refresh the list of RAG stores"
                    >
                        <RefreshIcon />
                    </button>
                    <button
                        onClick={handleCreateClick}
                        className="p-2 bg-gem-blue hover:bg-blue-500 rounded-full text-white transition-colors disabled:bg-gem-mist"
                        disabled={isLoading}
                        aria-label="Create new RAG store"
                        title="Create a new RAG store"
                    >
                        <PlusIcon />
                    </button>
                </div>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50" role="dialog" aria-modal="true" aria-labelledby="create-store-title">
                    <div className="bg-gem-slate p-6 rounded-lg shadow-xl w-full max-w-md">
                        <h3 id="create-store-title" className="text-xl font-bold mb-4">Create New RAG Store</h3>
                        <form onSubmit={handleConfirmCreate}>
                            <label htmlFor="store-name" className="sr-only">Store Name</label>
                            <input
                                id="store-name"
                                type="text"
                                value={newStoreName}
                                onChange={(e) => setNewStoreName(e.target.value)}
                                placeholder="Enter store name"
                                className="w-full bg-gem-mist border border-gem-mist/50 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-gem-blue mb-4"
                                autoFocus
                            />
                            <div className="flex justify-end space-x-2">
                                <button
                                    type="button"
                                    onClick={handleModalClose}
                                    className="px-4 py-2 rounded-md bg-gem-mist hover:bg-gem-mist/70 transition-colors"
                                    title="Cancel store creation"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={!newStoreName.trim()}
                                    className="px-4 py-2 rounded-md bg-gem-blue hover:bg-blue-500 text-white transition-colors disabled:bg-gem-mist/50 disabled:cursor-not-allowed"
                                    title="Create new RAG store"
                                >
                                    Create
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {isLoading && !stores.length ? (
                <div className="flex-grow flex items-center justify-center">
                    <Spinner />
                </div>
            ) : stores.length === 0 ? (
                <div className="flex-grow flex items-center justify-center text-center text-gem-offwhite/60">
                    <p>No RAG stores found. <br /> Click the '+' to create one.</p>
                </div>
            ) : (
                <ul className="space-y-2 overflow-y-auto">
                    {stores.map((store) => (
                        <li key={store.name} className="flex items-center justify-between group">
                            <button
                                onClick={() => onSelect(store)}
                                className={`w-full text-left p-3 rounded-md transition-colors text-lg ${
                                    selectedStore?.name === store.name
                                        ? 'bg-gem-blue text-white'
                                        : 'bg-gem-mist hover:bg-gem-mist/70'
                                }`}
                                title={`Select ${store.displayName} to view its documents`}
                            >
                                {store.displayName}
                            </button>
                            <button 
                                onClick={(e) => { e.stopPropagation(); onDelete(store.name); }}
                                className="ml-2 p-2 text-red-400 hover:text-red-300 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                aria-label={`Delete ${store.displayName}`}
                                title={`Delete ${store.displayName}`}
                            >
                               <TrashIcon />
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default RagStoreList;
