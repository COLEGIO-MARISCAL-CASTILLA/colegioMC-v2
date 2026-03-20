import { useQuery } from "@tanstack/react-query";
import { api } from "@shared/routes";

export function useDashboardStats() {
  return useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: async () => {
      // Crear AbortController con timeout más corto para evitar timeout del servidor
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 segundos
      
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
        
        // Si es un abort, retornar datos por defecto
        if (error instanceof Error && error.name === 'AbortError') {
          console.warn('Dashboard stats request timed out, using fallback data');
          return {
            totalStudents: 0, 
            todayAttendance: 0, 
            absencePercentage: 0,
            totalTeachers: 0,
            totalClassrooms: 0
          };
        }
        
        throw error;
      }
    },
    staleTime: 1000 * 60 * 15, // 15 minutos para reducir carga
    refetchOnWindowFocus: false, // Evitar bucle infinito
    retry: 0, // Sin reintentos para evitar más timeouts
    gcTime: 1000 * 60 * 10, // Limpiar cache después de 10 minutos
  });
}
