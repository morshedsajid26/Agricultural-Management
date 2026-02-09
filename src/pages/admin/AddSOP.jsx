import React, { useState, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import Breadcrumb from "../../components/Bredcumb";
import { useNavigate, useParams } from "react-router-dom";
import InputField from "../../components/InputField";
import Dropdown from "../../components/Dropdown";
import UploadPDF from "../../components/UploadPDF";
import CreateDigitalModule from "../../components/CreateDigitalModule";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const AddSOP = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // edit support
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [activeTab, setActiveTab] = useState("upload");
  const [selectedFile, setSelectedFile] = useState(null);
  const [digitalContent, setDigitalContent] = useState("");

  // ================= EDIT MODE FETCH =================
  const { data: editData } = useQuery({
    queryKey: ["editSop", id],
    enabled: !!id,
    queryFn: async () => {
      const res = await axiosSecure.get(`/farm-admin/sops/${id}`);
      return res.data.data;
    },
  });

  useEffect(() => {
    if (editData) {
      setTitle(editData.title);
      setCategory(editData.category);
    }
  }, [editData]);

  // ================= CREATE DIGITAL =================
  const createMutation = useMutation({
    mutationFn: async () => {
      return await axiosSecure.post("/farm-admin/sops/create", {
        title,
        category,
        content: digitalContent,
      });
    },
    onSuccess: () => {
      toast.success("SOP created successfully");
      queryClient.invalidateQueries(["farmSops"]);
      navigate("/admin/sop/management");
    },
    onError: () => {
      toast.error("Failed to create SOP");
    },
  });

  // ================= UPLOAD PDF =================
  const uploadMutation = useMutation({
    mutationFn: async () => {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("category", category);
      formData.append("file", selectedFile);

      return await axiosSecure.post(
        "/farm-admin/sops/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    },
    onSuccess: () => {
      toast.success("SOP uploaded successfully");
      queryClient.invalidateQueries(["farmSops"]);
      navigate("/admin/sop/management");
    },
    onError: () => {
      toast.error("Upload failed");
    },
  });

  // ================= SUBMIT =================
  const handleSubmit = () => {
    if (!title || !category) {
      return toast.error("Title & Category required");
    }

    if (activeTab === "upload") {
      if (!selectedFile) {
        return toast.error("Please select a PDF file");
      }
      uploadMutation.mutate();
    } else {
      if (!digitalContent) {
        return toast.error("Content required");
      }
      createMutation.mutate();
    }
  };

  return (
    <div>
      <div
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 cursor-pointer"
      >
        <FaArrowLeft className="text-[#4A5565]" />
        <p className="text-[#4A5565]">Back to SOP List</p>
      </div>

      <div className="mt-4">
        <Breadcrumb />
        <p className="text-[#4A5565] text-sm mt-1.5">
          {id ? "Edit SOP" : "Add a new standard operating procedure document"}
        </p>
      </div>

      <div className="bg-white rounded-lg border-2 border-[#E5E7EB] p-6 mt-6">
        <div className="grid grid-cols-12 gap-4">

          <InputField
            type="text"
            inputClass="rounded-lg"
            label="SOP Title"
            placeholder="e.g., Safety Protocols"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="col-span-12"
          />

          <Dropdown
            placeholder="Category/Area"
            options={[
              "Milking",
              "Feeding",
              "Health",
              "Calves",
              "Maintenance",
              "Emergencies",
              "SAFETY",
            ]}
            value={category}
            onSelect={(value) => setCategory(value)}
            className="col-span-12"
          />

          {/* Toggle */}
          <div className="flex bg-[#FFF4E5] rounded-lg p-1.5 w-fit mt-6 col-span-12">
            <button
              onClick={() => setActiveTab("upload")}
              className={`px-8 py-2 rounded-md ${
                activeTab === "upload"
                  ? "bg-[#F6A62D] text-white"
                  : "text-[#4A5565]"
              }`}
            >
              Upload PDF
            </button>

            <button
              onClick={() => setActiveTab("create")}
              className={`px-8 py-2 rounded-md ${
                activeTab === "create"
                  ? "bg-[#F6A62D] text-white"
                  : "text-[#4A5565]"
              }`}
            >
              Create Digital Module
            </button>
          </div>

          {/* Content */}
          <div className="mt-6 col-span-12">
            {activeTab === "upload" && (
              <UploadPDF onFileSelect={(file) => setSelectedFile(file)} />
            )}

            {activeTab === "create" && (
              <CreateDigitalModule
                value={digitalContent}
                onChange={(val) => setDigitalContent(val)}
              />
            )}
          </div>

          {/* Buttons */}
          <div className="col-span-12 flex gap-3 mt-6">
            <button
              onClick={handleSubmit}
              disabled={
                createMutation.isPending || uploadMutation.isPending
              }
              className="py-3 px-5 bg-[#F6A62D] text-white rounded-lg"
            >
              {createMutation.isPending || uploadMutation.isPending
                ? "Processing..."
                : id
                ? "Update SOP"
                : "Create SOP"}
            </button>

            <button
              onClick={() => navigate(-1)}
              className="py-3 px-5 bg-[#E5E7EB] text-[#364153] rounded-lg"
            >
              Cancel
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AddSOP;
