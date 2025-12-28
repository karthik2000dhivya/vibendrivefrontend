import React, { useState } from 'react';

const ReviewModal = ({ booking, onClose, onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ bookingId: booking.id, rating, comment });
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl animate-scale-up">
        {/* Modal Header */}
        <div className="bg-gray-900 p-6 text-white flex justify-between items-center">
          <div>
            <h3 className="text-xl font-bold uppercase tracking-tight">Rate Your Trip</h3>
            <p className="text-xs text-gray-400 mt-1">{booking.carName} • {booking.id}</p>
          </div>
          <button onClick={onClose} className="text-2xl hover:text-red-500 transition-colors">✕</button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="p-8">
          <div className="text-center mb-8">
            <p className="text-gray-600 font-medium mb-4">How was your journey with Vibe-N-Drive?</p>
            
            {/* Star Rating Logic */}
            <div className="flex justify-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  className={`text-4xl transition-all transform ${
                    star <= (hover || rating) ? 'text-yellow-400 scale-110' : 'text-gray-200'
                  }`}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHover(star)}
                  onMouseLeave={() => setHover(0)}
                >
                  ★
                </button>
              ))}
            </div>
            <p className="mt-2 text-xs font-bold uppercase text-gray-400">
              {rating === 5 ? 'Exceptional!' : rating === 1 ? 'Poor' : 'Select a rating'}
            </p>
          </div>

          <div className="space-y-4">
            <label className="text-xs font-black uppercase text-gray-500 tracking-widest">Your Feedback</label>
            <textarea
              className="w-full h-32 p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-red-600 outline-none resize-none text-sm"
              placeholder="Tell us about the car condition, comfort, and service..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={rating === 0}
            className={`w-full mt-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-all ${
              rating > 0 
              ? 'bg-red-600 text-white shadow-lg shadow-red-200 hover:bg-red-700 active:scale-95' 
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            Submit Review
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReviewModal;