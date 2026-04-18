
'use client';

import { useState } from 'react';
import { Button, Input, ConfirmModal } from '@/components/ui';
import { Card } from '@/components/ui/Card';
import {
  SearchOutlined,
  UploadOutlined,
  FilterOutlined,
  FileTextOutlined,
  PictureOutlined,
  MoreOutlined,
  DownloadOutlined,
  DeleteOutlined,
} from '@ant-design/icons';

const files = [
  {
    id: 1,
    name: 'Q1_Financial_Report_2026.pdf',
    type: 'PDF',
    size: '2.4 MB',
    uploader: 'Sarah Johnson',
    date: 'Apr 15, 2026',
    kind: 'document',
  },
  {
    id: 2,
    name: 'Employee_Handbook.docx',
    type: 'DOCX',
    size: '1.8 MB',
    uploader: 'Michael Chen',
    date: 'Apr 14, 2026',
    kind: 'document',
  },
  {
    id: 3,
    name: 'Office_Layout.png',
    type: 'PNG',
    size: '3.2 MB',
    uploader: 'Emma Davis',
    date: 'Apr 13, 2026',
    kind: 'image',
  },
];

function fileTypeClass(type: string) {
  switch (type) {
    case 'PDF':
      return 'bg-violet-100 text-violet-700';
    case 'DOCX':
      return 'bg-fuchsia-100 text-fuchsia-700';
    case 'PNG':
      return 'bg-purple-100 text-purple-700';
    default:
      return 'bg-slate-100 text-slate-600';
  }
}

export  function Attachments() {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<{ id: number; name: string } | null>(null);

  const handleDeleteClick = (file: { id: number; name: string }) => {
    setSelectedFile(file);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    console.log('Deleting file:', selectedFile);
    // Perform delete action here
    setDeleteModalOpen(false);
    setSelectedFile(null);
  };

  return (
    <div className="min-h-screen bg-[var(--background)] p-4 md:p-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex items-start justify-between">
          <div>
            <h1 className="text-4xl font-extrabold text-[var(--text)]">Attachments</h1>
            <p className="mt-1 text-base text-[var(--text-secondary)]">
              Manage all files and documents in your system
            </p>
          </div>

          <Button variant="primary">
            <UploadOutlined /> Upload File
          </Button>
        </div>

        <Card className="mb-6 p-5">
          <div className="flex flex-col gap-4 lg:flex-row">
            <div className="flex flex-1 items-center gap-3">
              <SearchOutlined className="text-[var(--text-muted)]" />
              <Input placeholder="Search files..." className="flex-1" />
            </div>

            <Button variant="secondary">
              <FilterOutlined /> Filters
            </Button>
          </div>

          <div className="mt-4 flex flex-wrap gap-3">
            {['All', 'Financial', 'HR', 'Operations', 'Marketing'].map((tab, i) => (
              <Button
                key={tab}
                variant={i === 0 ? 'primary' : 'secondary'}
                size="sm"
              >
                {tab}
              </Button>
            ))}
          </div>
        </Card>

        <Card className="mb-6 border-2 border-dashed border-[#d8b4fe] bg-[#f3f0ff] px-6 py-12 text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-[20px] bg-gradient-to-br from-fuchsia-500 to-blue-500 text-3xl text-white shadow-lg shadow-fuchsia-200">
            <UploadOutlined />
          </div>

          <h3 className="text-2xl font-extrabold text-[var(--text)]">Drop files here to upload</h3>
          <p className="mt-2 text-lg text-[var(--text-secondary)]">
            or click to browse from your computer
          </p>

          <Button variant="secondary" className="mt-6">
            Browse Files
          </Button>
        </Card>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {files.map((file) => (
            <Card key={file.id} className="p-6">
              <div className="mb-5 flex items-start justify-between">
                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-2xl text-2xl text-white shadow-lg ${
                    file.kind === 'image'
                      ? 'bg-gradient-to-br from-fuchsia-500 to-pink-500'
                      : 'bg-gradient-to-br from-sky-500 to-cyan-500'
                  }`}
                >
                  {file.kind === 'image' ? <PictureOutlined /> : <FileTextOutlined />}
                </div>

                <div className="flex items-center gap-4 text-lg text-[var(--text-secondary)]">
                  <Button variant="ghost" size="sm"><DownloadOutlined /></Button>
                  <Button variant="ghost" size="sm"><MoreOutlined /></Button>
                  <Button variant="danger" size="sm" onClick={() => handleDeleteClick({ id: file.id, name: file.name })}><DeleteOutlined /></Button>
                </div>
              </div>

              <h3 className="mb-3 text-[18px] font-extrabold text-[var(--text)]">{file.name}</h3>

              <div className="mb-5 flex items-center gap-3">
                <span className={`rounded-md px-2 py-1 text-xs font-bold ${fileTypeClass(file.type)}`}>
                  {file.type}
                </span>
                <span className="text-sm text-[var(--text-secondary)]">{file.size}</span>
              </div>

              <div className="h-px bg-[var(--border)]" />

              <div className="mt-4">
                <p className="text-sm text-[var(--text-secondary)]">Uploaded by</p>
                <p className="mt-1 text-lg font-bold text-[var(--text)]">{file.uploader}</p>
                <p className="mt-1 text-sm text-[var(--text-secondary)]">{file.date}</p>
              </div>
            </Card>
          ))}
        </div>

        <ConfirmModal
          isOpen={deleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          onConfirm={handleDeleteConfirm}
          type="delete"
          title="Delete File"
          message={`Are you sure you want to delete ${selectedFile?.name}?`}
          description="This action cannot be undone. The file will be permanently removed from the system."
          confirmText="Delete"
          cancelText="Cancel"
        />
      </div>
    </div>
  );
}