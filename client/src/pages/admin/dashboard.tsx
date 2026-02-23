import { useDashboardStats } from "@/hooks/use-dashboard";
import { useExportAttendance } from "@/hooks/use-attendance";
import { PageHeader, Card, LoadingSpinner } from "@/components/ui-components";
import { Users, UserCheck, AlertTriangle, Download } from "lucide-react";

export default function AdminDashboard() {
  const { data: stats, isLoading } = useDashboardStats();
  const exportMutation = useExportAttendance();

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <PageHeader 
        title="Dashboard" 
        description="Overview of your school's attendance and statistics."
        action={
          <button 
            onClick={() => exportMutation.mutate()}
            disabled={exportMutation.isPending}
            className="btn-outline flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            {exportMutation.isPending ? "Exporting..." : "Export Attendance"}
          </button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="p-6 hover-lift bg-gradient-to-br from-card to-card">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-bold text-muted-foreground">Total Students</p>
              <h3 className="text-3xl font-display font-bold mt-1">{stats?.totalStudents || 0}</h3>
            </div>
          </div>
        </Card>

        <Card className="p-6 hover-lift bg-gradient-to-br from-card to-card">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-green-50 text-green-600 flex items-center justify-center">
              <UserCheck className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-bold text-muted-foreground">Today's Attendance</p>
              <h3 className="text-3xl font-display font-bold mt-1">{stats?.todayAttendance || 0}</h3>
            </div>
          </div>
        </Card>

        <Card className="p-6 hover-lift bg-gradient-to-br from-card to-card">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-bold text-muted-foreground">Absence Rate</p>
              <h3 className="text-3xl font-display font-bold mt-1">{stats?.absencePercentage?.toFixed(1) || 0}%</h3>
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-8 flex flex-col items-center justify-center text-center min-h-[300px] border-dashed border-2">
        <div className="w-16 h-16 bg-secondary/50 rounded-full flex items-center justify-center mb-4">
          <School className="w-8 h-8 text-muted-foreground" />
        </div>
        <h3 className="text-xl font-bold">Ready for the day</h3>
        <p className="text-muted-foreground mt-2 max-w-md">
          Navigate through the sidebar to manage students, teachers, and classrooms. 
          Use the export button above to generate Excel reports for attendance.
        </p>
      </Card>
    </div>
  );
}

// Ensure School is imported if used
import { School } from "lucide-react";
