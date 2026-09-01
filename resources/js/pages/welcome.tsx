import { Head, Link, useForm } from '@inertiajs/react';
import React, { useState } from 'react';

interface Post {
    id: number;
    title: string;
}

export default function Welcome({ posts }: { posts: Post[] }) {
    const { data, setData, post, processing, reset, errors } = useForm({
        title: '',
    });

    const [editingId, setEditingId] = useState<number | null>(null);
    const [editTitle, setEditTitle] = useState('');

    const handleCreate = (e: React.FormEvent) => {
        e.preventDefault();
        post('/posts', {
            onSuccess: () => reset('title'),
        });
    };

    const startEditing = (item: Post) => {
        setEditingId(item.id);
        setEditTitle(item.title);
    };

    const handleUpdate = (id: number) => {
        router.put(`/posts/${id}`, { title: editTitle }, {
            onSuccess: () => setEditingId(null),
        });
    };

    return (
        <div className="p-6 max-w-md mx-auto">
            <Head title="Welcome" />

            <div className="flex justify-between items-center mb-6">
                <span className="text-gray-700 font-medium">Dashboard Posts</span>
                <div className="flex items-center gap-3">
                    <Link
                        href="/profile"
                        className="px-3 py-1.5 bg-gray-200 text-white rounded-md text-sm font-medium"
                    >
                        Profile
                    </Link>
                    <Link
                        href="/logout"
                        method="post"
                        as="button"
                        className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-md text-sm font-medium transition"
                    >
                        Log Out
                    </Link>
                </div>
            </div>

            {/* Form Create */}
            <form onSubmit={handleCreate} className="mb-6">
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={data.title}
                        onChange={(e) => setData('title', e.target.value)}
                        className="border border-gray-300 rounded px-3 py-2 flex-1"
                    />
                    <button
                        type="submit"
                        disabled={processing}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
                    >
                        Tambah
                    </button>
                </div>
                {errors.title && (
                    <div className="text-red-500 text-sm mt-1">{errors.title}</div>
                )}
            </form>

            {/* Form Update/Delete */}
            <h1 className="text-xl font-bold mb-3">Daftar Post:</h1>
            <ul className="space-y-2">
                {posts.map((item) => (
                    <li key={item.id} className="flex justify-between items-center p-2 bg-gray-50 border rounded">
                        {editingId === item.id ? (
                            <div className="flex gap-2 flex-1 mr-2">
                                <input
                                    type="text"
                                    value={editTitle}
                                    onChange={(e) => setEditTitle(e.target.value)}
                                    className="border rounded px-2 py-1 text-sm flex-1"
                                />
                                <button
                                    onClick={() => handleUpdate(item.id)}
                                    className="bg-green-600 text-black px-2 py-1 rounded text-xs"
                                >
                                    Simpan
                                </button>
                                <button
                                    onClick={() => setEditingId(null)}
                                    className="bg-gray-400 text-black px-2 py-1 rounded text-xs"
                                >
                                    Batal
                                </button>
                            </div>
                        ) : (
                            <>
                                <span className="text-gray-800">• {item.title}</span>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => startEditing(item)}
                                        className="text-xs text-yellow-600 hover:underline"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => router.delete(`/posts/${item.id}`)}
                                        className="text-xs text-red-500 hover:underline"
                                    >
                                        Hapus
                                    </button>
                                </div>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}