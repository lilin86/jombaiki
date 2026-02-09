
import React from 'react';
import { ThumbsUp, MessageCircle, Share2, MoreHorizontal } from 'lucide-react';

const MOCK_POSTS = [
  {
    id: 'p1',
    author: 'MyviKing99',
    avatar: 'https://picsum.photos/40/40?random=11',
    category: 'Modification',
    title: 'Just installed GAB HE Series for my Myvi G3!',
    content: 'The handling improved significantly, but the ride is a bit stiff for daily use. Any advice on damping settings? My current setting is 12 clicks from hard.',
    image: 'https://picsum.photos/600/400?random=12',
    likes: 245,
    comments: 56,
    time: '2 hours ago'
  },
  {
    id: 'p2',
    author: 'ProtonLegacy',
    avatar: 'https://picsum.photos/40/40?random=13',
    category: 'Breakdown',
    title: 'Saga BLM Overheating at Karak Highway',
    content: 'Stuck at km 35. Water temp shooting up. Checked reservoir it was empty. Refilled but still bubbling. Head gasket issue? Any workshop nearby Gombak?',
    likes: 12,
    comments: 89,
    time: '4 hours ago'
  },
  {
    id: 'p3',
    author: 'ViosRacer',
    avatar: 'https://picsum.photos/40/40?random=14',
    category: 'Accessories',
    title: 'Recommended Android Player for Vios NCP150?',
    content: 'Looking for something around RM800-1200. Teyes or Mohard? Need stable Apple CarPlay wireless.',
    likes: 45,
    comments: 32,
    time: 'Yesterday'
  }
];

const Community: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Create Post Card */}
      <div className="bg-white rounded-2xl p-6 border shadow-sm">
        <div className="flex gap-4 mb-4">
          <img src="https://picsum.photos/40/40" alt="My Avatar" className="w-10 h-10 rounded-full" />
          <button className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-500 text-left px-5 rounded-full text-sm transition-colors">
            Share your experience Azman...
          </button>
        </div>
        <div className="flex items-center gap-2 border-t pt-4">
          <button className="flex-1 flex items-center justify-center gap-2 py-2 hover:bg-slate-50 rounded-xl text-xs font-semibold text-slate-600 transition-colors">
            <span className="text-blue-500">📷</span> Photos
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 py-2 hover:bg-slate-50 rounded-xl text-xs font-semibold text-slate-600 transition-colors">
            <span className="text-red-500">🚗</span> My Car
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 py-2 hover:bg-slate-50 rounded-xl text-xs font-semibold text-slate-600 transition-colors">
            <span className="text-yellow-500">📍</span> Workshop
          </button>
        </div>
      </div>

      {/* Feed */}
      {MOCK_POSTS.map(post => (
        <div key={post.id} className="bg-white rounded-2xl border shadow-sm overflow-hidden">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <img src={post.avatar} alt={post.author} className="w-10 h-10 rounded-full" />
                <div>
                  <h4 className="font-bold text-slate-900 leading-none">{post.author}</h4>
                  <p className="text-xs text-slate-500 mt-1">{post.time} • <span className="text-blue-600 font-medium">{post.category}</span></p>
                </div>
              </div>
              <button className="text-slate-400 hover:text-slate-900 p-1">
                <MoreHorizontal className="w-5 h-5" />
              </button>
            </div>
            
            <h3 className="text-lg font-bold text-slate-900 mb-2">{post.title}</h3>
            <p className="text-slate-600 text-sm leading-relaxed mb-4">{post.content}</p>

            {post.image && (
              <div className="rounded-xl overflow-hidden mb-4 border">
                <img src={post.image} alt="Post Attachment" className="w-full h-auto" />
              </div>
            )}

            <div className="flex items-center justify-between pt-4 border-t">
              <div className="flex items-center gap-4">
                <button className="flex items-center gap-2 text-slate-500 hover:text-blue-600 text-sm font-medium transition-colors">
                  <ThumbsUp className="w-4 h-4" />
                  {post.likes}
                </button>
                <button className="flex items-center gap-2 text-slate-500 hover:text-blue-600 text-sm font-medium transition-colors">
                  <MessageCircle className="w-4 h-4" />
                  {post.comments}
                </button>
              </div>
              <button className="text-slate-400 hover:text-slate-600">
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Community;
