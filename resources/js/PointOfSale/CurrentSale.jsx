import { DISCOUNTS } from '../utils/data';

export default function CurrentSale({ cart, updateQty, removeFromCart, discountType, setDiscountType }) {
    const totalItems = cart.reduce((sum, item) => sum + item.cartQty, 0);

    return (
        <div className="mb-4 rounded-2xl bg-white p-4 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
                <div>
                    <h3 className="font-bold text-gray-800">Current Sale :</h3>
                    <span className="text-xs text-gray-500">{totalItems} items in cart</span>
                </div>
                <div className="flex items-center space-x-2 text-xs">
                    <span className="text-gray-600">Discount :</span>
                    <select
                        value={discountType}
                        onChange={(e) => setDiscountType(e.target.value)}
                        className="rounded border border-gray-300 px-2 py-1 outline-none focus:border-indigo-500"
                    >
                        {Object.keys(DISCOUNTS).map((key) => (
                            <option key={key} value={key}>
                                {key}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="max-h-75 space-y-3 overflow-y-auto pr-2">
                {cart.length === 0 && <p className="py-4 text-center text-sm text-gray-400">Cart is empty</p>}

                {cart.map((item) => (
                    <div key={item.batch_id} className="flex items-center justify-between border-b border-gray-50 pb-2">
                        <div className="flex items-center space-x-3">
                            <img
                                src={item.medicine?.image_url || 'https://via.placeholder.com/150'}
                                alt={item.medicine?.med_name}
                                className="h-10 w-10 rounded object-cover"
                            />
                            <div>
                                <h4 className="text-sm leading-none font-bold text-gray-800">
                                    {item.medicine?.med_name} <span className="text-[10px] font-normal text-gray-500">({item.batch_number})</span>
                                </h4>

                                <p className="mt-1 text-[10px] text-gray-500">Price : ${Number(item.medicine?.selling_price).toFixed(2)}/piece</p>
                                <p className="text-xs font-medium text-gray-600">${(item.medicine?.selling_price * item.cartQty).toFixed(2)}</p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-2">
                            <button onClick={() => updateQty(item.batch_id, -1)} className="px-1 font-bold text-gray-500 hover:text-indigo-600">
                                -
                            </button>
                            <span className="w-4 text-center text-sm">{item.cartQty}</span>
                            <button
                                onClick={() => updateQty(item.batch_id, 1)}
                                disabled={item.cartQty >= item.quantity}
                                className={`px-1 font-bold ${item.cartQty >= item.quantity ? 'text-gray-300' : 'text-gray-500 hover:text-indigo-600'}`}
                            >
                                +
                            </button>
                            <button onClick={() => removeFromCart(item.batch_id)} className="ml-2 rounded p-1 text-red-500 hover:bg-red-50">
                                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                    ></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
