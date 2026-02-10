import React, { useState } from "react";
import Breadcrumb from "../../components/Bredcumb";
import { Link } from "react-router-dom";
import { FaPlus, FaFilePdf, FaSearch, FaEye } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";
import { HiOutlineDocumentDownload } from "react-icons/hi";
import Table from "../../components/Table";
import Pagination from "../../components/Pagination";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const SopManagement = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [viewData, setViewData] = useState(null);

  const itemsPerPage = 10;

  // ================= FETCH =================
  const { data: sopData = [], isLoading } = useQuery({
    queryKey: ["farmSops"],
    queryFn: async () => {
      const res = await axiosSecure.get("/farm-admin/sops");
      return res.data.data || [];
    },
  });

  // ================= DELETE =================
  const deleteMutation = useMutation({
    mutationFn: async (id) =>
      await axiosSecure.delete(`/farm-admin/sops/${id}`),
    onSuccess: () => {
      toast.success("SOP deleted successfully");
      queryClient.invalidateQueries(["farmSops"]);
    },
    onError: () => toast.error("Delete failed"),
  });

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this SOP?")) {
      deleteMutation.mutate(id);
    }
  };

  // ================= DOWNLOAD =================
  const handleDownload = async (id, fileName) => {
    try {
      const res = await axiosSecure.get(
        `/farm-admin/sops/${id}/download`,
        { responseType: "blob" }
      );

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch {
      toast.error("Download failed");
    }
  };

  // ================= FILTER =================
  const filteredData = sopData.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  // ================= PAGINATION =================
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // ================= TABLE =================
  const TableHeads = [
    { Title: "SOP Title", key: "title", width: "25%" },
    { Title: "Category", key: "category", width: "15%" },
    {
      Title: "Document",
      key: "document",
      width: "20%",
      render: (row) => (
        <div className="flex items-center justify-center gap-2">
          {/* {row.fileName ? (
            <>
              <FaFilePdf className="text-red-500" />
              <span className="text-sm">{row.fileName}</span>
              <HiOutlineDocumentDownload
                className="cursor-pointer"
                onClick={() => handleDownload(row.id, row.fileName)}
              />
            </>
          ) : (
            <>
              <FaEye className="text-blue-500" />
              <span
                onClick={() => setViewData(row)}
                className="cursor-pointer text-blue-600"
              >
                View
              </span>
            </>
          )} */}
          <>
              <FaFilePdf className="text-red-500" />
              <span className="text-sm">{row.fileName}</span>
              <HiOutlineDocumentDownload
                className="cursor-pointer"
                onClick={() => handleDownload(row.id, row.fileName)}
              />
            </>
        </div>
      ),
    },
    {
      Title: "Upload Date",
      key: "createdAt",
      width: "15%",
      render: (row) =>
        new Date(row.createdAt).toISOString().split("T")[0],
    },
    {
      Title: "Actions",
      key: "actions",
      width: "15%",
      render: (row) => (
        <div className="flex items-center justify-center gap-4">
          <Link to={`/admin/sop/management/edit/sop/${row.id}`}>
            <FiEdit className="text-blue-600 cursor-pointer" />
          </Link>

          <RiDeleteBinLine
            className="text-red-600 cursor-pointer"
            onClick={() => handleDelete(row.id)}
          />
        </div>
      ),
    },
  ];

  if (isLoading) return <div className="p-10">Loading SOPs...</div>;

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <Breadcrumb />
          <p className="text-[#4A5565] text-sm mt-1.5">
            Manage all SOP documents in one place
          </p>
        </div>

        <Link to="upload/sop">
          <button className="bg-[#F6A62D] text-white px-4 py-2 rounded-md flex items-center gap-2">
            <FaPlus />
            Upload New SOP
          </button>
        </Link>
      </div>

      <div className="relative mt-6">
        <FaSearch className="absolute top-1/2 -translate-y-1/2 left-3 text-[#99A1AF]" />
        <input
          type="text"
          placeholder="Search SOP..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-[40%] pl-10 p-4 border border-[#D1D5DC] rounded-md outline-none"
        />
      </div>

      <div className="bg-white rounded-lg border-2 border-[#E5E7EB] mt-6 overflow-x-scroll md:overflow-hidden">
        <Table TableHeads={TableHeads} TableRows={paginatedData} />
      </div>

      <div className="flex justify-center mt-4">
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>

      {/* {viewData && (
        <SopViewModal
          sop={viewData}
          onClose={() => setViewData(null)}
        />
      )} */}
    </div>
  );
};

// ================= MODAL =================

// const SopViewModal = ({ sop, onClose }) => {
//   const content = sop.content;

//   return (
//     <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
//       <div className="bg-white w-[600px] max-h-[80vh] overflow-y-auto p-6 rounded-lg">
//         <h2 className="text-xl font-semibold mb-4">{sop.title}</h2>
//         <p className="text-gray-600 mb-4">
//           Category: {sop.category}
//         </p>

//         <div className="border p-4 rounded-md whitespace-pre-wrap max-h-[60vh] overflow-y-auto">
//           {(() => {
//             if (!content) {
//               return (
//                 <span className="text-gray-400 italic">
//                   No content available
//                 </span>
//               );
//             }

//             try {
//               const parsed =
//                 typeof content === "string"
//                   ? JSON.parse(content)
//                   : content;

//               if (parsed.sections) {
//                 return parsed.sections.map((sec, i) => (
//                   <div key={i} className="mb-6">
//                     <h3 className="font-semibold text-lg mb-2">
//                       {sec.title}
//                     </h3>
//                     <ul className="list-decimal pl-5 space-y-2">
//                       {sec.steps?.map((step, j) => (
//                         <li key={j}>{step}</li>
//                       ))}
//                     </ul>
//                   </div>
//                 ));
//               }

//               return JSON.stringify(parsed, null, 2);
//             } catch {
//               return content;
//             }
//           })()}
//         </div>

//         <button
//           onClick={onClose}
//           className="mt-6 bg-[#F6A62D] text-white px-4 py-2 rounded-md"
//         >
//           Close
//         </button>
//       </div>
//     </div>
//   );
// };

export default SopManagement;
