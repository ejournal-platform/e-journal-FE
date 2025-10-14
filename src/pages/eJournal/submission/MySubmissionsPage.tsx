import SubmissionList from "../../../components/submissions/SubmissionList";
import { mockSubmissions } from "../../../components/submissions/Types";

const MySubmissionsPage = () => {
  return (
    <div className="p-8 w-full max-w-5xl mx-auto">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-8">My Submissions</h1>

      <SubmissionList />

      <p className="mt-6 text-sm text-gray-500">
        Showing 1 to {mockSubmissions.length} of {mockSubmissions.length} entries.
      </p>
    </div>
  );
};

export default MySubmissionsPage;
