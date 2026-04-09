import { DISCOUNTS } from '../utils/data';

export default function OrderSummary({ cart, discountType, onCheckout }) {
    const subtotal = cart.reduce((sum, item) => sum + Number(item.medicine?.selling_price) * item.cartQty, 0);
    const discountRate = DISCOUNTS[discountType] || 0;
    const discountAmount = subtotal * discountRate;
    const tax = subtotal * 0.12;
    const platformFee = cart.length > 0 ? 1.0 : 0;
    const total = subtotal - discountAmount + tax + platformFee;

    return (
        <div className="flex flex-col justify-between rounded-2xl bg-white p-6 shadow-sm">
            <div>
                <h3 className="mb-4 font-bold text-gray-800">Summary</h3>
                <div className="space-y-3 text-sm text-gray-600">
                    <div className="flex justify-between">
                        <span>Subtotal :</span>
                        <span className="font-medium text-gray-800">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Discount ({discountType}) :</span>
                        <span className="font-medium text-gray-800">-${discountAmount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Tax (12%) :</span>
                        <span className="font-medium text-gray-800">${tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Platform Fee :</span>
                        <span className="font-medium text-gray-800">${platformFee.toFixed(2)}</span>
                    </div>
                    <div className="mt-2 flex justify-between border-t border-gray-100 pt-4 text-lg font-bold text-gray-900">
                        <span>Total :</span>
                        <span>${total.toFixed(2)}</span>
                    </div>
                </div>
            </div>

            <button
                disabled={cart.length === 0}
                onClick={() => onCheckout({ subtotal, discountAmount, tax, platformFee, total })}
                className="mt-6 w-full rounded-lg bg-[#8b79c0] py-3 font-medium text-white shadow-sm transition-colors hover:bg-[#7a68af] disabled:cursor-not-allowed disabled:bg-gray-300"
            >
                Print Receipt
            </button>
        </div>
    );
}
