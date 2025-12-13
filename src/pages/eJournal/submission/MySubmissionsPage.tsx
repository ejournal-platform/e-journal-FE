import { useMyPosts, useDeletePost } from "../../../api/hooks/posts";
import { useMemo } from "react";

const MySubmissionsPage = () => {
  const { data: postsData, isLoading, error } = useMyPosts();
  const { mutate: deletePost, isPending: isDeleting } = useDeletePost();

  const submissions = useMemo(() => {
    if (!postsData) return [];
    return postsData.map((post) => ({
      id: post.id,
      description: post.caption.split('\n')[2].length > 0
        ? post.caption.split('\n')[2].length > 20
          ? post.caption.split('\n')[2].slice(0, 20) + "..." : post.caption.split('\n')[2]
        : "Untitled",
      date: new Date(post.createdAt).toLocaleDateString(),
      status: post.status,
      images: post.mediaUrls.length,
    }));
  }, [postsData]);

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this submission?")) {
      deletePost(id);
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      PENDING: { bg: "bg-yellow-100", text: "text-yellow-800", label: "Pending" },
      APPROVED: { bg: "bg-green-100", text: "text-green-800", label: "Approved" },
      REJECTED: { bg: "bg-red-100", text: "text-red-800", label: "Rejected" },
    };
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.PENDING;
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${config.bg} ${config.text}`}>
        {config.label}
      </span>
    );
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 md:px-8 py-6 sm:py-8">

      {isLoading && <p className="text-center text-gray-500">Loading submissions...</p>}
      {error && <p className="text-center text-red-500">Failed to load submissions.</p>}

      {!isLoading && !error && (
        <>
          <div className="w-full overflow-x-auto rounded-lg shadow-sm border border-gray-100 bg-white p-3 sm:p-5">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="pb-3 text-sm font-semibold text-gray-700">Description</th>
                  <th className="pb-3 text-sm font-semibold text-gray-700">Date</th>
                  <th className="pb-3 text-sm font-semibold text-gray-700">Status</th>
                  <th className="pb-3 text-sm font-semibold text-gray-700">Images</th>
                  <th className="pb-3 text-sm font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {submissions.map((submission) => (
                  <tr key={submission.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 text-sm text-gray-800">{submission.description}</td>
                    <td className="py-3 text-sm text-gray-600">{submission.date}</td>
                    <td className="py-3">{getStatusBadge(submission.status)}</td>
                    <td className="py-3 text-sm text-gray-600">{submission.images}</td>
                    <td className="py-3">
                      {submission.status === "PENDING" && (
                        <button
                          onClick={() => handleDelete(submission.id)}
                          disabled={isDeleting}
                          className="text-red-600 hover:text-red-800 text-sm font-medium disabled:opacity-50"
                        >
                          Delete
                        </button>
                      )}
                      {submission.status !== "PENDING" && (
                        <span className="text-gray-400 text-sm">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {submissions.length === 0 && (
              <p className="text-center text-gray-500 py-8">No submissions yet.</p>
            )}
          </div>

          <p className="mt-4 sm:mt-6 text-xs sm:text-sm text-gray-500 text-center sm:text-right">
            Showing {submissions.length} {submissions.length === 1 ? "entry" : "entries"}.
          </p>
        </>
      )}
    </div>
  );
};

export default MySubmissionsPage;
