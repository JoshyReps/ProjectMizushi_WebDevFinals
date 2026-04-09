import { useForm } from '@inertiajs/react';

export default function Login() {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post('/login');
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-[#ebf0f4]">
            <div className="w-112.5 rounded-xl rounded-tr-[13rem] bg-white p-10 shadow-2xl">
                <div className="mb- mb-10 h-27.5 w-27.5">
                    <img src="/images/logo.svg" alt="" />
                </div>

                <h2 className="mb-2 text-2xl font-bold text-[#1f6057]">Welcome Back!</h2>

                <h3 className="mb-8 text-gray-500">Please sign in to your account</h3>

                <form onSubmit={submit} className="space-y-4">
                    <div>
                        <label className="text-primary-900 mb-3 block text-sm font-medium text-[#1f6057]">Email Address</label>
                        <input
                            type="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            className="mt-1 w-full rounded-md border border-gray-300 p-2 shadow-lg outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="staff@mizushi.com"
                        />
                        {errors.email && <div className="mt-1 text-xs text-red-500">{errors.email}</div>}
                    </div>

                    <div>
                        <label className="text-primary-900 block text-sm font-medium text-[#1f6057]">Password</label>
                        <input
                            type="password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            className="mt-1 w-full rounded-md border border-gray-300 p-2 shadow-lg outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="••••••••"
                        />
                        {errors.password && <div className="mt-1 text-xs text-red-500">{errors.password}</div>}
                    </div>

                    <button
                        type="submit"
                        disabled={processing}
                        className="hover:[#1f6069] mt-5 mb-5 w-full rounded-full bg-[#1f6057] py-3.5 text-white transition hover:cursor-pointer disabled:opacity-50"
                    >
                        {processing ? 'Signing in...' : 'Sign In'}
                    </button>
                </form>
            </div>
        </div>
    );
}
