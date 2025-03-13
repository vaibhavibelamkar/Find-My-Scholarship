import { Edit, Send, Trash2 } from "lucide-react";

const AnnouncementsList = ({ announcements }) => (
  <div className="space-y-6">
    <div className="flex justify-between items-center">
      <h2 className="text-2xl font-semibold">Announcements</h2>
      <button
        onClick={() => setShowAnnouncementModal(true)}
        className="flex items-center gap-2 px-4 py-2 bg-[#242a4b] text-white rounded-lg hover:text-[#242a4b]"
      >
        <Send className="w-5 h-5" />
        New Announcement
      </button>
    </div>

    <div className="grid gap-4">
      {announcements.map((announcement) => (
        <div
          key={announcement.id}
          className="bg-white p-6 rounded-lg shadow-sm border"
        >
          <div className="flex justify-between">
            <div>
              <h3 className="font-semibold">{announcement.title}</h3>
              <p className="text-gray-600 mt-1">{announcement.content}</p>
              <div className="flex items-center gap-4 mt-2">
                <span className="text-sm text-gray-500">
                  {announcement.date}
                </span>
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    announcement.status === "sent"
                      ? "bg-green-50 text-green-600"
                      : "bg-yellow-50 text-yellow-600"
                  }`}
                >
                  {announcement.status}
                </span>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="p-2 text-gray-600 hover:text-[#242a4b] hover:bg-indigo-50 rounded-lg">
                <Edit className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg">
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default AnnouncementsList;
