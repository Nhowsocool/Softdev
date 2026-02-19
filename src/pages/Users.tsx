import React, { useMemo, useState } from 'react';
import { Search, Plus, User, Shield, Mail } from 'lucide-react';
import { clsx } from 'clsx';
import { Modal } from '../components/ui/Modal';

interface ManagedUser {
  id: number;
  fullName: string;
  email: string;
  role: string;
}

export const Users = () => {
  const [users, setUsers] = useState<ManagedUser[]>([
    { id: 1, fullName: 'Alex Morgan', email: 'alex@insale.com', role: 'Admin' },
    { id: 2, fullName: 'Sarah Smith', email: 'sarah@insale.com', role: 'Sales Manager' },
    { id: 3, fullName: 'Mike Johnson', email: 'mike@insale.com', role: 'Sales Rep' },
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('salesman');

  const filteredUsers = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    if (!query) return users;

    return users.filter((user) =>
      user.fullName.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query) ||
      user.role.toLowerCase().includes(query)
    );
  }, [users, searchTerm]);

  const resetForm = () => {
    setFullName('');
    setEmail('');
    setRole('salesman');
  };

  const handleAddUser = (event: React.FormEvent) => {
    event.preventDefault();

    const roleLabelMap: Record<string, string> = {
      salesman: 'Salesman',
      marketing: 'Marketing',
      rnd: 'R&D',
      supervisor: 'Supervisor',
      admin: 'Admin',
    };

    const nextUser: ManagedUser = {
      id: Date.now(),
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      role: roleLabelMap[role] || 'Salesman',
    };

    setUsers((previous) => [nextUser, ...previous]);
    setIsAddModalOpen(false);
    resetForm();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-stone-900">User Management</h1>
          <p className="text-stone-500 mt-1">Manage system access and roles.</p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium shadow-sm"
        >
          <Plus className="w-4 h-4" />
          Add User
        </button>
      </div>

      <div className="bg-white rounded-xl border border-stone-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-stone-100 bg-stone-50/50">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <input 
              type="text" 
              placeholder="Search users..." 
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-stone-200 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-sm"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-stone-50 text-stone-500 font-medium border-b border-stone-100">
              <tr>
                <th className="px-6 py-4">Full Name</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-stone-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-stone-900 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-stone-200 flex items-center justify-center text-stone-600">
                      <User className="w-4 h-4" />
                    </div>
                    {user.fullName}
                  </td>
                  <td className="px-6 py-4 text-stone-600">
                    <div className="flex items-center gap-2">
                      <Mail className="w-3 h-3 text-stone-400" />
                      {user.email}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-stone-600">
                    <div className="flex items-center gap-2">
                      <Shield className="w-3 h-3 text-stone-400" />
                      {user.role}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right text-stone-400">
                    <button className="hover:text-emerald-600 mr-3">Edit</button>
                    <button className="hover:text-red-600">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal
        isOpen={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          resetForm();
        }}
        title="Add User"
      >
        <form onSubmit={handleAddUser} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">Full Name</label>
            <input
              type="text"
              required
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
              placeholder="e.g. John Carter"
              className="w-full px-3 py-2 rounded-lg border border-stone-200 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="name@insale.com"
              className="w-full px-3 py-2 rounded-lg border border-stone-200 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">Role</label>
            <select
              value={role}
              onChange={(event) => setRole(event.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-stone-200 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-sm"
            >
              <option value="salesman">Salesman</option>
              <option value="marketing">Marketing</option>
              <option value="rnd">R&D</option>
              <option value="supervisor">Supervisor</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div className="pt-2 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => {
                setIsAddModalOpen(false);
                resetForm();
              }}
              className="px-4 py-2 rounded-lg border border-stone-200 text-stone-600 hover:bg-stone-50 transition-colors text-sm font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition-colors text-sm font-medium"
            >
              Save User
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
