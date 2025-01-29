import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import { Product } from '../data/products';
import { createAffiliateLink } from '../utils/affiliate';
import '../styles/ProductQuickView.css';

interface ProductQuickViewProps {
    product: Product;
    onClose: () => void;
}

export const ProductQuickView: React.FC<ProductQuickViewProps> = ({ product, onClose }) => {
    const [imageLoaded, setImageLoaded] = useState(false);
    const modalRef = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [onClose]);

    useEffect(() => {
        const focusableElements = modalRef.current?.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements?.[0] as HTMLElement;
        firstElement?.focus();

        const handleTab = (e: KeyboardEvent) => {
            if (!focusableElements || focusableElements.length === 0) return;
            const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;
            
            if (e.key === 'Tab') {
                if (e.shiftKey && document.activeElement === firstElement) {
                    e.preventDefault();
                    lastElement.focus();
                } else if (!e.shiftKey && document.activeElement === lastElement) {
                    e.preventDefault();
                    firstElement.focus();
                }
            }
        };

        document.addEventListener('keydown', handleTab);
        return () => document.removeEventListener('keydown', handleTab);
    }, []);

    if (!product) return null;

    const formattedPrice = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(parseFloat(product.price));

    return (
        <div 
            className="product-quickview-overlay" 
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-labelledby="quickview-title"
        >
            <div 
                ref={modalRef}
                className="product-quickview-modal" 
                onClick={(e) => e.stopPropagation()}
            >
                <button 
                    className="close-button" 
                    onClick={onClose}
                    aria-label="Close quick view"
                >
                    &times;
                </button>
                <div className="product-content">
                    {!imageLoaded && (
                        <div className="image-placeholder" aria-hidden="true">
                            Loading...
                        </div>
                    )}
                    <img 
                        src={product.imageUrl} 
                        alt={product.title}
                        className={`product-image ${imageLoaded ? 'loaded' : ''}`}
                        onLoad={() => setImageLoaded(true)}
                    />
                    <div className="product-details">
                        <h2 id="quickview-title">{product.title}</h2>
                        <p className="price">{formattedPrice}</p>
                        <div className="rating">
                            {'★'.repeat(Math.floor(product.rating))}
                            {'☆'.repeat(5 - Math.floor(product.rating))}
                        </div>
                        <p className="description">{product.description}</p>
                        <a
                            href={createAffiliateLink(product.productId)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="affiliate-link"
                        >
                            View on Amazon
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};