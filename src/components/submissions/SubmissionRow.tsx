import { type Submission } from "./Types";
import StatusBadge from "./StatusBadge";
import { MdDelete } from "react-icons/md";

interface Props {
  submission: Submission;
  onDelete: (id: number) => void;
}

const SubmissionRow = ({ submission, onDelete } : Props) => (
  <div className="grid grid-cols-[3fr_1.5fr_1.5fr_0.5fr] items-center py-4 border-b border-gray-100 last:border-b-0">
    <div className="text-gray-800 font-medium truncate">
      {submission.title}
    </div>
    <div className="text-gray-500">{submission.date}</div>
    <div>
      <StatusBadge status={submission.status} />
    </div>
    <div className="flex justify-end">
      <button 
      onClick={() => onDelete(submission.id)}
      className="text-gray-400 hover:text-gray-700 p-1 rounded-full transition">
        <MdDelete className="w-5 h-5" />
      </button>
    </div>
  </div>
);

export default SubmissionRow;
