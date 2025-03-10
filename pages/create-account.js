import { useState } from 'react';
import { useRouter } from 'next/router';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

export default function CreateAccountPage() {
  const router = useRouter();
  const { user_id } = router.query;
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (!password) {
      setError('Wachtwoord is verplicht.');
      return;
    }

    try {
      const { error: updateError } = await supabase.auth.api.updateUserById(user_id, {
        password: password,
      });

      if (updateError) {
        throw updateError;
      }

      setSuccess(true);
      router.push('/dashboard');
    } catch (error) {
      setError('Er is iets misgegaan. Probeer het later opnieuw.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-white">
      <h2 className="text-3xl font-bold mb-4">Maak een account aan</h2>
      {success && <p className="text-green-500 mb-4">Je account is succesvol aangemaakt!</p>}
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="password"
          placeholder="Wachtwoord"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg shadow-md hover:bg-blue-600 transition"
        >
          Account aanmaken
        </button>
      </form>
    </div>
  );
}
