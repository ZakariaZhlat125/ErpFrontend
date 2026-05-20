'use client';

import { useTheme } from '@/lib/theme/use-theme';
import { Card } from '@/components/ui/Card';
import { Button, Input } from '@/components/ui';
import { useAuth } from '@/lib/hooks/useAuth';
import { 
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  HomeOutlined,
  EditOutlined,
  SaveOutlined,
} from '@ant-design/icons';
import { useState } from 'react';
import { RoleBadge } from '@/components/common/RoleBadge';

export function MyProfile() {
  const { tokens } = useTheme();
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="min-h-screen p-3 md:p-4" style={{ background: '#f4f1f8' }}>
      {/* Header */}
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-[20px] font-bold leading-tight md:text-[22px]" style={{ color: '#111827' }}>
            My Profile
          </h1>
          <p className="mt-1 text-[13px]" style={{ color: '#6b7280' }}>
            Manage your personal information
          </p>
        </div>
        <Button 
          variant={isEditing ? "success" : "primary"} 
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? <><SaveOutlined /> Save Changes</> : <><EditOutlined /> Edit Profile</>}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Profile Card */}
        <Card className="p-6">
          <div className="text-center">
            <div className="relative inline-block mb-4">
              <div
                className="w-24 h-24 rounded-full flex items-center justify-center text-3xl font-bold mx-auto"
                style={{ backgroundColor: user?.avatar ? 'transparent' : '#10b981', color: 'white' }}
              >
                {user?.avatar ? (
                  <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full" />
                ) : (
                  user?.name?.charAt(0).toUpperCase() || 'U'
                )}
              </div>
              {isEditing && (
                <button className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-lg border border-gray-200">
                  <EditOutlined style={{ color: '#6b7280' }} />
                </button>
              )}
            </div>
            
            <h2 className="text-[18px] font-bold" style={{ color: '#111827' }}>
              {user?.name || 'User Name'}
            </h2>
            <p className="text-[13px] text-[#6b7280] mt-1">{user?.email}</p>
            
            {user?.roles && user.roles.length > 0 && (
              <div className="mt-3 flex justify-center">
                <RoleBadge role={user.roles[0]} size="md" />
              </div>
            )}

            <div className="mt-6 space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#6b7280]">Employee ID</span>
                <span className="font-semibold" style={{ color: '#111827' }}>EMP-{user?.id?.slice(0, 6)}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#6b7280]">Department</span>
                <span className="font-semibold" style={{ color: '#111827' }}>Engineering</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#6b7280]">Join Date</span>
                <span className="font-semibold" style={{ color: '#111827' }}>Jan 15, 2024</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Personal Information */}
        <Card className="p-6 lg:col-span-2">
          <h3 className="text-[16px] font-bold mb-4" style={{ color: '#111827' }}>
            Personal Information
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[13px] font-medium text-[#6b7280] mb-2">
                Full Name
              </label>
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-[#ececf2] bg-white">
                <UserOutlined style={{ color: '#6b7280' }} />
                {isEditing ? (
                  <input 
                    type="text" 
                    defaultValue={user?.name}
                    className="flex-1 outline-none text-[14px]"
                    style={{ color: '#111827' }}
                  />
                ) : (
                  <span className="text-[14px]" style={{ color: '#111827' }}>{user?.name}</span>
                )}
              </div>
            </div>

            <div>
              <label className="block text-[13px] font-medium text-[#6b7280] mb-2">
                Email Address
              </label>
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-[#ececf2] bg-white">
                <MailOutlined style={{ color: '#6b7280' }} />
                {isEditing ? (
                  <input 
                    type="email" 
                    defaultValue={user?.email}
                    className="flex-1 outline-none text-[14px]"
                    style={{ color: '#111827' }}
                  />
                ) : (
                  <span className="text-[14px]" style={{ color: '#111827' }}>{user?.email}</span>
                )}
              </div>
            </div>

            <div>
              <label className="block text-[13px] font-medium text-[#6b7280] mb-2">
                Phone Number
              </label>
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-[#ececf2] bg-white">
                <PhoneOutlined style={{ color: '#6b7280' }} />
                {isEditing ? (
                  <input 
                    type="tel" 
                    defaultValue="+1 234 567 8900"
                    className="flex-1 outline-none text-[14px]"
                    style={{ color: '#111827' }}
                  />
                ) : (
                  <span className="text-[14px]" style={{ color: '#111827' }}>+1 234 567 8900</span>
                )}
              </div>
            </div>

            <div>
              <label className="block text-[13px] font-medium text-[#6b7280] mb-2">
                Address
              </label>
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-[#ececf2] bg-white">
                <HomeOutlined style={{ color: '#6b7280' }} />
                {isEditing ? (
                  <input 
                    type="text" 
                    defaultValue="123 Main St, City"
                    className="flex-1 outline-none text-[14px]"
                    style={{ color: '#111827' }}
                  />
                ) : (
                  <span className="text-[14px]" style={{ color: '#111827' }}>123 Main St, City</span>
                )}
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="block text-[13px] font-medium text-[#6b7280] mb-2">
                Bio
              </label>
              <div className="px-3 py-2 rounded-lg border border-[#ececf2] bg-white">
                {isEditing ? (
                  <textarea 
                    defaultValue="Software engineer with 5 years of experience in web development."
                    className="w-full outline-none text-[14px] resize-none"
                    rows={3}
                    style={{ color: '#111827' }}
                  />
                ) : (
                  <p className="text-[14px]" style={{ color: '#111827' }}>
                    Software engineer with 5 years of experience in web development.
                  </p>
                )}
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Emergency Contact */}
      <Card className="p-6 mt-4">
        <h3 className="text-[16px] font-bold mb-4" style={{ color: '#111827' }}>
          Emergency Contact
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-[13px] font-medium text-[#6b7280] mb-2">
              Contact Name
            </label>
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-[#ececf2] bg-white">
              <UserOutlined style={{ color: '#6b7280' }} />
              {isEditing ? (
                <input 
                  type="text" 
                  defaultValue="Jane Doe"
                  className="flex-1 outline-none text-[14px]"
                  style={{ color: '#111827' }}
                />
              ) : (
                <span className="text-[14px]" style={{ color: '#111827' }}>Jane Doe</span>
              )}
            </div>
          </div>

          <div>
            <label className="block text-[13px] font-medium text-[#6b7280] mb-2">
              Relationship
            </label>
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-[#ececf2] bg-white">
              {isEditing ? (
                <input 
                  type="text" 
                  defaultValue="Spouse"
                  className="flex-1 outline-none text-[14px]"
                  style={{ color: '#111827' }}
                />
              ) : (
                <span className="text-[14px]" style={{ color: '#111827' }}>Spouse</span>
              )}
            </div>
          </div>

          <div>
            <label className="block text-[13px] font-medium text-[#6b7280] mb-2">
              Phone Number
            </label>
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-[#ececf2] bg-white">
              <PhoneOutlined style={{ color: '#6b7280' }} />
              {isEditing ? (
                <input 
                  type="tel" 
                  defaultValue="+1 234 567 8901"
                  className="flex-1 outline-none text-[14px]"
                  style={{ color: '#111827' }}
                />
              ) : (
                <span className="text-[14px]" style={{ color: '#111827' }}>+1 234 567 8901</span>
              )}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
