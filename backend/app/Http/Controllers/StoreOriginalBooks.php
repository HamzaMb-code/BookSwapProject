<?php

namespace App\Http\Controllers;

use App\Models\Book;
use Illuminate\Http\Request;

class StoreOriginalBooks extends Controller
{
    public function StoreOriginalBooks()
    {
        $books = [
            [
                "title" => "The Underground Railroad",
                "author" => "Colson Whitehead",
                "description" => "A historical novel about a runaway slave's escape on the Underground Railroad.",
                "category" => "Historical Fiction",
                "image" => asset('storage/booksImage/The-Underground-Railroad.jpg'),
                "student_id" => 1
            ],
            [
                "title" => "A Tale of Two Cities",
                "author" => "Charles Dickens",
                "description" => "A novel set in Paris and London before and during the French Revolution.",
                "category" => "Classic",
                "image" => asset('storage/booksImage/A-Tale-of-Two-Cities.jpg'),
                "student_id" => 1
            ],
            [
                "title" => "Pride and Prejudice",
                "author" => "Jane Austen",
                "description" => "A classic novel about love, marriage, and social expectations in early 19th-century England.",
                "category" => "Classic",
                "image" => asset('storage/booksImage/Pride-and-Prejudice.jpg'),
                "student_id" => 1
            ],
            [
                "title" => "Frankenstein",
                "author" => "Mary Shelley",
                "description" => "A novel about a scientist who creates a monster and deals with the consequences.",
                "category" => "Classic",
                "image" => asset('storage/booksImage/Frankenstein.jpg'),
                "student_id" => 1
            ],
            [
                "title" => "The Subtle Art of Not Giving a F*ck",
                "author" => "Mark Manson",
                "description" => "A counterintuitive approach to living a better life by focusing on what truly matters.",
                "category" => "Self-Help",
                "image" => asset('storage/booksImage/The-Subtle-Art-of-Not-Giving.jpg'),
                "student_id" => 1
            ],
            [
                "title" => "The Book Thief",
                "author" => "Markus Zusak",
                "description" => "A young girl in Nazi Germany finds solace in stealing books and sharing them with others.",
                "category" => "Historical Fiction",
                "image" => asset('storage/booksImage/The-Book-Thief.jpg'),
                "student_id" => 1
            ],
            [
                "title" => "All the Light We Cannot See",
                "author" => "Anthony Doerr",
                "description" => "The story of a blind French girl and a German soldier during World War II.",
                "category" => "Historical Fiction",
                "image" => asset('storage/booksImage/All-the-Light-We-Cannot-See.jpg'),
                "student_id" => 1
            ],
            [
                "title" => "The Nightingale",
                "author" => "Kristin Hannah",
                "description" => "A historical novel about two sisters in Nazi-occupied France during World War II.",
                "category" => "Historical Fiction",
                "image" => asset('storage/booksImage/The-Nightingale.jpg'),
                "student_id" => 1
            ],
            [
                "title" => "The Help",
                "author" => "Kathryn Stockett",
                "description" => "A story about racism and the lives of African American maids in 1960s Mississippi.",
                "category" => "Historical Fiction",
                "image" => asset('storage/booksImage/The-Help.jpg'),
                "student_id" => 1
            ],
            [
                "title" => "Educated",
                "author" => "Tara Westover",
                "description" => "A story of a girl who grew up in a strict environment without formal education, then attended prestigious universities.",
                "category" => "Memoir",
                "image" => asset('storage/booksImage/Educated.jpg'),
                "student_id" => 1
            ],           
            [
                "title" => "Becoming",
                "author" => "Michelle Obama",
                "description" => "The journey of the former First Lady from her childhood to the White House.",
                "category" => "Memoir",
                "image" => asset('storage/booksImage/Becoming.jpg'),
                "student_id" => 1
            ],
            [
                "title" => "When Breath Becomes Air",
                "author" => "Paul Kalanithi",
                "description" => "A neurosurgeon's reflection on life and death as he faces cancer himself.",
                "category" => "Memoir",
                "image" => asset('storage/booksImage/When-Breath-Becomes-Air.jpg'),
                "student_id" => 1
            ],
            [
                "title" => "Born a Crime",
                "author" => "Trevor Noah",
                "description" => "The comedian's story of growing up in South Africa during apartheid.",
                "category" => "Memoir",
                "image" => asset('storage/booksImage/Born-a-Crime.jpg'),
                "student_id" => 1
            ],
            [
                "title" => "The Glass Castle",
                "author" => "Jeannette Walls",
                "description" => "A childhood filled with challenges in the care of unconventional parents.",
                "category" => "Memoir",
                "image" => asset('storage/booksImage/The-Glass-Castle.jpg'),
                "student_id" => 1
            ],
            [
                "title" => "I Am Malala",
                "author" => "Malala Yousafzai",
                "description" => "The story of the Pakistani girl who fought for girls' education and survived an assassination attempt.",
                "category" => "Memoir",
                "image" => asset('storage/booksImage/I-Am-Malala.jpg'),
                "student_id" => 1
            ],
            [
                "title" => "Wild",
                "author" => "Cheryl Strayed",
                "description" => "A woman's journey through nature to reclaim herself after personal losses.",
                "category" => "Memoir",
                "image" => asset('storage/booksImage/Wild.jpg'),
                "student_id" => 1
            ],
            [
                "title" => "Steve Jobs",
                "author" => "Walter Isaacson",
                "description" => "The biography of Steve Jobs from an intimate perspective.",
                "category" => "Biography",
                "image" => asset('storage/booksImage/Steve-Jobs.jpg'),
                "student_id" => 1
            ],
            [
                "title" => "The Diary of a Young Girl",
                "author" => "Anne Frank",
                "description" => "The diary of a Jewish girl during World War II.",
                "category" => "Memoir",
                "image" => asset('storage/booksImage/The-Diary-of-a-Young-Girl.jpg'),
                "student_id" => 1
            ],
            [
                "title" => "The Autobiography of Malcolm X",
                "author" => "Malcolm X",
                "description" => "The autobiography of the famous figure who transformed from a life of crime to a human rights advocate.",
                "category" => "Biography",
                "image" => asset('storage/booksImage/The-Autobiography-of-Malcolm-X.jpg'),
                "student_id" => 1
            ],
            [
                "title" => "1984",
                "author" => "George Orwell",
                "description" => "A dystopian novel about a totalitarian government.",
                "category" => "Dystopian",
                "image" => asset('storage/booksImage/1984.jpg'),
                "student_id" => 1
            ],
            [
                "title" => "Brave New World",
                "author" => "Aldous Huxley",
                "description" => "A speculative novel about a futuristic world governed by technology.",
                "category" => "Dystopian",
                "image" => asset('storage/booksImage/Brave-New-World.jpg'),
                "student_id" => 1
            ],
            [
                "title" => "The Catcher in the Rye",
                "author" => "J.D. Salinger",
                "description" => "A story about a teenager facing life's challenges and learning.",
                "category" => "Classic",
                "image" => asset('storage/booksImage/The-Catcher-in-the-Rye.jpg'),
                "student_id" => 1
            ],
            [
                "title" => "To Kill a Mockingbird",
                "author" => "Harper Lee",
                "description" => "A novel about race and justice in the American South.",
                "category" => "Classic",
                "image" => asset('storage/booksImage/To-Kill-a-Mockingbird.jpg'),
                "student_id" => 1
            ],
            [
                "title" => "The Great Gatsby",
                "author" => "F. Scott Fitzgerald",
                "description" => "A story of love and disappointment in 1920s America.",
                "category" => "Classic",
                "image" => asset('storage/booksImage/The-Great-Gatsby.jpg'),
                "student_id" => 1
            ],
            [
                "title" => "The Alchemist",
                "author" => "Paulo Coelho",
                "description" => "A young man's journey to find his personal legend and treasure.",
                "category" => "Fiction",
                "image" => asset('storage/booksImage/The-Alchemist.jpg'),
                "student_id" => 1
            ],
            [
                "title" => "The Secret",
                "author" => "Rhonda Byrne",
                "description" => "A guide to using the law of attraction to create the life you desire.",
                "category" => "Self-Help",
                "image" => asset('storage/booksImage/The-Secret.jpg'),
                "student_id" => 1
            ],
            [
                "title" => "Atomic Habits",
                "author" => "James Clear",
                "description" => "A practical guide to building good habits and breaking bad ones.",
                "category" => "Self-Help",
                "image" => asset('storage/booksImage/Atomic-Habits.jpg'),
                "student_id" => 1
            ],
            [
                "title" => "The Power of Now",
                "author" => "Eckhart Tolle",
                "description" => "A spiritual guide to living fully in the present moment.",
                "category" => "Self-Help",
                "image" => asset('storage/booksImage/The-Power-of-Now.jpg'),
                "student_id" => 1
            ],
            [
                "title" => "Dare to Lead",
                "author" => "Brené Brown",
                "description" => "A guide to leadership based on courage, vulnerability, and empathy.",
                "category" => "Self-Help",
                "image" => asset('storage/booksImage/Dare-to-Lead.jpg'),
                "student_id" => 1
            ],
            [
                "title" => "The Four Agreements",
                "author" => "Don Miguel Ruiz",
                "description" => "A code of conduct based on ancient Toltec wisdom for achieving personal freedom.",
                "category" => "Self-Help",
                "image" => asset('storage/booksImage/The-Four-Agreements.jpg'),
                "student_id" => 1
            ],
        ];

        foreach ($books as $book) {
            Book::create($book);
        };

        return response()->json(['message' => 'Books inserted successfully.']);
    }
}