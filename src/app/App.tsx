import { RouterProvider } from 'react-router';
import { router } from './routes';
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider } from './context/AuthContext';
import { BudgetProvider } from './context/BudgetContext';
import { Toaster } from 'sonner';

export default function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <BudgetProvider>
          <RouterProvider router={router} />
          <Toaster position="top-right" richColors />
        </BudgetProvider>
      </AuthProvider>
    </LanguageProvider>
  );
}