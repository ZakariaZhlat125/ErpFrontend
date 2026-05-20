'use client';

import { useTheme } from '@/lib/theme/use-theme';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui';
import { 
  ClockCircleOutlined,
  LoginOutlined,
  LogoutOutlined,
  CalendarOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from '@ant-design/icons';
import { useState } from 'react';

export function MyAttendance() {
  const { tokens } = useTheme();
  const [isCheckedIn, setIsCheckedIn] = useState(true);

  const currentWeekStats = {
    totalHours: 38.5,
    targetHours: 40,
    daysPresent: 4,
    daysAbsent: 0,
    lateCount: 1,
  };

  const todayAttendance = {
    checkIn: '09:00 AM',
    checkOut: null,
    hoursWorked: '5.5h',
    status: 'Working',
  };

  const attendanceHistory = [
    { date: '2024-01-16', day: 'Monday', checkIn: '09:00 AM', checkOut: '05:30 PM', hours: '8.5h', status: 'Present', notes: null },
    { date: '2024-01-17', day: 'Tuesday', checkIn: '08:55 AM', checkOut: '05:25 PM', hours: '8.5h', status: 'Present', notes: null },
    { date: '2024-01-18', day: 'Wednesday', checkIn: '09:10 AM', checkOut: '05:40 PM', hours: '8.5h', status: 'Late', notes: 'Traffic delay' },
    { date: '2024-01-19', day: 'Thursday', checkIn: '09:05 AM', checkOut: '05:30 PM', hours: '8.4h', status: 'Present', notes: null },
    { date: '2024-01-20', day: 'Friday', checkIn: '09:00 AM', checkOut: '--', hours: '5.5h', status: 'Working', notes: null },
  ];

  return (
    <div className="min-h-screen p-3 md:p-4" style={{ background: '#f4f1f8' }}>
      {/* Header */}
      <div className="mb-5">
        <h1 className="text-[20px] font-bold leading-tight md:text-[22px]" style={{ color: '#111827' }}>
          My Attendance
        </h1>
        <p className="mt-1 text-[13px]" style={{ color: '#6b7280' }}>
          Track your attendance and working hours
        </p>
      </div>

      {/* Current Status Card */}
      <Card className="p-6 mb-6" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
        <div className="flex items-center justify-between text-white">
          <div>
            <p className="text-[14px] opacity-90 mb-2">Current Status</p>
            <h2 className="text-[28px] font-bold">
              {isCheckedIn ? 'Checked In' : 'Not Checked In'}
            </h2>
            {isCheckedIn && (
              <div className="mt-3 flex items-center gap-4">
                <div>
                  <p className="text-[12px] opacity-75">Check In</p>
                  <p className="text-[16px] font-semibold">{todayAttendance.checkIn}</p>
                </div>
                <div>
                  <p className="text-[12px] opacity-75">Hours Worked</p>
                  <p className="text-[16px] font-semibold">{todayAttendance.hoursWorked}</p>
                </div>
              </div>
            )}
          </div>
          <div className="flex gap-3">
            {!isCheckedIn ? (
              <Button 
                variant="success" 
                size="lg"
                onClick={() => setIsCheckedIn(true)}
                className="bg-white text-purple-600 hover:bg-gray-100"
              >
                <LoginOutlined /> Check In
              </Button>
            ) : (
              <Button 
                variant="secondary" 
                size="lg"
                onClick={() => setIsCheckedIn(false)}
                className="bg-white/20 text-white hover:bg-white/30 border-white/30"
              >
                <LogoutOutlined /> Check Out
              </Button>
            )}
          </div>
        </div>
      </Card>

      {/* Weekly Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
        <Card className="p-4">
          <div className="text-center">
            <p className="text-[12px] text-[#6b7280] mb-1">Total Hours</p>
            <h3 className="text-[22px] font-bold" style={{ color: '#111827' }}>
              {currentWeekStats.totalHours}h
            </h3>
            <p className="text-[11px] text-[#6b7280] mt-1">of {currentWeekStats.targetHours}h</p>
          </div>
        </Card>

        <Card className="p-4">
          <div className="text-center">
            <p className="text-[12px] text-[#6b7280] mb-1">Days Present</p>
            <h3 className="text-[22px] font-bold text-emerald-600">
              {currentWeekStats.daysPresent}
            </h3>
            <p className="text-[11px] text-[#6b7280] mt-1">this week</p>
          </div>
        </Card>

        <Card className="p-4">
          <div className="text-center">
            <p className="text-[12px] text-[#6b7280] mb-1">Days Absent</p>
            <h3 className="text-[22px] font-bold text-red-600">
              {currentWeekStats.daysAbsent}
            </h3>
            <p className="text-[11px] text-[#6b7280] mt-1">this week</p>
          </div>
        </Card>

        <Card className="p-4">
          <div className="text-center">
            <p className="text-[12px] text-[#6b7280] mb-1">Late Arrivals</p>
            <h3 className="text-[22px] font-bold text-amber-600">
              {currentWeekStats.lateCount}
            </h3>
            <p className="text-[11px] text-[#6b7280] mt-1">this week</p>
          </div>
        </Card>

        <Card className="p-4">
          <div className="text-center">
            <p className="text-[12px] text-[#6b7280] mb-1">Attendance Rate</p>
            <h3 className="text-[22px] font-bold text-blue-600">
              100%
            </h3>
            <p className="text-[11px] text-[#6b7280] mt-1">this month</p>
          </div>
        </Card>
      </div>

      {/* Attendance History */}
      <Card className="p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[18px] font-bold" style={{ color: '#111827' }}>
            Attendance History
          </h2>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm">
              <CalendarOutlined /> This Week
            </Button>
            <Button variant="ghost" size="sm">Export</Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#ececf2]">
                <th className="text-left py-3 px-2 text-[13px] font-semibold text-[#6b7280]">Date</th>
                <th className="text-left py-3 px-2 text-[13px] font-semibold text-[#6b7280]">Day</th>
                <th className="text-left py-3 px-2 text-[13px] font-semibold text-[#6b7280]">Check In</th>
                <th className="text-left py-3 px-2 text-[13px] font-semibold text-[#6b7280]">Check Out</th>
                <th className="text-left py-3 px-2 text-[13px] font-semibold text-[#6b7280]">Hours</th>
                <th className="text-left py-3 px-2 text-[13px] font-semibold text-[#6b7280]">Status</th>
                <th className="text-left py-3 px-2 text-[13px] font-semibold text-[#6b7280]">Notes</th>
              </tr>
            </thead>
            <tbody>
              {attendanceHistory.map((record, index) => (
                <tr key={index} className="border-b border-[#ececf2] hover:bg-[#f9fafb] transition-colors">
                  <td className="py-4 px-2">
                    <span className="text-[14px] font-medium" style={{ color: '#111827' }}>
                      {record.date}
                    </span>
                  </td>
                  <td className="py-4 px-2">
                    <span className="text-[14px] text-[#6b7280]">{record.day}</span>
                  </td>
                  <td className="py-4 px-2">
                    <span className="text-[14px]" style={{ color: '#111827' }}>
                      {record.checkIn}
                    </span>
                  </td>
                  <td className="py-4 px-2">
                    <span className="text-[14px]" style={{ color: '#111827' }}>
                      {record.checkOut}
                    </span>
                  </td>
                  <td className="py-4 px-2">
                    <span className="text-[14px] font-medium" style={{ color: '#111827' }}>
                      {record.hours}
                    </span>
                  </td>
                  <td className="py-4 px-2">
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-[11px] font-medium ${
                        record.status === 'Present'
                          ? 'bg-emerald-100 text-emerald-700'
                          : record.status === 'Late'
                          ? 'bg-amber-100 text-amber-700'
                          : record.status === 'Working'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {record.status === 'Present' && <CheckCircleOutlined className="mr-1" />}
                      {record.status === 'Late' && <ClockCircleOutlined className="mr-1" />}
                      {record.status === 'Working' && <ClockCircleOutlined className="mr-1" />}
                      {record.status}
                    </span>
                  </td>
                  <td className="py-4 px-2">
                    <span className="text-[13px] text-[#6b7280]">
                      {record.notes || '--'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
