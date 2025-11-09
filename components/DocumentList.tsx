/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState, useRef } from 'react';
import { RagStore, Document, CustomMetadata } from '../types';
import Spinner from './Spinner';
import UploadIcon from './icons/UploadIcon';
import TrashIcon from './icons/TrashIcon';
import PlusIcon from './icons/PlusIcon';

interface DocumentListProps {
    selectedStore: RagStore | null;
    documents: Document[];
    isLoading: boolean;
    processingFile: string | null;
    onUpload: (file: File, metadata: CustomMetadata[]) => void;
    onDelete: (docName: string) => void;
}

const DocumentList: React.FC<DocumentListProps> = ({ selectedStore, documents, isLoading, processingFile, onUpload, onDelete }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [metadata, setMetadata] = useState<{ key: string, value: string }[]>([{ key: '', value: '' }]);

    const handleUploadClick = () => {
        setIsUploadModalOpen(true);
    };

    const handleModalClose = () => {
        setIsUploadModalOpen(false);
        setSelectedFile(null);
        setMetadata([{ key: '', value: '' }]);
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedFile(file);
        }
    };

    const handleMetadataChange = (index: number, field: 'key' | 'value', text: string) => {
        const newMetadata = [...metadata];
        newMetadata[index][field] = text;
        setMetadata(newMetadata);
    };

    const addMetadataRow = () => {
        setMetadata([...metadata, { key: '', value: '' }]);
    };

    const removeMetadataRow = (index: number) => {
        const newMetadata = metadata.filter((_, i) => i !== index);
        setMetadata(newMetadata);
    };

    const handleConfirmUpload = () => {
        if (!selectedFile) return;
        const formattedMetadata: CustomMetadata[] = metadata
            .filter(m => m.key.trim() !== '')
            .map(m => ({ key: m.key.trim(), stringValue: m.value.trim() }));
        onUpload(selectedFile, formattedMetadata);
        handleModalClose();
    };

    if (!selectedStore) {
        return (
            <div className="flex flex-col h-full items-center justify-center text-center text-gem-offwhite/60">
                <p className="text-lg">Select a RAG Store</p>
                <p>to view and manage its documents.</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold truncate" title={selectedStore.displayName}>Documents</h2>
                <button
                    onClick={handleUploadClick}
                    className="p-2 bg-gem-blue hover:bg-blue-500 rounded-full text-white transition-colors disabled:bg-gem-mist disabled:cursor-not-allowed"
                    disabled={!!processingFile}
                    aria-label="Upload document"
                    title="Upload a new document to this store"
                >
                    <UploadIcon />
                </button>
            </div>
            
            {isUploadModalOpen && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50" role="dialog" aria-modal="true" aria-labelledby="upload-doc-title">
                    <div className="bg-gem-slate p-6 rounded-lg shadow-xl w-full max-w-lg">
                        <h3 id="upload-doc-title" className="text-xl font-bold mb-4">Upload Document</h3>
                        
                        <div className="mb-4">
                            <label htmlFor="file-upload" className="block text-sm font-medium text-gem-offwhite/80 mb-2">File</label>
                            <input
                                id="file-upload"
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                className="w-full text-sm text-gem-offwhite file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gem-blue file:text-white hover:file:bg-blue-500"
                            />
                            {selectedFile && <p className="text-sm mt-2 text-gem-offwhite/70">Selected: {selectedFile.name}</p>}
                        </div>

                        <div className="mb-4">
                            <h4 className="text-sm font-medium text-gem-offwhite/80 mb-2">Custom Metadata (optional)</h4>
                            <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
                                {metadata.map((item, index) => (
                                    <div key={index} className="flex items-center space-x-2">
                                        <input type="text" placeholder="Key" value={item.key} onChange={(e) => handleMetadataChange(index, 'key', e.target.value)} className="w-1/2 bg-gem-mist border border-gem-mist/50 rounded-md py-1 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-gem-blue" />
                                        <input type="text" placeholder="Value" value={item.value} onChange={(e) => handleMetadataChange(index, 'value', e.target.value)} className="w-1/2 bg-gem-mist border border-gem-mist/50 rounded-md py-1 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-gem-blue" />
                                        <button onClick={() => removeMetadataRow(index)} className="p-1 text-red-400 hover:text-red-300 rounded-full" aria-label="Remove metadata row" title="Remove metadata row">
                                            <TrashIcon />
                                        </button>
                                    </div>
                                ))}
                            </div>
                            <button onClick={addMetadataRow} className="mt-2 flex items-center text-sm text-gem-blue hover:text-blue-400" title="Add another metadata field">
                                <PlusIcon /> <span className="ml-1">Add Metadata</span>
                            </button>
                        </div>
                        
                        <div className="flex justify-end space-x-2 mt-6">
                            <button type="button" onClick={handleModalClose} className="px-4 py-2 rounded-md bg-gem-mist hover:bg-gem-mist/70 transition-colors" title="Cancel upload">
                                Cancel
                            </button>
                            <button type="button" onClick={handleConfirmUpload} disabled={!selectedFile} className="px-4 py-2 rounded-md bg-gem-blue hover:bg-blue-500 text-white transition-colors disabled:bg-gem-mist/50 disabled:cursor-not-allowed" title="Upload selected file">
                                Upload
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {processingFile && (
                <div className="mb-4 p-3 bg-gem-mist rounded-md flex items-center">
                    <Spinner />
                    <span className="ml-3">Processing: {processingFile}...</span>
                </div>
            )}
            {isLoading && !documents.length ? (
                <div className="flex-grow flex items-center justify-center">
                    <Spinner />
                </div>
            ) : documents.length === 0 && !processingFile ? (
                <div className="flex-grow flex items-center justify-center text-center text-gem-offwhite/60">
                    <p>No documents found. <br /> Click the upload icon to add one.</p>
                </div>
            ) : (
                <ul className="space-y-2 overflow-y-auto">
                    {documents.map((doc) => (
                        <li key={doc.name} className="p-3 bg-gem-mist rounded-md group">
                             <div className="flex items-center justify-between">
                                <span className="truncate font-medium" title={doc.displayName}>{doc.displayName}</span>
                                <button 
                                    onClick={() => onDelete(doc.name)}
                                    className="ml-2 p-1 text-red-400 hover:text-red-300 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                    aria-label={`Delete ${doc.displayName}`}
                                    title={`Delete ${doc.displayName}`}
                                >
                                <TrashIcon />
                                </button>
                            </div>
                             {doc.customMetadata && doc.customMetadata.length > 0 && (
                                <div className="mt-2 pt-2 border-t border-gem-mist/50 text-xs">
                                    <h4 className="font-semibold text-gem-offwhite/70 mb-1">Metadata:</h4>
                                    <dl className="space-y-1">
                                        {doc.customMetadata.map((meta, index) => (
                                            meta.key && (
                                                <div key={index} className="flex">
                                                    <dt className="w-1/3 font-medium text-gem-offwhite/80 truncate pr-2" title={meta.key}>{meta.key}</dt>
                                                    <dd className="w-2/3 text-gem-offwhite/60 truncate" title={meta.stringValue}>{meta.stringValue}</dd>
                                                </div>
                                            )
                                        ))}
                                    </dl>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default DocumentList;
