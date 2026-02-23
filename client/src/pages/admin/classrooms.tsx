import { useState } from "react";
import { useClassrooms, useCreateClassroom } from "@/hooks/use-classrooms";
import { PageHeader, Card, Modal, LoadingSpinner } from "@/components/ui-components";
import { Plus, Sun, Moon } from "lucide-react";

export default function Classrooms() {
  const { data: classrooms, isLoading } = useClassrooms();
  const createMutation = useCreateClassroom();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ nombre: "", turno: "Mañana" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createMutation.mutateAsync(formData);
    setIsModalOpen(false);
    setFormData({ nombre: "", turno: "Mañana" });
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <PageHeader 
        title="Classrooms" 
        description="Manage classes and shifts."
        action={
          <button onClick={() => setIsModalOpen(true)} className="btn-primary flex items-center gap-2">
            <Plus className="w-4 h-4" /> Add Classroom
          </button>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {classrooms?.map((classroom) => (
          <Card key={classroom.id} className="p-6 hover-lift border-l-4" style={{ borderLeftColor: classroom.turno === 'Mañana' ? 'hsl(45 93% 47%)' : 'hsl(243 75% 59%)' }}>
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-display font-bold text-2xl">{classroom.nombre}</h3>
                <div className="flex items-center gap-1.5 mt-2 text-sm font-medium text-muted-foreground">
                  {classroom.turno === 'Mañana' ? <Sun className="w-4 h-4 text-amber-500" /> : <Moon className="w-4 h-4 text-indigo-500" />}
                  Turno {classroom.turno}
                </div>
              </div>
            </div>
          </Card>
        ))}
        {classrooms?.length === 0 && (
          <div className="col-span-full p-8 text-center text-muted-foreground bg-card border border-dashed rounded-2xl">
            No classrooms configured yet.
          </div>
        )}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New Classroom">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-bold mb-1">Classroom Name</label>
            <input required type="text" className="input-base" placeholder="e.g., 1A, 2B, 3C" value={formData.nombre} onChange={e => setFormData({...formData, nombre: e.target.value})} />
          </div>
          <div>
            <label className="block text-sm font-bold mb-1">Shift (Turno)</label>
            <select required className="input-base" value={formData.turno} onChange={e => setFormData({...formData, turno: e.target.value})}>
              <option value="Mañana">Mañana</option>
              <option value="Tarde">Tarde</option>
            </select>
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <button type="button" onClick={() => setIsModalOpen(false)} className="btn-outline">Cancel</button>
            <button type="submit" disabled={createMutation.isPending} className="btn-primary">
              {createMutation.isPending ? "Creating..." : "Save Classroom"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
