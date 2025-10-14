import { type SubmissionStatus } from "./Types";

interface Props {
  status: SubmissionStatus;
}

const StatusBadge = ({ status } : Props) => {
  let colorClass = "";
  let dotColor = "";

  switch (status) {
    case "Approved":
      colorClass = "bg-green-100 text-green-700";
      dotColor = "bg-green-500";
      break;
    case "Pending":
      colorClass = "bg-yellow-100 text-yellow-700";
      dotColor = "bg-yellow-500";
      break;
    case "Rejected":
      colorClass = "bg-red-100 text-red-700";
      dotColor = "bg-red-500";
      break;
  }

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${colorClass}`}
    >
      <span className={`w-2 h-2 mr-2 rounded-full ${dotColor}`} />
      {status}
    </span>
  );
};

export default StatusBadge;
