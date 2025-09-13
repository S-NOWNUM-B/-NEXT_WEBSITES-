import { notes, type Note } from "../../../data/forumData";

export default function NotesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Заметки
        </h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          Создать заметку
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {notes.map((note: Note) => (
          <div key={note.id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              {note.title}
            </h3>
            <p className="text-gray-600 mb-4 line-clamp-3">
              {note.content}
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              {note.tags.map((tag: string) => (
                <span key={tag} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex justify-between items-center text-sm text-gray-500">
              <span>Автор: {note.author}</span>
              <span>{note.createdAt}</span>
            </div>
          </div>
        ))}
      </div>

      {notes.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            Пока нет заметок. Создайте первую заметку!
          </p>
        </div>
      )}
    </div>
  );
}
