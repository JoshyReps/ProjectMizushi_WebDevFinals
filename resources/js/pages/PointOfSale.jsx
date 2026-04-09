import { router } from '@inertiajs/react';
import { useState } from 'react';
import BatchList from '../PointOfSale/BatchList';
import CurrentSale from '../PointOfSale/CurrentSale';
import OrderSummary from '../PointOfSale/OrderSummary';
import SmartSearch from '../PointOfSale/SmartSearch';
import AppLayout from '../layouts/AppLayout';

export default function PointOfSale({ batches = [] }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [cart, setCart] = useState([]);
    const [discountType, setDiscountType] = useState('Senior Citizen');

    const handleAddToCart = (batch) => {
        setCart((prev) => {
            const existing = prev.find((item) => item.batch_id === batch.batch_id);
            if (existing) {
                if (existing.cartQty >= batch.quantity) return prev;
                return prev.map((item) => (item.batch_id === batch.batch_id ? { ...item, cartQty: item.cartQty + 1 } : item));
            }
            return [...prev, { ...batch, cartQty: 1 }];
        });
    };

    const handleUpdateQty = (batch_id, delta) => {
        setCart((prev) =>
            prev.map((item) => {
                if (item.batch_id === batch_id) {
                    const newQty = item.cartQty + delta;
                    if (newQty < 1) return item;
                    if (newQty > item.quantity) return item;
                    return { ...item, cartQty: newQty };
                }
                return item;
            }),
        );
    };

    const handleRemoveFromCart = (batch_id) => {
        setCart((prev) => prev.filter((item) => item.batch_id !== batch_id));
    };

    const processCheckout = (financials) => {
        router.post(
            '/pos/checkout',
            {
                cart: cart,
                discount_type: discountType,
                subtotal: financials.subtotal,
                discount_amount: financials.discountAmount,
                tax_amount: financials.tax,
                platform_fee: financials.platformFee,
                total_amount: financials.total,
            },
            {
                onSuccess: () => {
                    alert('Transaction saved successfully!');
                    setCart([]);
                    setSearchQuery('');
                },
            },
        );
    };

    return (
        <div className="min-h-screen bg-[#f1f4f9] p-6 font-sans text-gray-800">
            <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 lg:grid-cols-3">
                <div className="flex flex-col space-y-6 lg:col-span-2">
                    <SmartSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} batches={batches} onAdd={handleAddToCart} />
                    <BatchList batches={batches} onAdd={handleAddToCart} />
                </div>
                <div className="flex flex-col lg:col-span-1">
                    <CurrentSale
                        cart={cart}
                        updateQty={handleUpdateQty}
                        removeFromCart={handleRemoveFromCart}
                        discountType={discountType}
                        setDiscountType={setDiscountType}
                    />
                    <div className="flex-1">
                        <OrderSummary cart={cart} discountType={discountType} onCheckout={processCheckout} />
                    </div>
                </div>
            </div>
        </div>
    );
}

PointOfSale.layout = (page) => <AppLayout children={page} />;
