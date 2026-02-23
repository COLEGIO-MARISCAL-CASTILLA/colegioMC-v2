import { pgTable, text, serial, integer, boolean, timestamp, date } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  nombre: text("nombre").notNull(),
  rol: text("rol").notNull(), // 'DIRECTORA', 'PROFESOR', 'ESTUDIANTE'
});

export const classrooms = pgTable("classrooms", {
  id: serial("id").primaryKey(),
  nombre: text("nombre").notNull(),
  turno: text("turno").notNull(), // 'Mañana', 'Tarde'
});

export const teachers = pgTable("teachers", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  nombre: text("nombre").notNull(),
  email: text("email").notNull(),
});

export const students = pgTable("students", {
  id: serial("id").primaryKey(),
  nombre: text("nombre").notNull(),
  dni: text("dni").notNull().unique(),
  classroomId: integer("classroom_id").references(() => classrooms.id),
  userId: integer("user_id").references(() => users.id), // for student login
});

export const attendance = pgTable("attendance", {
  id: serial("id").primaryKey(),
  studentId: integer("student_id").references(() => students.id).notNull(),
  fecha: date("fecha").notNull(), // YYYY-MM-DD
  estado: text("estado").notNull(), // 'Presente', 'Ausente'
  registradoPor: integer("registrado_por").references(() => users.id).notNull(),
});

// Relations
export const classroomsRelations = relations(classrooms, ({ many }) => ({
  students: many(students),
}));

export const studentsRelations = relations(students, ({ one, many }) => ({
  classroom: one(classrooms, {
    fields: [students.classroomId],
    references: [classrooms.id],
  }),
  user: one(users, {
    fields: [students.userId],
    references: [users.id],
  }),
  attendances: many(attendance),
}));

export const attendanceRelations = relations(attendance, ({ one }) => ({
  student: one(students, {
    fields: [attendance.studentId],
    references: [students.id],
  }),
  registradoPor: one(users, {
    fields: [attendance.registradoPor],
    references: [users.id],
  }),
}));

export const insertUserSchema = createInsertSchema(users).omit({ id: true });
export const insertClassroomSchema = createInsertSchema(classrooms).omit({ id: true });
export const insertTeacherSchema = createInsertSchema(teachers).omit({ id: true });
export const insertStudentSchema = createInsertSchema(students).omit({ id: true });
export const insertAttendanceSchema = createInsertSchema(attendance).omit({ id: true });

export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Classroom = typeof classrooms.$inferSelect;
export type InsertClassroom = z.infer<typeof insertClassroomSchema>;

export type Teacher = typeof teachers.$inferSelect;
export type InsertTeacher = z.infer<typeof insertTeacherSchema>;

export type Student = typeof students.$inferSelect;
export type InsertStudent = z.infer<typeof insertStudentSchema>;

export type Attendance = typeof attendance.$inferSelect;
export type InsertAttendance = z.infer<typeof insertAttendanceSchema>;
