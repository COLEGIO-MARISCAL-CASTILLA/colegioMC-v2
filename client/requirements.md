## Packages
react-hot-toast | Minimalist toast notifications requested by user
recharts | Charts for the student dashboard
xlsx | Excel export for attendance data
date-fns | Formatting dates nicely
lucide-react | Icons for the UI

## Notes
- Tailwind Config: Need to add custom fonts 'Outfit' (display) and 'Plus Jakarta Sans' (sans) in tailwind config if possible, otherwise they will be applied via CSS variables in the base layer.
- Auth is cookie/session based, using credentials: "include" for all fetch calls.
- Backend provides Blob for Excel export on GET /api/attendance/export.
