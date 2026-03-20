import { useQuery } from "@tanstack/react-query";
import { api } from "@shared/routes";

export function useDashboardStats() {
  return useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: async () => {
      // Crear AbortController con timeout manual
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 segundos
      
      try {
        const res = await fetch(api.dashboard.stats.path, { 
          credentials: "include",
          signal: controller.signal
        });
        clearTimeout(timeoutId);
        
        if (!res.ok) {
          if (res.status === 500) {
            // Si hay error del servidor, retornar datos por defecto para que no se quede atascado
            return {
              totalStudents: 0, 
              todayAttendance: 0, 
              absencePercentage: 0,
              totalTeachers: 0,
              totalClassrooms: 0
            };
          }
          throw new Error("Failed to fetch stats");
        }
        return res.json() as Promise<{
          totalStudents: number, 
          todayAttendance: number, 
          absencePercentage: number,
          totalTeachers: number,
          totalClassrooms: number
        }>
      } catch (error) {
        clearTimeout(timeoutId);
        throw error;
      }
    },
    staleTime: 1000 * 60 * 10, // 10 minutos para reducir carga
    refetchOnWindowFocus: false, // Evitar bucle infinito
    retry: 1, // Solo un reintento
    gcTime: 1000 * 60 * 5, // Limpiar cache después de 5 minutos
  });
}
