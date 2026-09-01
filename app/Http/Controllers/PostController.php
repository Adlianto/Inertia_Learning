<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PostController extends Controller
{
    use AuthorizesRequests;

    public function index()
    {
        $posts = auth()->user()->posts()->latest()->get();

        return Inertia::render('welcome', [
            'posts' => $posts
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
        ]);

        auth()->user()->posts()->create($validated);

        return redirect()->back();
    }

    public function update(Request $request, Post $post)
    {
        $this->authorize('update', $post);

        $validated = $request->validate([
            'title' => 'required|string|max:255',
        ]);

        $post->update($validated);

        return redirect()->back();
    }

    public function destroy(Post $post)
    {
        $this->authorize('delete', $post);

        $post->delete();

        return redirect()->back();
    }
}