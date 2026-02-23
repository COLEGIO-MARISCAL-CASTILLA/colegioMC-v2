import { useState } from "react";
import { useStudents, useCreateStudent, useDeleteStudent } from "@/hooks/use-students";
import { useClassrooms } from "@/hooks/use-classrooms";
import { PageHeader, Card, Modal, LoadingSpinner } from "@/components/ui-components";
import { Plus, Trash2, Search } from "lucide-react";

export default function Students() {
  const { data: students, isLoading } = useStudents();
  const { data: classrooms } = useClassrooms();
  const deleteMutation = useDeleteStudent();
  const createMutation = useCreateStudent();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  
  // Form State
  const [formData, setFormData] = useState({
    nombre: "", dni: "", classroomId: "", username: "", password: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createMutation.mutateAsync({
      ...formData,
      classroomId: parseInt(formData.classroomId)
    });
    setIsModalOpen(false);
    setFormData({ nombre: "", dni: "", classroomId: "", username: "", password: "" });
  };

  const filteredStudents = students?.filter(s => 
    s.nombre.toLowerCase().includes(search.toLowerCase()) || 
    s.dni.includes(search)
  ) || [];

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <PageHeader 
        title="Students" 
        description="Manage student records and assignments."
        action={
          <button onClick={() => setIsModalOpen(true)} className="btn-primary flex items-center gap-2">
            <Plus className="w-4 h-4" /> Add Student
          </button>
        }
      />

      <Card className="mb-6 p-4">
        <div className="relative max-w-md">
          <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Search by name or DNI..." 
            className="input-base pl-10"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </Card>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-secondary/50 border-b border-border">
                <th className="p-4 font-bold text-sm text-muted-foreground">Name</th>
                <th className="p-4 font-bold text-sm text-muted-foreground">DNI</th>
                <th className="p-4 font-bold text-sm text-muted-foreground">Classroom</th>
                <th className="p-4 font-bold text-sm text-muted-foreground text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-muted-foreground">No students found.</td>
                </tr>
              ) : (
                filteredStudents.map((student) => (
                  <tr key={student.id} className="border-b border-border hover:bg-secondary/20 transition-colors">
                    <td className="p-4 font-medium">{student.nombre}</td>
                    <td className="p-4 text-muted-foreground">{student.dni}</td>
                    <td className="p-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                        {student.classroom?.nombre || 'Unassigned'}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <button 
                        onClick={() => {
                          if(confirm("Are you sure?")) deleteMutation.mutate(student.id);
                        }}
                        className="p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors inline-flex"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New Student">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-bold mb-1">Full Name</label>
            <input required type="text" className="input-base" value={formData.nombre} onChange={e => setFormData({...formData, nombre: e.target.value})} />
          </div>
          <div>
            <label className="block text-sm font-bold mb-1">DNI</label>
            <input required type="text" className="input-base" value={formData.dni} onChange={e => setFormData({...formData, dni: e.target.value})} />
          </div>
          <div>
            <label className="block text-sm font-bold mb-1">Classroom</label>
            <select required className="input-base" value={formData.classroomId} onChange={e => setFormData({...formData, classroomId: e.target.value})}>
              <option value="">Select a classroom...</option>
              {classrooms?.map(c => (
                <option key={c.id} value={c.id}>{c.nombre} ({c.turno})</option>
              ))}
            </select>
          </div>
          <div className="pt-4 border-t border-border">
            <h3 className="text-sm font-bold text-muted-foreground mb-3">Student Login Credentials</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold mb-1">Username</label>
                <input required type="text" className="input-base" value={formData.username} onChange={e => setFormData({...formData, username: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-bold mb-1">Password</label>
                <input required type="text" className="input-base" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} />
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <button type="button" onClick={() => setIsModalOpen(false)} className="btn-outline">Cancel</button>
            <button type="submit" disabled={createMutation.isPending} className="btn-primary">
              {createMutation.isPending ? "Creating..." : "Save Student"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
