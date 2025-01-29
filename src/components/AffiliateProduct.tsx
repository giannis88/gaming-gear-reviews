import * as React from 'react';
import { useState, useCallback } from 'react';
import { createAffiliateLink } from '../utils/affiliate';
import { useCompare } from '../context/CompareContext';
import { products } from '../data/products';
import '../styles/AffiliateProduct.css';

interface AffiliateProductProps {
    productId: string;
    title: string;
    price: string;
    imageUrl: string;
    category: string;
    onQuickViewClick: (product: any) => void;
}

export const AffiliateProduct: React.FC<AffiliateProductProps> = ({
    productId,
    title,
    price,
    imageUrl,
    category,
    onQuickViewClick
}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [retryCount, setRetryCount] = useState(0);
    const { compareList, addToCompare, removeFromCompare } = useCompare();
    const product = products.find(p => p.productId === productId)!;
    const isInCompare = compareList.some(p => p.id === product.id);
    const affiliateLink = createAffiliateLink(productId);

    const handleQuickView = useCallback(async (e: React.MouseEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        try {
            await onQuickViewClick(product);
            setRetryCount(0);
        } catch (err) {
            setError(retryCount >= 2 
                ? 'Unable to load quick view. Please try again later.' 
                : 'Failed to load quick view. Click to retry.'
            );
            setRetryCount(count => count + 1);
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }, [product, onQuickViewClick, retryCount]);
    
    return (
        <div className="affiliate-product" data-category={category}>
            {error && (
                <div 
                    className="error-message" 
                    role="alert"
                    onClick={retryCount < 3 ? handleQuickView : undefined}
                    style={{ cursor: retryCount < 3 ? 'pointer' : 'default' }}
                >
                    {error}
                </div>
            )}
            <a href={affiliateLink} target="_blank" rel="noopener noreferrer">
                <img src={imageUrl} alt={title} />
                <h3>{title}</h3>
                <p className="price">{price}</p>
                <div className="rating">
                    {'★'.repeat(Math.floor(product.rating))}
                    {'☆'.repeat(5 - Math.floor(product.rating))}
                </div>
                <button className="view-on-amazon">View on Amazon</button>
            </a>
            <button
                className={`compare-toggle ${isInCompare ? 'active' : ''}`}
                onClick={(e) => {
                    e.preventDefault();
                    isInCompare ? removeFromCompare(product.id) : addToCompare(product);
                }}
            >
                {isInCompare ? 'Remove from Compare' : 'Add to Compare'}
            </button>
            <button 
                className={`quick-view-button ${isLoading ? 'loading' : ''}`}
                onClick={handleQuickView}
                disabled={isLoading}
                aria-busy={isLoading}
                aria-label={`Quick view ${title}`}
            >
                <span className="button-text">{isLoading ? 'Loading...' : 'Quick View'}</span>
                {isLoading && <span className="loading-spinner" aria-hidden="true" />}
            </button>
        </div>
    );
};
