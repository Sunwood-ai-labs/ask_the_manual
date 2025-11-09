/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState } from 'react';
import { RagStore, QueryResult } from '../types';
import Spinner from './Spinner';
import SendIcon from './icons/SendIcon';

interface QueryInterfaceProps {
    selectedStore: RagStore | null;
    isLoading: boolean;
    result: QueryResult | null;
    onQuery: (query: string) => void;
}

const QueryInterface: React.FC<QueryInterfaceProps> = ({ selectedStore, isLoading, result, onQuery }) => {
    const [query, setQuery] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            onQuery(query);
            setQuery('');
        }
    };
    
    if (!selectedStore) {
        return (
            <div className="flex flex-col h-full items-center justify-center text-center text-gem-offwhite/60">
                 <p className="text-lg">Select a RAG Store</p>
                <p>to start asking questions.</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full">
            <h2 className="text-xl font-bold mb-4">Query: {selectedStore.displayName}</h2>
            <div className="flex-grow overflow-y-auto mb-4 pr-2 space-y-6">
                 {isLoading && (
                    <div className="flex items-center justify-center p-4">
                        <Spinner /> <span className="ml-3">Searching...</span>
                    </div>
                )}
                {result && (
                    <div>
                        <div className="bg-gem-mist p-4 rounded-lg">
                            <h3 className="font-semibold text-gem-teal mb-2">Answer</h3>
                            <p className="whitespace-pre-wrap">{result.text}</p>
                        </div>
                        {result.groundingChunks.length > 0 && (
                             <div className="mt-4">
                                <h3 className="font-semibold text-gem-teal mb-2">Sources</h3>
                                <div className="space-y-2">
                                {result.groundingChunks.map((chunk, index) => (
                                    chunk.retrievedContext?.text && (
                                        <details key={index} className="bg-gem-mist/50 p-3 rounded-lg text-sm">
                                            <summary className="cursor-pointer font-medium">Source Chunk {index + 1}</summary>
                                            <p className="mt-2 text-gem-offwhite/80">{chunk.retrievedContext.text}</p>
                                        </details>
                                    )
                                ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}
                 {!result && !isLoading && (
                    <div className="flex h-full items-center justify-center text-gem-offwhite/60">
                        <p>Ask a question about the documents.</p>
                    </div>
                )}
            </div>
            <form onSubmit={handleSubmit} className="flex items-center space-x-2">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Ask a question..."
                    className="flex-grow bg-gem-mist border border-gem-mist/50 rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-gem-blue"
                    disabled={isLoading}
                />
                <button type="submit" disabled={isLoading || !query.trim()} className="p-3 bg-gem-blue rounded-full text-white disabled:bg-gem-mist transition-colors" title="Send query">
                    <SendIcon />
                </button>
            </form>
        </div>
    );
};

export default QueryInterface;