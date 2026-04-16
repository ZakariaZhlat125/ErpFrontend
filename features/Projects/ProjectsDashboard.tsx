'use client';

import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { useTheme } from '@/lib/theme/use-theme';
import { 
  ProjectOutlined, 
  CheckCircleOutlined, 
  ClockCircleOutlined, 
  PlayCircleOutlined,
  TeamOutlined,
  PlusOutlined,
} from '@ant-design/icons';

export function ProjectsDashboard() {
  const { tokens } = useTheme();

  const projectStats = [
    { title: 'Total Projects', value: '45', icon: <ProjectOutlined />, color: tokens.primary },
    { title: 'In Progress', value: '23', icon: <PlayCircleOutlined />, color: tokens.info },
    { title: 'Completed', value: '18', icon: <CheckCircleOutlined />, color: tokens.success },
    { title: 'On Hold', value: '4', icon: <ClockCircleOutlined />, color: tokens.warning },
  ];

  const activeProjects = [
    { id: 1, name: 'Website Redesign', progress: 75, team: 'Design Team', deadline: '2024-05-15' },
    { id: 2, name: 'Mobile App Development', progress: 45, team: 'Dev Team', deadline: '2024-06-30' },
    { id: 3, name: 'Marketing Campaign', progress: 90, team: 'Marketing Team', deadline: '2024-04-20' },
    { id: 4, name: 'System Migration', progress: 30, team: 'IT Team', deadline: '2024-08-15' },
  ];

  return (
    <div className="space-y-6 max-w-7xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: tokens.text }}>
            Projects
          </h1>
          <p className="text-sm" style={{ color: tokens.textSecondary }}>
            Manage your project portfolio
          </p>
        </div>
        <Button variant="primary">
          <PlusOutlined /> New Project
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {projectStats.map((stat) => (
          <Card key={stat.title}>
            <div 
              className="neumorphic-flat w-12 h-12 rounded-lg flex items-center justify-center mb-3"
              style={{ color: stat.color }}
            >
              {stat.icon}
            </div>
            <p className="text-sm" style={{ color: tokens.textSecondary }}>
              {stat.title}
            </p>
            <p className="text-2xl font-bold" style={{ color: tokens.text }}>
              {stat.value}
            </p>
          </Card>
        ))}
      </div>

      <Card>
        <h2 className="text-lg font-semibold mb-4" style={{ color: tokens.text }}>
          Active Projects
        </h2>
        <div className="space-y-4">
          {activeProjects.map((project) => (
            <div 
              key={project.id}
              className="p-4 neumorphic-flat rounded-lg"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: tokens.secondary }}
                  >
                    <ProjectOutlined style={{ color: tokens.text }} />
                  </div>
                  <div>
                    <p className="font-medium" style={{ color: tokens.text }}>
                      {project.name}
                    </p>
                    <p className="text-sm" style={{ color: tokens.textSecondary }}>
                      {project.team}
                    </p>
                  </div>
                </div>
                <span className="text-sm" style={{ color: tokens.textSecondary }}>
                  Due: {project.deadline}
                </span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span style={{ color: tokens.textSecondary }}>Progress</span>
                  <span style={{ color: tokens.text }}>{project.progress}%</span>
                </div>
                <div className="h-2 rounded-full" style={{ backgroundColor: tokens.secondary }}>
                  <div 
                    className="h-full rounded-full transition-all"
                    style={{ 
                      width: `${project.progress}%`,
                      backgroundColor: 
                        project.progress >= 75 ? tokens.success :
                        project.progress >= 50 ? tokens.info :
                        project.progress >= 25 ? tokens.warning :
                        tokens.danger
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4">
          <Button variant="ghost" className="w-full">
            View All Projects
          </Button>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <h2 className="text-lg font-semibold mb-4" style={{ color: tokens.text }}>
            Quick Actions
          </h2>
          <div className="space-y-3">
            <Button variant="secondary" className="w-full">
              <PlusOutlined /> Create Project
            </Button>
            <Button variant="secondary" className="w-full">
              <TeamOutlined /> Assign Team
            </Button>
            <Button variant="secondary" className="w-full">
              <ProjectOutlined /> View Templates
            </Button>
          </div>
        </Card>

        <Card className="md:col-span-2">
          <h2 className="text-lg font-semibold mb-4" style={{ color: tokens.text }}>
            Team Workload
          </h2>
          <div className="space-y-3">
            {[
              { name: 'Design Team', projects: 5, capacity: 80 },
              { name: 'Development Team', projects: 8, capacity: 95 },
              { name: 'Marketing Team', projects: 3, capacity: 45 },
            ].map((team) => (
              <div key={team.name} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span style={{ color: tokens.text }}>{team.name}</span>
                  <span style={{ color: tokens.textSecondary }}>{team.projects} projects</span>
                </div>
                <div className="h-2 rounded-full" style={{ backgroundColor: tokens.secondary }}>
                  <div 
                    className="h-full rounded-full"
                    style={{ 
                      width: `${team.capacity}%`,
                      backgroundColor: team.capacity > 90 ? tokens.danger : team.capacity > 70 ? tokens.warning : tokens.success
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
