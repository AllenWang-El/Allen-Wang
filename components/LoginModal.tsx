
import React, { useState } from 'react';
import { USERS } from '../constants';

interface LoginModalProps {
    onClose: () => void;
    onLogin: (username: string) => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ onClose, onLogin }) => {
    const [name, setName] = useState('');
    const [pass, setPass] = useState('');
    const [error, setError] = useState('');

    const handleLogin = () => {
        const user = USERS.find(u => u.name === name && u.pass === pass);
        if (user) {
            onLogin(user.name);
            onClose();
        } else {
            setError('帳號或密碼錯誤');
        }
    };

    return (
        <div className="absolute inset-0 z-[80] flex items-center justify-center bg-black/60 backdrop-blur-sm px-6">
            <div className="bg-white w-full max-w-sm rounded-3xl p-6 shadow-2xl animate-scale-up">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-slate-800">登入專屬帳號</h3>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
                        <i className="fas fa-times text-xl"></i>
                    </button>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="block text-xs font-bold text-slate-500 mb-1">姓名 (帳號)</label>
                        <input 
                            type="text" 
                            value={name} 
                            onChange={e => setName(e.target.value)}
                            placeholder="請輸入姓名" 
                            className="w-full bg-slate-50 p-3 rounded-xl border border-slate-200 focus:border-primary outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-slate-500 mb-1">生日 (密碼)</label>
                        <input 
                            type="password" 
                            value={pass} 
                            onChange={e => setPass(e.target.value)}
                            placeholder="西元年月日八碼 (如: 19910618)" 
                            className="w-full bg-slate-50 p-3 rounded-xl border border-slate-200 focus:border-primary outline-none"
                        />
                    </div>

                    {error && <p className="text-red-500 text-xs text-center font-bold">{error}</p>}

                    <button 
                        onClick={handleLogin}
                        className="w-full bg-primary text-white py-3 rounded-xl font-bold shadow-lg hover:bg-teal-700 transition-colors mt-2"
                    >
                        登入
                    </button>
                    
                    <div className="text-center text-[10px] text-slate-400 mt-4">
                        * 僅供家庭成員使用
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginModal;
