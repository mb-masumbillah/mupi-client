import { MoveRight } from "lucide-react";
import Link from "next/link";

const notices = [
  {
    id: 1,
    title: "২০২৫ শিক্ষাবর্ষে ভর্তি সংক্রান্ত বিজ্ঞপ্তি",
    date: "10 Jan 2026",
    isImportant: true,
  },
  {
    id: 2,
    title: "সেমিস্টার ফাইনাল পরীক্ষার সময়সূচি প্রকাশ",
    date: "05 Jan 2026",
    isImportant: false,
  },
  {
    id: 3,
    title: "ক্লাস রুটিন সংশোধনী বিজ্ঞপ্তি",
    date: "02 Jan 2026",
    isImportant: false,
  },
  {
    id: 4,
    title:
      "২০২৪-২৫ শিক্ষাবর্ষের সকল বিভাগের ক্লাস কার্যক্রম পুনরায় শুরু সংক্রান্ত বিজ্ঞপ্তি",
    date: "28 Dec 2025",
    isImportant: false,
  },
  {
    id: 5,
    title:
      "ডিপ্লোমা ইন ইঞ্জিনিয়ারিং শিক্ষার্থীদের অনলাইন রেজিস্ট্রেশন সংক্রান্ত জরুরি বিজ্ঞপ্তি",
    date: "22 Dec 2025",
    isImportant: true,
  },
  {
    id: 6,
    title: "প্রফেশনাল ট্রেনিং ও ইন্ডাস্ট্রিয়াল এটাচমেন্ট সংক্রান্ত নোটিশ",
    date: "15 Dec 2025",
    isImportant: false,
  },
];

const NoticeSection = () => {
  return (
    <section className="bg-gray-50 py-16">
      <div className="max-width mx-auto px-4">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-4xl font-bold text-gray-900">
             Notice Board
            </h2>
            <p className="text-gray-600 mt-1">
              Latest announcements and official notices
            </p>
          </div>

          <Link
            href="/notice"
            className="text-primary font-bold border-b-0 hover:border-b  flex items-center gap-3"
          >
            <span>View All Notices</span> <MoveRight />
          </Link>
        </div>

        {/* Notice Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-300">
          <ul className="divide-y divide-gray-400">
            {notices.map((notice) => (
              <li
                key={notice.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between rounded-2xl gap-4 px-6 py-5 hover:bg-gray-50 transition"
              >
                {/* Left */}
                <div className="flex items-start gap-3">
                  {/* Icon */}
                  <span className="mt-1 text-primary text-lg">📄</span>

                  <div>
                    <h4 className="text-gray-900 font-medium">
                      {notice.title}
                      {notice.isImportant && (
                        <span className="ml-2 inline-block bg-red-100 text-red-600 text-xs px-2 py-0.5 rounded-full">
                          Important
                        </span>
                      )}
                    </h4>
                    <p className="text-sm text-gray-500 mt-1">
                      Published on {notice.date}
                    </p>
                  </div>
                </div>

                {/* Right */}

                
                <Link
                  href={`/notice/${notice.id}`}
                  className="font-medium text-primary hover:border-b flex items-center gap-3"
                >
                    <span>Read More</span> <MoveRight />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default NoticeSection;
