interface ActivityFormProps {
  activityTitle: string;
  description: string;
  date: string;
  setActivityTitle: (v: string) => void;
  setDescription: (v: string) => void;
  setDate: (v: string) => void;
}

const ActivityForm = ({
  // activityTitle,
  description,
  date,
  // setActivityTitle,
  setDescription,
  setDate,
} : ActivityFormProps) => {
  return (
    <div className="bg-white p-8 rounded-xl shadow-lg">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Activity Details</h2>

      {/* Title */}
      {/* <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Activity Title
        </label>
        <input
          type="text"
          value={activityTitle}
          onChange={(e) => setActivityTitle(e.target.value)}
          placeholder="Enter activity title"
          className="block w-full px-4 py-3 bg-gray-100 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
          required
        />
      </div> */}

      {/* Description */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Activity Description
        </label>
        <textarea
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter activity description"
          className="block w-full px-4 py-3 bg-gray-100 rounded-lg focus:ring-2 focus:ring-green-500 outline-none resize-y"
          required
        />
      </div>

      {/* Date */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="block w-full px-4 py-3 bg-gray-100 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
          required
        />
      </div>
    </div>
  );
};

export default ActivityForm;
