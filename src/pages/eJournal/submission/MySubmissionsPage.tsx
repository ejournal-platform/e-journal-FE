import SubmissionList from "../../../components/submissions/SubmissionList";
import { mockSubmissions } from "../../../components/submissions/Types";

const MySubmissionsPage = () => {
  return (
    <div
      className="
        w-full max-w-5xl mx-auto 
        px-4 sm:px-6 md:px-8 py-6 sm:py-8
      "
    >
      {/* 🧾 Title */}
      <h1
        className="
          text-2xl sm:text-3xl md:text-4xl 
          font-extrabold text-gray-900 mb-6 sm:mb-8 text-center sm:text-left
        "
      >
        My Submissions
      </h1>

      {/* 📋 Submission List */}
      <div
        className="
          w-full overflow-x-auto 
          rounded-lg shadow-sm border border-gray-100 
          bg-white p-3 sm:p-5
        "
      >
        <SubmissionList />
      </div>

      {/* 📄 Footer text */}
      <p
        className="
          mt-4 sm:mt-6 text-xs sm:text-sm 
          text-gray-500 text-center sm:text-right
        "
      >
        Showing 1 to {mockSubmissions.length} of {mockSubmissions.length} entries.
      </p>
    </div>
  );
};

export default MySubmissionsPage;
