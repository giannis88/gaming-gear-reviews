import * as React from 'react';
import { useCompare } from '../context/CompareContext';
import { Link } from 'react-router-dom';
import '../styles/CompareDrawer.css';

export const CompareDrawer: React.FC = () => {
    const { compareList, removeFromCompare, clearCompare } = useCompare();

    if (compareList.length === 0) return null;

    return (
        <div className="compare-drawer">
            <div className="compare-header">
                <h3>Compare Products ({compareList.length}/3)</h3>
                <button onClick={clearCompare} className="clear-button">Clear All</button>
            </div>
            <div className="compare-items">
                {compareList.map(product => (
                    <div key={product.id} className="compare-item">
                        <img src={product.imageUrl} alt={product.title} />
                        <p>{product.title}</p>
                        <button onClick={() => removeFromCompare(product.id)}>Remove</button>
                    </div>
                ))}
            </div>
            {compareList.length >= 2 && (
                <Link to="/compare" className="compare-button">Compare Now</Link>
            )}
        </div>
    );
};