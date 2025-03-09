'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import data from './GoogleShoppingProductScraper.json';

function Modal({ show, onClose, card }) {
    if (!show) return null;

    return (
        <div className="modal fade-in">
            <div className="modal_content">
                <span className="close" onClick={onClose}>&times;</span>
                <div className="modal_flex_container">
                    <div className="modal_flex_item_left">
                        {typeof window !== 'undefined' && card && (
                            <Image 
                                src={`/${card.Keyword}.jpg`} 
                                alt={card.Keyword} 
                                width={250} 
                                height={250} 
                                className='card_image_modal' 
                            />
                        )}
                        <h2 className='modal_h2'>{card?.ProductName}</h2>
                    </div>
                    <div className="modal_flex_item_right">
                        <h3 className="vendors_title">Vendors:</h3>
                        <ul className="vendors_list">
                            {data.filter(item => item.ProductName === card?.ProductName).map((vendor, index) => (
                                <li key={index} className="vendor_item">
                                    <a href={vendor.SellerURL} target="_blank" rel="noopener noreferrer" className="vendor_link">
                                        {vendor.Seller} <span style={{ textDecoration: 'underline' }}>Link</span>
                                    </a>
                                    {vendor.ItemPrice && <span className="vendor_price"> - Price: {vendor.ItemPrice}</span>}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function ComparePage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);
    const [filteredData, setFilteredData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);

    const handleSearch = (e) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            const filtered = data.filter(card => {
                const vendors = data.filter(item => item.ProductName === card.ProductName);
                return card.ProductName.toLowerCase().includes(searchTerm.toLowerCase()) &&
                    !card.SellerURL.toLowerCase().includes('ebay') && 
                    !card.SellerURL.includes('tiktok') &&
                    !card.SellerURL.includes('totalwireless') &&
                    !card.ProductName.toLowerCase().includes('case') &&
                    vendors.length >= 2;
            });
            const uniqueFiltered = Array.from(new Set(filtered.map(card => card.ProductName)))
                .map(name => filtered.find(card => card.ProductName === name));
            setFilteredData(uniqueFiltered);
            setLoading(false);
        }, 600);
    };

    const handleCardClick = (card) => {
        setSelectedCard(card);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedCard(null);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div className='search_wrapper'>
                <form onSubmit={handleSearch}>
                    <input
                        type="text"
                        placeholder="Search something to start..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className='search_input'
                    />
                    <button type="submit" className='search_button'>Search</button>
                </form>
            </div>
            <div className='compare_cards'>
                {loading ? (
                    <div>Loading...</div>
                ) : (
                    filteredData.map((card, index) => (
                        <button 
                            key={`${card.ProductName}-${index}`} 
                            className='compare_card' 
                            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                            onClick={() => handleCardClick(card)}
                        >
                            <span>{card.ProductName}</span>
                            <Image 
                                src={`/${card.Keyword}.jpg`} 
                                alt={card.Keyword} 
                                width={150} 
                                height={150} 
                                className='card_image' 
                            />
                        </button>
                    ))
                )}
            </div>
            <Modal show={showModal} onClose={handleCloseModal} card={selectedCard} />
        </div>
    );
}